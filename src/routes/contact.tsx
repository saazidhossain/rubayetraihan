import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rubayat Raihan" },
      {
        name: "description",
        content:
          "Get in touch with Rubayat Raihan for commissions, collaborations and press enquiries.",
      },
      { property: "og:title", content: "Contact — Rubayat Raihan" },
      {
        property: "og:description",
        content: "Commissions, collaborations and press enquiries.",
      },
    ],
  }),
  component: ContactPage,
});

const SUBJECTS = [
  { id: "commission", en: "Commission", bn: "কমিশন" },
  { id: "collab", en: "Collaboration", bn: "সহযোগিতা" },
  { id: "press", en: "Press", bn: "প্রেস" },
  { id: "other", en: "Other", bn: "অন্যান্য" },
];

function ContactPage() {
  const { lang } = useLanguage();
  const [subject, setSubject] = useState("commission");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subjectLabel =
      SUBJECTS.find((s) => s.id === subject)?.en ?? "Enquiry";

    // Open the user's mail client with the prefilled enquiry — no backend required.
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:hello@rubayatraihan.studio?subject=${encodeURIComponent(
      `[${subjectLabel}] from ${name || "the website"}`,
    )}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav />

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 sm:px-6 sm:pb-24 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.2),_transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl">
          <p className="font-body-en text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a]">
            {lang === "bn" ? "যোগাযোগ" : "Get in touch"}
          </p>
          <h1
            lang={lang}
            className={`mt-4 max-w-3xl text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "একটি কথা শুরু হোক।"
              : "Let's start a conversation."}
          </h1>
          <p className="font-body-en mt-6 max-w-xl text-base text-white/65 sm:text-lg">
            {lang === "bn"
              ? "কমিশন, সহযোগিতা ও প্রেস সংক্রান্ত যোগাযোগের জন্য নিচের ফর্মটি ব্যবহার করুন। সাধারণত ২–৩ কর্মদিবসের মধ্যে উত্তর দেওয়া হয়।"
              : "Use the form below for commissions, collaborations and press. Replies typically arrive within 2–3 working days."}
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md sm:p-10"
          >
            <fieldset className="space-y-7">
              <legend className="sr-only">
                {lang === "bn" ? "যোগাযোগের ফর্ম" : "Contact form"}
              </legend>

              {/* Subject selector */}
              <div>
                <label className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
                  {lang === "bn" ? "বিষয়" : "Subject"}
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUBJECTS.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSubject(s.id)}
                      className={`rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition ${
                        subject === s.id
                          ? "border-[#c9a84c] bg-[#c9a84c]/15 text-[#e8c98a]"
                          : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <span lang={lang} className={lang === "bn" ? "font-body-bn" : ""}>
                        {s[lang]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  name="name"
                  required
                  label={lang === "bn" ? "নাম" : "Name"}
                  lang={lang}
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  required
                  label={lang === "bn" ? "ইমেইল" : "Email"}
                  lang={lang}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-body-en block text-[0.6rem] uppercase tracking-[0.4em] text-white/50"
                >
                  {lang === "bn" ? "বার্তা" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder={
                    lang === "bn"
                      ? "আপনার প্রকল্প, সময়সীমা ও বাজেট সম্পর্কে কিছু লিখুন…"
                      : "Tell me about your project, timeline and budget…"
                  }
                  className="font-body-en mt-3 w-full resize-y rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/30 outline-none transition focus:border-[#c9a84c] focus:bg-white/[0.06]"
                />
              </div>

              <div className="flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-body-en text-xs text-white/40">
                  {lang === "bn"
                    ? "ফর্ম পাঠালে আপনার মেইল ক্লায়েন্ট খুলবে।"
                    : "Submitting opens your mail client."}
                </p>
                <button
                  type="submit"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#f5d98a] via-[#c9a84c] to-[#8c6a1f] px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-black shadow-[0_10px_40px_-10px_rgba(201,168,76,0.6)] transition hover:shadow-[0_15px_55px_-10px_rgba(201,168,76,0.85)]"
                >
                  <span className="relative z-10">
                    {lang === "bn" ? "বার্তা পাঠান" : "Send message"}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </div>

              {submitted && (
                <p
                  role="status"
                  className="font-body-en rounded-2xl border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-4 py-3 text-sm text-[#e8c98a]"
                >
                  {lang === "bn"
                    ? "ধন্যবাদ — আপনার মেইল ক্লায়েন্ট খোলা হয়েছে।"
                    : "Thank you — your mail client has been opened."}
                </p>
              )}
            </fieldset>
          </form>

          {/* Sidebar */}
          <aside className="space-y-5">
            <InfoCard
              eyebrow={lang === "bn" ? "ইমেইল" : "Email"}
              title="hello@rubayatraihan.studio"
              href="mailto:hello@rubayatraihan.studio"
              lang={lang}
            />
            <InfoCard
              eyebrow={lang === "bn" ? "স্টুডিও" : "Studio"}
              title={lang === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
              caption={lang === "bn" ? "ভিজিট অ্যাপয়েন্টমেন্টে" : "Visits by appointment"}
              lang={lang}
            />
            <InfoCard
              eyebrow={lang === "bn" ? "এলসহোয়্যার" : "Elsewhere"}
              title="Behance · Instagram · LinkedIn"
              caption={
                lang === "bn"
                  ? "সাম্প্রতিক কাজ ও প্রক্রিয়া দেখুন।"
                  : "See process notes and recent work."
              }
              href="https://www.behance.net/rubayatraihan"
              lang={lang}
            />

            <div className="rounded-3xl border border-[#c9a84c]/40 bg-gradient-to-br from-[#c9a84c]/15 to-transparent p-7 backdrop-blur-md">
              <p className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-[#e8c98a]">
                {lang === "bn" ? "কমিশনের সময়সীমা" : "Commission timeline"}
              </p>
              <p
                lang={lang}
                className={`mt-3 text-base leading-relaxed text-white/85 ${
                  lang === "bn" ? "font-body-bn" : "font-body-en"
                }`}
              >
                {lang === "bn"
                  ? "ছোট কাজ ৩–৫ সপ্তাহ। বড় ও স্থাপত্যিক কাজ ৮–১২ সপ্তাহ।"
                  : "Smaller pieces 3–5 weeks. Architectural-scale commissions 8–12 weeks."}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({
  id,
  name,
  label,
  lang,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  lang: "en" | "bn";
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-body-en block text-[0.6rem] uppercase tracking-[0.4em] text-white/50"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        lang={lang}
        className="font-body-en mt-3 w-full rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition focus:border-[#c9a84c] focus:bg-white/[0.06]"
      />
    </div>
  );
}

function InfoCard({
  eyebrow,
  title,
  caption,
  href,
  lang,
}: {
  eyebrow: string;
  title: string;
  caption?: string;
  href?: string;
  lang: "en" | "bn";
}) {
  const inner = (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition group-hover:border-[#c9a84c]/40 group-hover:bg-white/[0.06]">
      <p className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-[#e8c98a]">
        {eyebrow}
      </p>
      <p
        lang={lang}
        className={`mt-2 text-lg font-light text-white ${
          lang === "bn" ? "font-display-bn" : "font-display-en"
        }`}
      >
        {title}
      </p>
      {caption && (
        <p
          lang={lang}
          className={`mt-1 text-xs text-white/55 ${
            lang === "bn" ? "font-body-bn" : "font-body-en"
          }`}
        >
          {caption}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group block"
      >
        {inner}
      </a>
    );
  }
  return <div className="group">{inner}</div>;
}
