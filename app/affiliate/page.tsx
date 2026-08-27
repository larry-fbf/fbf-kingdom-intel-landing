import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Affiliate Resources | Kingdom Intelligence Network",
  description:
    "Affiliate media resources and copy-paste invitations for sharing the Kingdom Intelligence Network.",
};

const mediaLibraryUrl =
  "https://drive.google.com/drive/folders/1ge6qFH0njrlu26eoMZ-r01V9D-nxAUbR";

const copyButtonScript = `
(() => {
  async function copyText(text) {
    let copied = false;

    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    if (!copied) {
      throw new Error("copy failed");
    }
  }

  document.addEventListener("click", async (event) => {
    const button = event.target && event.target.closest ? event.target.closest("[data-copy-text]") : null;

    if (!button) {
      return;
    }

    event.preventDefault();

    const originalLabel = button.textContent;

    try {
      await copyText(button.getAttribute("data-copy-text") || "");
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = originalLabel || "Copy";
      }, 1600);
    } catch {
      button.textContent = "Copy failed";
      window.setTimeout(() => {
        button.textContent = originalLabel || "Copy";
      }, 1800);
    }
  });
})();
`;

const invitationOpeners = [
  "What you shared reminds me of where I was before I found the Kingdom Intelligence Network. Being around other Kingdom-minded business owners gave me the clarity and accountability I did not even realize I was missing.",
  "I have been part of a Christian business network that has made a huge difference in how I make business decisions. Happy to share more if you are curious.",
  "That actually reminds me of a conversation we had recently inside the Kingdom Intelligence Network. It gave me a completely different perspective. I would be happy to share it if you are interested.",
];

const startSteps = [
  {
    step: "01",
    title: "Grab your link",
    body: "Start with your personal shareable link so every message points to the right place.",
  },
  {
    step: "02",
    title: "Choose the copy",
    body: "Pick the message that matches the relationship and the channel you are using.",
  },
  {
    step: "03",
    title: "Personalize it",
    body: "Add their name, their real business context, and the reason they came to mind.",
  },
  {
    step: "04",
    title: "Include the disclosure",
    body: "Keep the referral note close to the link so the invitation stays clear and above board.",
  },
];

const faqs = [
  {
    question: "When should I mention the Kingdom Intelligence Network?",
    answer:
      "When someone shares a business challenge the Network could genuinely help with, mention it naturally. Keep it simple and let them decide if they want to know more.",
  },
  {
    question: "When should I send my referral link?",
    answer:
      "Send your referral link after they show interest. For voice notes, do not send the link until the person asks for it, because sending it too early can feel transactional.",
  },
  {
    question: "What should I personalize before sending?",
    answer:
      "Replace the name, add something specific about their business or challenge, and replace [affiliate link] with your personal shareable link.",
  },
  {
    question: "Do I need to disclose that it is an affiliate link?",
    answer:
      "Yes. Use simple language like: just so you know, it is an affiliate link, so I receive a small referral commission if you decide to join, but it does not change the price for you.",
  },
  {
    question: "What tone should the invitation have?",
    answer:
      "Your invitation should feel relational, honest, and helpful. The goal is care, not pressure.",
  },
];

const swipeSections = [
  {
    title: "Text / DM",
    description: "Use these for personal messages when the relationship already has some trust.",
    items: [
      {
        title: "Warm or cold conversation starter",
        use: "Use this for someone you know personally when you are starting the conversation from scratch.",
        copy: `Hey [Name]! Random question... how has business been treating you lately?

You have crossed my mind a few times because I know you are building a lot right now.

I recently found a community that has been really helpful for me as an entrepreneur. The conversations have given me a lot of clarity on decisions I was trying to figure out on my own.

I was not sure if something like that would even be relevant for you, but if you are open to it, I would be happy to tell you a little more.`,
      },
      {
        title: "When someone already shared a struggle",
        use: "Use this when a friend has just told you they are stuck, overwhelmed, or doing it alone.",
        copy: `You know... what you just described is something we actually talk through all the time inside the Kingdom Intelligence Network.

It is a community of Christian business owners who help each other think through real business challenges instead of trying to figure everything out alone.

It crossed my mind because it seems really relevant to what you are dealing with. Happy to send you the info if you would like to take a look.`,
      },
      {
        title: "One-liner for comments or tight spaces",
        use: "Use this when you need something short and simple.",
        copy: `Praying about who to encourage today, and your name came to mind. I thought of the Kingdom Intelligence Network because it has been such a blessing in my business. Let me know if you would like to hear more.`,
      },
    ],
  },
  {
    title: "Follow-up",
    description: "Use these only after the person asks for more information or says they want the link.",
    items: [
      {
        title: "If they are interested",
        use: "Send this after the starter message when they ask what the Network is.",
        copy: `It is called the Kingdom Intelligence Network. It is a community of Christian business owners and leaders who come together each week for practical business strategy, mentorship, wise counsel, and accountability. I have gotten a lot out of being around people who challenge my thinking instead of trying to sell me something.

If you would like to take a look, here is the link: [affiliate link]

Full transparency, I do receive a small referral thank-you if you decide to join, but it does not change your price at all.`,
      },
      {
        title: "If they ask for the link",
        use: "Send this once they have clearly asked to take a look.",
        copy: `Here is my link: [affiliate link].

And just so you know, it is an affiliate link, so I receive a small referral commission if you decide to join, but it does not change the price for you.`,
      },
    ],
  },
  {
    title: "Email",
    description: "Use this when the relationship deserves more context than a quick text.",
    items: [
      {
        title: "Longer, warmer relationship",
        use: "Use this for someone you would actually send an email to, not just a quick text.",
        copy: `Subject: Thought of you this week

Hey [Name],

I was thinking about you this week and everything you have been building, and I wanted to reach out.

You have mentioned before that [insert something specific about their business or a challenge they have shared]. That is actually why you came to mind.

One of the best decisions I have made as an entrepreneur was to surround myself with people who do not just cheer me on but also challenge my thinking, offer wise counsel, and help me work through real business decisions.

I have found that in the Kingdom Intelligence Network.

What I appreciate most is not just the teaching, but also having access to Christian business leaders, CEOs, and fellow entrepreneurs who understand the weight of leading a business while honoring God, family, and your calling.

I do not know if it is the right fit for you, but based on what you have shared over the years, I thought it was worth putting on your radar.

If you would like to learn more, here is my link:

[Affiliate Link]

Just so you know, it is an affiliate link. If you decide to join, I receive a small referral commission, but it does not cost you anything extra.

Either way, I am cheering you on and praying for God's wisdom as you continue building what He has called you to build.

Take care,

[Your Name]`,
      },
    ],
  },
  {
    title: "Social Post",
    description: "Use this when posting publicly instead of messaging someone directly.",
    items: [
      {
        title: "Facebook, Instagram, or LinkedIn caption",
        use: "Use this when posting publicly rather than messaging someone directly.",
        copy: `One of the biggest lessons I have learned as an entrepreneur is this:

You do not usually get stuck because you lack information.

You get stuck because you are making important decisions in isolation.

Every major breakthrough I have had came after a conversation with someone who challenged my thinking, asked better questions, or helped me see what I could not see on my own.

That is one of the reasons I have been so grateful for the Kingdom Intelligence Network.

If you are building a business and wishing you had more wise counsel, accountability, and people who genuinely want to see you succeed, it may be worth taking a look.

[Affiliate link]

Affiliate disclosure: If you join through my link, I receive a small referral commission at no additional cost to you.`,
      },
    ],
  },
  {
    title: "Voice Note",
    description: "Use this as a spoken guide. Send the link only if they ask for it.",
    items: [
      {
        title: "Message, WhatsApp, or Facebook voice note",
        use: "Use this as a rough guide for spoken language. Do not send the link unless the person asks for it.",
        copy: `Hey [Name], I was thinking about what you shared the other day, and it reminded me of this group I am part of, the Kingdom Intelligence Network.

Honestly, I think this is the kind of thing that has been so valuable for me. Having people to bounce ideas off of, get wise counsel from, and think through real business decisions with has made a huge difference.

I do not know if it would be a fit for you, but I thought of you right away. If you are curious, let me know and I would be happy to tell you more.`,
      },
    ],
  },
];

function CopyBlock({ text }: { text: string }) {
  return (
    <div className={styles.copyBlock}>
      <CopyButton text={text} />
      <pre>{text}</pre>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button className={styles.copyButton} type="button" data-copy-text={text}>
      Copy
    </button>
  );
}

export default function AffiliatePage() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBrandRow}>
              <img className={styles.logo} src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
              <p className={styles.heroKicker}>Kingdom Intelligence Network</p>
            </div>
            <p className={styles.eyebrow}>Affiliate Resource Hub</p>
            <h1>Affiliate Resources</h1>
            <p>
              Use these media assets and copy-paste invitations when someone comes to mind and you
              want to share the Network with warmth, clarity, and integrity.
            </p>
            <div className={styles.resourceActions}>
              <div className={styles.resourceAction}>
                <a className={styles.primaryButton} href={mediaLibraryUrl} target="_blank" rel="noreferrer">
                  Media library
                </a>
                <p>Use these official assets when posting publicly.</p>
              </div>
              <div className={styles.resourceAction}>
                <a className={styles.secondaryButton} href="#copy-paste">
                  Copy Messages
                </a>
                <p>Jump to ready-to-send copy by channel.</p>
              </div>
            </div>
          </div>
          <figure className={styles.heroVisual}>
            <img
              src="/images/kingdom-intel-events-invites.jpg"
              alt="Kingdom Intelligence Network members gathered together"
            />
            <figcaption>Share the Network like an invitation into the room.</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.startSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Start here</p>
            <h2>Share the Network clearly, personally, and with integrity.</h2>
          </div>
          <div className={styles.startGrid}>
            {startSteps.map((item) => (
              <article className={styles.startCard} key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.disclosurePanel}>
            <div>
              <p className={styles.eyebrow}>Disclosure guidance</p>
              <h3>Keep the referral note close to the link.</h3>
            </div>
            <p>
              Use simple language like: just so you know, it is an affiliate link, so I receive a
              small referral commission if you decide to join, but it does not change the price for
              you.
            </p>
          </div>
          <div className={styles.communityPanel}>
            <img src="/images/kingdom-intel-expect-room.jpg" alt="Kingdom Intelligence leaders in discussion" />
            <div>
              <p className={styles.eyebrow}>Community and sharing</p>
              <h3>Make the invitation feel like a warm handoff.</h3>
              <p>
                The goal is to help the right leader see the people, wisdom, and support behind the
                Network, then give them a simple next step when they are ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2>Use the resources without making it feel transactional.</h2>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <article className={styles.faqCard} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.openersSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Your conversation openers</p>
          <h2>When the moment is already there, keep it simple.</h2>
          <div className={styles.openersGrid}>
            {invitationOpeners.map((opener) => (
              <article className={styles.openerCard} key={opener}>
                <p>{opener}</p>
                <CopyButton text={opener} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="copy-paste" className={styles.swipeSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Copy paste</p>
            <h2>Choose the message that fits the relationship.</h2>
            <p>
              Start with the version that matches the moment, then adjust the details so it sounds
              like you. The goal is care, not pressure.
            </p>
          </div>

          <div className={styles.channelList}>
            {swipeSections.map((section) => (
              <section className={styles.channelSection} key={section.title}>
                <div className={styles.channelHeader}>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
                <div className={styles.swipeList}>
                  {section.items.map((swipe) => (
                    <article className={styles.swipeCard} key={swipe.title}>
                      <div className={styles.swipeIntro}>
                        <h4>{swipe.title}</h4>
                        <p>{swipe.use}</p>
                      </div>
                      <CopyBlock text={swipe.copy} />
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={`${styles.container} ${styles.finalInner}`}>
          <div>
            <p className={styles.eyebrow}>Integrity note</p>
            <h2>Your invitation should feel relational, not transactional.</h2>
          </div>
          <p>
            The strongest invitation is honest and specific: why they came to mind, what the
            Network has meant to you, and why you thought it might help them.
          </p>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: copyButtonScript }} />

      <footer className={styles.footer}>
        <div className={styles.container}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
          <p>&copy; 2026 Fueled By Fire. All Rights Reserved.</p>
          <div className={styles.footerLinks}>
            <a href="https://www.fbfchallenge.com/privacy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
            <a href="https://www.fbfchallenge.com/terms" target="_blank" rel="noreferrer">
              Terms of Service
            </a>
            <a href="https://www.fbfchallenge.com/disclaimer" target="_blank" rel="noreferrer">
              Disclaimer
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
