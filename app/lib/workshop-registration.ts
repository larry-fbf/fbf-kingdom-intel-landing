import {createHmac,timingSafeEqual} from 'node:crypto';
import {registerWorkshopZoom} from './workshop-zoom.ts';
import type {ZoomContact,ZoomOutcome} from './zoom-signup.ts';
export const EVENT='kiw-dec-2026';
export const LIST='2658fa07-a5d6-47f3-9818-da2c82883e41';
export const COOKIE='workshop_dec_2026_zoom';
export function secret(){return process.env.REGISTRATION_CONFIRMATION_SECRET || '';}
export function proof(now=Date.now()) {const body=`${EVENT}-zoom.${now+86400000}`;return `${body}.${createHmac('sha256',secret()).update(body).digest('hex')}`;}
export function verified(value:string|undefined,now=Date.now()) {if(!secret()||!value)return false;const [event,expiry,sig,...rest]=value.split('.');if(rest.length||event!==`${EVENT}-zoom`||!/^\d+$/.test(expiry)||Number(expiry)<=now||Number(expiry)>now+86400000||!sig||!/^[a-f0-9]{64}$/.test(sig))return false;const expected=createHmac('sha256',secret()).update(`${event}.${expiry}`).digest();return timingSafeEqual(Buffer.from(sig,'hex'),expected);}
export async function register(input:unknown,fetcher:typeof fetch=fetch,zoom:(contact:ZoomContact)=>Promise<ZoomOutcome>=contact=>registerWorkshopZoom(contact,process.env,fetcher)){
 const p=input as Record<string,unknown>;
 if(!p||typeof p!=='object')throw new Error('validation');
 const get=(key:string)=>typeof p[key]==='string'?(p[key] as string).trim():'';
 const email=get('email').toLowerCase(),first=get('firstName'),last=get('lastName');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||!first||!last||first.length>100||last.length>100)throw new Error('validation');
 if(!process.env.ATTIO_API_KEY||!process.env.BREVO_API_KEY||!secret()||!process.env.ZOOM_ACCOUNT_ID||!process.env.ZOOM_CLIENT_ID||!process.env.ZOOM_CLIENT_SECRET)throw new Error('configuration');
 const call=async(url:string,method:string,headers:Record<string,string>,body?:unknown)=>{const r=await fetcher(url,{method,headers:{...headers,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(6000)});if(!r.ok)throw new Error('provider');return r.status===204?null:r.json();};
 const lists=async()=>{
 const a={Authorization:`Bearer ${process.env.ATTIO_API_KEY}`};
 const person=await call('https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses','PUT',a,{data:{values:{email_addresses:[{email_address:email}],name:[{first_name:first,last_name:last,full_name:`${first} ${last}`}]}}});
 const id=person?.data?.id?.record_id;if(typeof id!=='string')throw new Error('provider');
 const entry=await call(`https://api.attio.com/v2/lists/${LIST}/entries`,'PUT',a,{data:{parent_record_id:id,parent_object:'people',entry_values:{}}});
 if(!entry?.data?.id?.entry_id)throw new Error('provider');
 // Assert durable membership. All writes are provider-native upserts, safe to retry.
 const saved=await call(`https://api.attio.com/v2/lists/${LIST}/entries/${entry.data.id.entry_id}`,'GET',a);
 if(saved?.data?.parent_record_id!==id)throw new Error('provider');
 const b={'api-key':process.env.BREVO_API_KEY!};
 await call('https://api.brevo.com/v3/contacts','POST',b,{email,listIds:[34],updateEnabled:true});
 const contact=await call(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,'GET',b);
 if(!contact?.listIds?.includes(34))throw new Error('provider');
 };
 // Existing list upserts and bounded Zoom registration run concurrently. No SMS,
 // event-history replacement or separate email send; Zoom owns confirmation.
 const [saved,joined]=await Promise.allSettled([lists(),zoom({email,firstName:first,lastName:last,agreed:true})]);
 if(joined.status==='rejected'||(joined.status==='fulfilled'&&['pending','held'].includes(joined.value.status)))throw Object.assign(new Error('registration_uncertain'),{retryable:false});
 if(saved.status!=='fulfilled'||joined.status!=='fulfilled'||joined.value.status!=='registered')throw new Error('provider');
 return {ok:true,event:EVENT};
}
