import styles from "./build-without-borrowing.module.css";
import WorkshopTime from "./WorkshopTime";
import WorkshopRegistration from "./WorkshopRegistration";

const outcomes = [
 {title:"Recognize what you already have.",body:"Discover practical possibilities for the business you’re building before assuming another loan is the answer."},
 {title:"Build with Kingdom perspective.",body:"Consider your growth decisions through faith, wise counsel, and stewardship."},
 {title:"Turn a connection into a next step.",body:"Begin a focused action plan for building relationships with intention, not simply collecting more contacts."},
];
const faqs = [
 {q:"I’ve attended the masterclass. Why join this workshop?",a:"The masterclass gives you a broader Kingdom perspective on life and business. This workshop puts the focus on one practical business challenge: how to move forward through wise counsel, trusted relationships, and resources already within reach."},
 {q:"Is this for me if I’m just getting started?",a:"Yes. Whether you’re building an established company or carrying a God-sized vision you haven’t launched, come explore building business God’s way. You do not need to have attended a masterclass."},
 {q:"What should I bring?",a:"Bring a business challenge you’re facing, something to take notes with, and a willingness to consider a different way forward."},
 {q:"Is this a loan or debt-relief program?",a:"No. This is a business workshop about wise counsel, relationships, and stewardship, not a financing offer or personal financial advice."},
];
// Verbatim first-party homepage testimonials; broader FBF, not this workshop.
const testimonials = [
 {name:"Dallas Marley",title:"Marketing Specialist & Entrepreneur",photo:"/images/dallas-headshot.jpg",context:"Broader Fueled By Fire experience",quote:"In less than 12 months, we paid off over $2 million in debt, moved to Ecuador, and stepped into the life of our dreams."},
 {name:"Rogelio & Brandi Del Rio",title:"CEO, Del Rio Landscape",photo:"/images/rogelio-brandi.webp",context:"FBF Platinum participant experience",quote:"FBF Platinum has forever changed our lives! Our business is now 100% debt-free and continues to scale. Our marriage has been totally restored."},
 {name:"Drew & Tina Shabo",title:"Dentistry Business Owners",photo:"/images/drew-tina.jpg",context:"Broader Fueled By Fire experience",quote:"We've clarified God's plan for our portfolio of dentistry businesses and our family has been restored to full alignment. We are crystal clear about our GOD-SIZED vision."},
 {name:"Alex & Irina Chifor",title:"Commercial Investors",photo:"/images/irina-alex.webp",context:"Broader Fueled By Fire experience",quote:"FBF has had a monumental impact on our lives. We've built an 8-figure commercial investment business while keeping faith and family first."},
];
function InvitationButton(){return <a className={styles.button} href="#registration">Register for the workshop</a>;}
function Testimonial({person}:{person:typeof testimonials[number]}){return <figure className={styles.testimonial}><img src={person.photo} alt={person.name} width="520" height="320" loading="lazy" /><figcaption><strong>{person.name}</strong><span>{person.title}</span><small>{person.context}</small></figcaption><blockquote>“{person.quote}”</blockquote></figure>;}
export default function WorkshopLanding(){
 return <main className={styles.page}>
  <a className={styles.skip} href="#workshop-content">Skip to workshop details</a>
  <div className={styles.reviewBar}><span>Live workshop · <WorkshopTime /></span></div>
  <section data-section="hero" className={styles.hero} aria-labelledby="workshop-title">
   <div className={styles.logoBar}><img src="/images/fbf-logo-white.png" alt="Fueled By Fire" width="72" height="62" /></div>
   <div className={styles.heroInner}>
    <div className={styles.heroVisual}><img src="/images/kingdom-intel-network-hero.jpg" alt="Payton Wallace speaking at a Fueled By Fire gathering" width="1200" height="1400" fetchPriority="high" /></div>
    <div className={styles.heroCopy}><p className={styles.eyebrow}>Kingdom Intelligence Workshop</p>
     <h1 id="workshop-title" aria-label="Build Without Borrowing"><span>Build</span>{" "}<span>Without</span>{" "}<span>Borrowing</span></h1>
     <div className={styles.divider} />
     <p className={styles.subtitle}>A God-sized vision shouldn’t feel out of reach because of debt.</p>
     <InvitationButton />
     <p className={styles.schedule}><WorkshopTime /></p>
    </div>
   </div>
  </section>
  <section data-section="event-details" id="workshop-content" className={styles.light}><div className={styles.intro}>
   <h2>A God-sized vision. A business to build. Does debt feel like the only way?</h2>
   <p>You see what God has called you to build, but a lack of money or the debt you already carry makes it feel out of reach.</p>
   <div className={styles.eventDetails}><div><small>When</small><strong><WorkshopTime /></strong></div></div>
  </div></section>
  <section data-section="workshop-focus" className={styles.focus}><div className={styles.centered}>
   <p className={styles.eyebrow}>A different way to build</p><h2>You’ve heard of OPM.<br />What if there’s another way?</h2>
   <div className={styles.focusVisual} aria-label="OPM vs ?"><div><span>OPM</span><p>Other People’s Money</p></div><span className={styles.versus}>vs.</span><div><span>?</span><p>Discover it at the workshop.</p></div></div>
   <p className={styles.support}>Borrowing may feel like the obvious next step. This workshop invites you to consider another way.</p><InvitationButton />
  </div></section>
  <section data-section="community-proof" className={styles.proof} aria-labelledby="proof-heading"><div className={styles.container}>
   <div className={styles.sectionHeading}><p className={styles.eyebrow}>From the Fueled By Fire community</p><h2 id="proof-heading">Business wisdom. Kingdom perspective.</h2><p>These stories describe their broader Fueled By Fire experience, not this workshop or a promised result.</p></div>
   <div className={styles.proofGrid}>{testimonials.slice(0,2).map(person=><Testimonial key={person.name} person={person} />)}</div>
  </div></section>
  <section data-section="your-host" id="your-host" className={styles.host} aria-labelledby="host-heading">
   <div className={styles.hostPhoto}><img src="/images/payton-wallace-host.webp" alt="Payton Wallace, workshop host" width="1400" height="934" loading="lazy" /></div>
   <div className={styles.hostCopy}><p className={styles.eyebrow}>Your host</p><h2 id="host-heading">Payton Wallace</h2><p className={styles.hostAffiliation}>Fueled By Fire</p><div className={styles.divider} />
    <h3>Build with counsel.<br />Not in isolation.</h3><p>Join Payton to explore how wise counsel and trusted relationships can help you build the business God has put in your hands.</p><p>Your business is a mission field. How you build it matters.</p><InvitationButton />
   </div>
  </section>
  <section data-section="conviction" className={styles.conviction}><h2>“Commit your work to the LORD, and your plans will be established.”</h2><div className={styles.divider} /><p>Proverbs 16:3</p></section>
  <section data-section="workshop-outcomes" className={styles.dark} aria-labelledby="outcomes-heading"><div className={styles.container}>
   <div className={styles.sectionHeading}><p className={styles.eyebrow}>What we’ll explore together</p><h2 id="outcomes-heading">Build your God-sized vision without making debt the plan.</h2><p>Faith-led perspective for the business you’re called to build.</p></div>
   <div className={styles.benefits}>{outcomes.map((item,i)=><article key={item.title}><span className={styles.number}>0{i+1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div><div className={styles.centerAction}><InvitationButton /></div>
  </div></section>
  <section data-section="questions" className={styles.light} aria-labelledby="faq-heading"><div className={styles.container}>
   <div className={styles.faq}><h2 id="faq-heading">Before you join us</h2>{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
  </div></section>
  <section data-section="community-stories" className={styles.proof}><div className={styles.container}>
   <div className={styles.sectionHeading}><p className={styles.eyebrow}>Faith. Family. Business.</p><h2>Why Kingdom perspective matters.</h2><p>More voices from the broader FBF community. These are not results from this workshop.</p></div><div className={styles.proofGrid}>{testimonials.slice(2).map(person=><Testimonial key={person.name} person={person} />)}</div>
  </div></section>
  <div id="registration"><WorkshopRegistration /></div>
  <footer className={styles.footer}><img src="/images/fbf-logo-white.png" alt="Fueled By Fire" width="82" height="72" /><p>Fueled By Fire, LLC.</p><p>Kingdom Intelligence · Build Without Borrowing</p></footer>
 </main>;
}
