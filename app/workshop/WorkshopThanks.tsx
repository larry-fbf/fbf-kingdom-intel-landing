import WorkshopTime from './WorkshopTime';
import {workshopGoogleCalendarUrl} from '../lib/workshop-calendar';
import styles from './thank-you/preview/preview.module.css';
export default function WorkshopThanks({confirmed=false}:{confirmed?:boolean}){return <main className={styles.page}>
 <div className={styles.content}>
 <img className={styles.logo} src="/images/fbf-logo-white.png" alt="Fueled By Fire" width="64" height="56"/>
 <p className={styles.eyebrow}>Kingdom Intelligence Workshop</p>
 <h1>{confirmed?<>You’re <span>registered!</span></>:<>Workshop <span>preview</span></>}</h1>
 <div className={styles.schedule}><WorkshopTime /></div>
 <button className={styles.button} popoverTarget="workshop-calendar-options">Add to Calendar</button>
 <div id="workshop-calendar-options" popover="auto" className={styles.calendar} aria-label="Choose your calendar">
 <p>Choose your calendar</p>
 <a href={workshopGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">Google Calendar</a>
 <a href="/workshop/calendar" download>Apple Calendar (.ics)</a>
 <a href="/workshop/calendar" download>Outlook (.ics)</a>

 <button popoverTarget="workshop-calendar-options" popoverTargetAction="hide">Close</button>
 </div>
 <p className={styles.email}><strong>Check your email for next steps.</strong></p>
 <a className={styles.back} href="/workshop">Back to workshop details</a>
 </div>
 </main>;}
