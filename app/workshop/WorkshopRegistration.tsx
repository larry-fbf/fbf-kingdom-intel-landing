"use client";
import {useEffect,useRef,useState} from 'react';
import WorkshopTime from './WorkshopTime';
import styles from './build-without-borrowing.module.css';

// December list registration; no Zoom or SMS enrollment.
export default function WorkshopRegistration(){
 const dialog=useRef<HTMLDialogElement>(null);
 const pending=useRef(false);
 const controller=useRef<AbortController|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 useEffect(()=>{
  const el=dialog.current!;
  let opener:HTMLElement|null=null;
  let previousOverflow='';
  const close=()=>{controller.current?.abort();el.close();};
  const restore=()=>{document.body.style.overflow=previousOverflow;opener?.focus({preventScroll:true});setError('');};
  const open=(event:MouseEvent)=>{
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[href="#registration"]');
   if(!link)return;
   event.preventDefault();opener=link;previousOverflow=document.body.style.overflow;
   document.body.style.overflow='hidden';el.showModal();
   el.querySelector<HTMLInputElement>('input')?.focus();
  };
  const keys=(event:KeyboardEvent)=>{
   if(event.key!=='Tab')return;
   const items=Array.from(el.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),a[href]'));
   const first=items[0],last=items[items.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  const cancel=(event:Event)=>{event.preventDefault();close();};
  el.addEventListener('close',restore);el.addEventListener('cancel',cancel);el.addEventListener('keydown',keys);
  document.addEventListener('click',open);
  return ()=>{controller.current?.abort();document.body.style.overflow=previousOverflow;document.removeEventListener('click',open);el.removeEventListener('close',restore);el.removeEventListener('cancel',cancel);el.removeEventListener('keydown',keys);};
 },[]);
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();if(pending.current)return;
  const form=event.currentTarget;
  for(const input of Array.from(form.querySelectorAll<HTMLInputElement>('input'))){input.value=input.value.trim();}
  if(!form.reportValidity())return;
  pending.current=true;setBusy(true);setError('');
  const abort=new AbortController();controller.current=abort;
  const timer=setTimeout(()=>abort.abort(),45000);
  const data=new FormData(form);
  try{
   const response=await fetch('/api/workshop/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName:data.get('firstName'),lastName:data.get('lastName'),email:data.get('email')}),signal:abort.signal,cache:'no-store'});
   const result=await response.json();
   if(response.ok&&result.ok===true&&result.event==='kiw-dec-2026'){window.location.assign('/workshop/thank-you');return;}
   setError(result.error||'We could not verify registration. Please retry with the same email.');
  }catch{
   if(dialog.current?.open)setError('We could not verify registration. Your details may already be saved. Please retry with the same email.');
  }finally{clearTimeout(timer);pending.current=false;setBusy(false);}
 }
 return <>
  <noscript><p className={styles.noScript}>Please enable JavaScript to open the registration form. No registration has been submitted.</p></noscript>
  <dialog ref={dialog} className={styles.modal} aria-labelledby="form-heading" onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom){controller.current?.abort();event.currentTarget.close();}}}}>
   <button type="button" className={styles.modalClose} aria-label="Close registration form" onClick={()=>{controller.current?.abort();dialog.current?.close();}}>×</button>
   <header className={styles.modalHeader}><img src="/images/fbf-logo-black.png" alt="Fueled By Fire" width="41" height="36" /><h2 id="form-heading">Build Without Borrowing</h2><p><WorkshopTime /></p></header>
   <form className={styles.modalForm} onSubmit={submit} aria-busy={busy}>
    <label htmlFor="workshop-email">Email *<input id="workshop-email" name="email" type="email" inputMode="email" autoComplete="email" required /></label>
    <div className={styles.modalNames}><label htmlFor="workshop-first-name">First Name *<input id="workshop-first-name" name="firstName" autoComplete="given-name" required /></label><label htmlFor="workshop-last-name">Last Name *<input id="workshop-last-name" name="lastName" autoComplete="family-name" required /></label></div>
    <div className={styles.modalPrivacy}><p>Fueled By Fire, LLC values your privacy. We’ll use your info to manage your account and deliver the services you’ve asked for.</p><p><a href="https://www.fbfchallenge.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> · <a href="https://www.fbfchallenge.com/terms" target="_blank" rel="noreferrer">Terms</a></p></div>
    <button className={styles.modalSubmit} type="submit" disabled={busy}>{busy?'Registering...':'RSVP NOW'}</button>
    {error&&<p className={styles.modalError} role="alert">{error}</p>}
   </form>
  </dialog>
 </>;
}
