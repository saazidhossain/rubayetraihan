import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Rubayat Raihan" },
      {
        name: "description",
        content:
          "Notes from the studio — process, material and inspiration behind Rubayat Raihan's work.",
      },
      { property: "og:title", content: "Insights — Rubayat Raihan" },
      {
        property: "og:description",
        content: "Process notes, material studies and inspiration from the studio.",
      },
    ],
  }),
  component: InsightsPage,
});

interface Insight {
  id: string;
  date: string;
  category: { en: string; bn: string };
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
}

const INSIGHTS: Insight[] = [
  {
    id: "01",
    date: "2025-09-12",
    category: { en: "Process", bn: "প্রক্রিয়া" },
    title: {
      en: "Repoussé, slow looking and the warmth of brass",
      bn: "রিপুসে, ধীর-দৃষ্টি ও ব্রাসের উষ্ণতা",
    },
    excerpt: {
      en: "Why hand-hammered brass keeps showing me something new — even after the hundredth panel.",
      bn: "কেন হাতে-হাতুড়িকৃত ব্রাস শততম প্যানেলের পরেও নতুন কিছু দেখায়।",
    },
  },
  {
    id: "02",
    date: "2025-07-04",
    category: { en: "Material", bn: "উপাদান" },
    title: {
      en: "On natural dye and the patience of indigo",
      bn: "প্রাকৃতিক রঙ ও ইন্ডিগোর ধৈর্য সম্পর্কে",
    },
    excerpt: {
      en: "Working with vat-dyed cotton teaches a different relationship with time than working with metal.",
      bn: "ভ্যাট-ডাইড সুতির সাথে কাজ ধাতুর তুলনায় সময়ের সাথে এক ভিন্ন সম্পর্ক শেখায়।",
    },
  },
  {
    id: "03",
    date: "2025-05-21",
    category: { en: "Studio", bn: "স্টুডিও" },
    title: {
      en: "Notes from the lampshade series",
      bn: "ল্যাম্পশেড সিরিজ থেকে কিছু নোট",
    },
    excerpt: {
      en: "How a sculptural pendant became a study in light, shadow and the body of a single object.",
      bn: "কীভাবে একটি ভাস্কর্যিক পেন্ডেন্ট আলো, ছায়া ও একটি বস্তুর শরীরের অধ্যয়নে পরিণত হলো।",
    },
  },
  {
    id: "04",
    date: "2025-03-09",
    category: { en: "Inspiration", bn: "অনুপ্রেরণা" },
    title: {
      en: "Folk motifs of Bengal, re-read in metal",
      bn: "বাংলার লোকজ মোটিফ — ধাতুতে নতুন করে পড়া",
    },
    excerpt: {
      en: "What the folk-art lineage of Bengal looks like when it is set down in beaten brass instead of clay or cloth.",
      bn: "মাটি বা কাপড়ের বদলে পেটানো ব্রাসে রাখলে বাংলার লোকশিল্প-ধারা কেমন দেখায়।",
    },
  },
];

function InsightsPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav />

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.18),_transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl">
          <p className="font-body-en text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a]">
            {lang === "bn" ? "ব্লগ / অন্তর্দৃষ্টি" : "Insights"}
          </p>
          <h1
            lang={lang}
            className={`mt-4 max-w-4xl text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "স্টুডিও থেকে কিছু নোট।"
              : "Notes from the studio."}
          </h1>
          <p className="font-body-en mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
            {lang === "bn"
              ? "প্রক্রিয়া, উপাদান ও অনুপ্রেরণা — চলমান অনুশীলনের পাশে যা যা পড়া ও ভাবা হচ্ছে।"
              : "Process, material and inspiration — what's being read and thought about alongside the practice."}
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ul className="grid gap-5 md:grid-cols-2">
            {INSIGHTS.map((post, i) => (
              <li
                key={post.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition hover:border-[#c9a84c]/40 hover:bg-white/[0.07] sm:p-9"
              >
                <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.4em] text-white/40">
                  <span className="font-body-en text-[#e8c98a]">
                    <span lang={lang} className={lang === "bn" ? "font-body-bn" : ""}>
                      {post.category[lang]}
                    </span>
                  </span>
                  <span className="font-body-en">
                    {new Date(post.date).toLocaleDateString(
                      lang === "bn" ? "bn-BD" : "en-GB",
                      { month: "short", year: "numeric" },
                    )}
                  </span>
                </div>
                <h2
                  lang={lang}
                  className={`mt-5 text-2xl font-light leading-snug text-white sm:text-3xl ${
                    lang === "bn" ? "font-display-bn" : "font-display-en"
                  }`}
                >
                  {post.title[lang]}
                </h2>
                <p
                  lang={lang}
                  className={`mt-3 text-sm leading-relaxed text-white/70 sm:text-base ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {post.excerpt[lang]}
                </p>
                <div className="mt-7 flex items-center justify-between">
                  <span className="font-body-en text-[0.55rem] uppercase tracking-[0.4em] text-white/30">
                    0{i + 1} / {INSIGHTS.length.toString().padStart(2, "0")}
                  </span>
                  <span className="font-body-en text-[0.65rem] uppercase tracking-[0.3em] text-[#e8c98a] transition group-hover:translate-x-1">
                    {lang === "bn" ? "শীঘ্রই" : "Coming soon"} →
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
