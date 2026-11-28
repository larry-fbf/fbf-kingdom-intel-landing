import {NextResponse} from 'next/server';
import {register,proof,COOKIE} from '../../../lib/workshop-registration';
export const maxDuration=60;
export async function POST(request:Request){
 if(request.headers.get('origin') && request.headers.get('origin')!==new URL(request.url).origin)return NextResponse.json({ok:false},{status:403});
 if(Number(request.headers.get('content-length')||0)>4096)return NextResponse.json({ok:false},{status:413});
 let input;try{const raw=await request.text();if(raw.length>4096)throw Error();input=JSON.parse(raw);}catch{return NextResponse.json({ok:false,error:'Please check your details.'},{status:400});}
 try{const result=await register(input);const r=NextResponse.json(result,{headers:{'Cache-Control':'no-store'}});r.cookies.set(COOKIE,proof(),{httpOnly:true,secure:new URL(request.url).protocol==='https:',sameSite:'lax',path:'/workshop',maxAge:86400});return r;}
 catch(e){const validation=e instanceof Error&&e.message==='validation';const uncertain=e instanceof Error&&e.message==='registration_uncertain';return NextResponse.json({ok:false,error:validation?'Please check your details.':uncertain?'Your registration could not be fully verified. Check your email for confirmation before trying again.':'We could not verify all registration steps. Your details may already be saved. Please try again using the same email.',retryable:!uncertain},{status:validation?400:503,headers:{'Cache-Control':'no-store'}});}
}
