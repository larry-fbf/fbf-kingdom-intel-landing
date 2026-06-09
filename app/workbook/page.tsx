"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const descriptors = ["CEO (Decision Maker)", "Entrepreneur/Expert", "Startup", "Coach/ Consultant", "Dreamer"];
const startTimelines = ["ASAP", "1-14 Days", "15-30 Days", "30+ Days", "60+ Days"];
const helpAreas = ["Sales/Marketing", "Operations", "Human Resources", "Relationships", "Personal clarity", "Health & Wellness", "Financial Freedom"];
const attendedOptions = ["Yes", "No"];
const incomeRanges = ["Under $10K/month", "$10K–$50K/month", "$50K–$100K/month", "$100K–$500K/month", "$500K-$1 Mill/month", "$1 Mill +/month"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  whichOfTheFollowingBestDescribesYou: "",
  oneThing: "",
  outcomeImpact: "",
  otherDecisionMakers: "",
  wantResults: "",
  helpAreas: [] as string[],
  sessionConnectionPreference: "",
  attendedWorkshop: "",
  monthlyIncomeRange: "",
};

type Status = "idle" | "loading" | "error";

function FieldLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className={styles.formLabel}>
      {children}{required ? <span> *</span> : null}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={styles.formInput} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${styles.formInput} ${styles.formTextarea}`} />;
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={styles.formInput} />;
}

export default function WorkbookPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  const setField = (name: keyof typeof initialForm, value: string | string[]) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleHelpArea = (area: string) => {
    setForm((current) => ({
      ...current,
      helpAreas: current.helpAreas.includes(area)
        ? current.helpAreas.filter((item) => item !== area)
        : [...current.helpAreas, area],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/workbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("submit failed");
      router.push("/workbook-thank-you");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className={styles.pageShell}>
      <section className={`${styles.heroSection} ${styles.workbookHero} ${styles.workbookHeroCompact}`}>
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.workbookHeroLayout} ${styles.workbookHeroCoverLayout}`}>
          <div className={styles.workbookHeroCopy}>
            <Image src="/images/fbf-logo-white.png" alt="Fueled By Fire" width={154} height={72} className={styles.workbookLogo} priority />
            <p className={styles.heroKicker}>Kingdom Intelligence Masterclass</p>
            <h1 className={styles.workbookTitle}>Get Your Masterclass Workbook</h1>
            <p className={styles.heroDescription}>
              Complete the short intake below to unlock the workbook and prepare for the live sessions.
            </p>
          </div>
          <div className={styles.workbookHeroCard}>
            <Image src="/images/kingdom-intel-workbook-cover.jpg" alt="Kingdom Intelligence Masterclass workbook" width={1280} height={720} className={styles.workbookHeroImage} priority />
          </div>
        </div>
      </section>

      <section className={styles.workbookFormSection}>
        <div className={`${styles.container} ${styles.workbookFormLayout}`}>
          <aside className={styles.workbookSidebar}>
            <p className={styles.eyebrow}>Before you download</p>
            <h2 className={styles.heading}>Help us tailor the masterclass experience.</h2>
            <p className={styles.sectionCopy}>
              Your answers help the team understand where you are and how to serve you well.
            </p>
          </aside>

          <form className={styles.workbookForm} onSubmit={handleSubmit}>
                <div className={styles.formIntro}>
                  <h2>Masterclass workbook form</h2>
                  <p>Fields marked with an asterisk are required.</p>
                </div>

                <div className={styles.formGridTwo}>
                  <div><FieldLabel required>First name</FieldLabel><TextInput required value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} /></div>
                  <div><FieldLabel required>Last name</FieldLabel><TextInput required value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} /></div>
                </div>

                <div className={styles.formGridTwo}>
                  <div><FieldLabel required>Email</FieldLabel><TextInput required type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} /></div>
                  <div><FieldLabel required>Phone</FieldLabel><TextInput required type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} /></div>
                </div>

                <div className={styles.formGridTwo}>
                  <div><FieldLabel required>Company name</FieldLabel><TextInput required value={form.company} onChange={(e) => setField("company", e.target.value)} /></div>
                </div>

                <div>
                  <FieldLabel required>Which of the following best describes you</FieldLabel>
                  <SelectInput required value={form.whichOfTheFollowingBestDescribesYou} onChange={(e) => setField("whichOfTheFollowingBestDescribesYou", e.target.value)}>
                    <option value="">Select one</option>
                    {descriptors.map((option) => <option key={option} value={option}>{option}</option>)}
                  </SelectInput>
                </div>

                <div><FieldLabel required>If we could help you achieve one thing, what would it be?</FieldLabel><TextArea required value={form.oneThing} onChange={(e) => setField("oneThing", e.target.value)} /></div>
                <div><FieldLabel required>How would achieving this outcome improve your business or life?</FieldLabel><TextArea required value={form.outcomeImpact} onChange={(e) => setField("outcomeImpact", e.target.value)} /></div>
                <div><FieldLabel required>Is there anyone else involved in the decision making of your business? If so, do we need to include them in our email communication to join us on the call? Please provide their email.</FieldLabel><TextInput required value={form.otherDecisionMakers} onChange={(e) => setField("otherDecisionMakers", e.target.value)} /></div>

                <div>
                  <FieldLabel required>If you knew you&apos;d get results, how soon would you be looking to get started receiving the help you are looking for?</FieldLabel>
                  <SelectInput required value={form.wantResults} onChange={(e) => setField("wantResults", e.target.value)}>
                    <option value="">Select one</option>
                    {startTimelines.map((option) => <option key={option} value={option}>{option}</option>)}
                  </SelectInput>
                </div>

                <fieldset className={styles.checkboxFieldset}>
                  <legend>What area do you need the most help with? *</legend>
                  <div className={styles.checkboxGrid}>
                    {helpAreas.map((area) => (
                      <label key={area} className={styles.checkboxOption}>
                        <input type="checkbox" checked={form.helpAreas.includes(area)} onChange={() => toggleHelpArea(area)} />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div><FieldLabel>How would you like for us to connect with you for this session? Phone or Zoom?</FieldLabel><TextInput value={form.sessionConnectionPreference} onChange={(e) => setField("sessionConnectionPreference", e.target.value)} /></div>

                <fieldset className={styles.checkboxFieldset}>
                  <legend>Have you attended one of our FREE Online Workshops or Masterclasses? *</legend>
                  <div className={styles.radioRow}>
                    {attendedOptions.map((option) => (
                      <label key={option} className={styles.checkboxOption}>
                        <input required type="radio" name="attendedWorkshop" value={option} checked={form.attendedWorkshop === option} onChange={(e) => setField("attendedWorkshop", e.target.value)} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className={styles.checkboxFieldset}>
                  <legend>Which range best represents your current monthly business or household income? *</legend>
                  <div className={styles.checkboxGrid}>
                    {incomeRanges.map((option) => (
                      <label key={option} className={styles.checkboxOption}>
                        <input required type="radio" name="monthlyIncomeRange" value={option} checked={form.monthlyIncomeRange === option} onChange={(e) => setField("monthlyIncomeRange", e.target.value)} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <input type="hidden" value="" name="stage_of_growth" />
                <input type="hidden" value="" name="leadership_experience" />
                <input type="hidden" value="" name="kingdom_alignment" />
                <input type="hidden" value="" name="ready_to_invest" />

                <button className={`${styles.button} ${styles.buttonGold} ${styles.workbookSubmit}`} disabled={status === "loading"} type="submit">
                  {status === "loading" ? "Submitting..." : "Get workbook access"}
                </button>
                {status === "error" ? <p className={styles.formError}>Something went wrong. Please try again.</p> : null}
          </form>
        </div>
      </section>
    </main>
  );
}
