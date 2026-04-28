import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/language";
import { artistProfile } from "@/data/portfolio";
import heroImage from "@/assets/hero-craftsmanship.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rubayat Raihan" },
      {
        name: "description",
        content:
          "Rubayat Raihan is an artist and designer based in Bangladesh — bridging centuries-old Bengali craft with a contemporary design language.",
      },
      { property: "og:title", content: "About — Rubayat Raihan" },
      {
        property: "og:description",
        content:
          "Artist and designer based in Bangladesh — metal art, product, surface, fashion and installation work.",
      },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    year: "2021",
    en: "Founded the studio in Dhaka, Bangladesh.",
    bn: "ঢাকা, বাংলাদেশে স্টুডিও প্রতিষ্ঠা।",
  },
  {
    year: "2022",
    en: "First Behance feature for surface and dye explorations.",
    bn: "সারফেস ও ডাই অন্বেষণের জন্য প্রথম বিহান্স ফিচার।",
  },
  {
    year: "2024",
    en: "Brass relief series exhibited as part of a regional craft showcase.",
    bn: "একটি আঞ্চলিক কারুশিল্প প্রদর্শনীর অংশ হিসেবে ব্রাস রিলিফ সিরিজ প্রদর্শিত।",
  },
  {
    year: "2025",
    en: "Suspended installation series and lampshade collection released.",
    bn: "সাসপেন্ডেড ইনস্টলেশন সিরিজ ও ল্যাম্পশেড সংগ্রহ উন্মোচিত।",
  },
];

const PILLARS = [
  {
    icon: "✦",
    en: { title: "Craft", body: "Every surface is hand-worked — no two pieces are the same." },
    bn: { title: "কারুকাজ", body: "প্রতিটি সারফেস হাতে গড়া — কোন দু'টি কাজ এক নয়।" },
  },
  {
    icon: "◈",
    en: {
      title: "Material",
      body: "Brass, copper, cotton, natural dye — materials chosen for how they age, not just how they look.",
    },
    bn: {
      title: "উপাদান",
      body: "ব্রাস, তামা, সুতি, প্রাকৃতিক রঙ — যেভাবে তারা পুরনো হয় সেটির জন্য নির্বাচিত, কেবল দেখাশোনার জন্য নয়।",
    },
  },
  {
    icon: "❖",
    en: {
      title: "Place",
      body: "Rooted in Bengal — its motifs, its makers, and its centuries-old metal-working lineage.",
    },
    bn: {
      title: "স্থান",
      body: "বাংলায় প্রোথিত — এর মোটিফ, এর কারিগর এবং শতাব্দীপ্রাচীন ধাতু-কাজের ধারা।",
    },
  },
];

function AboutPage() {
  const { lang } = useLanguage();
  const otherLang: "en" | "bn" = lang === "en" ? "bn" : "en";

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 sm:px-6 sm:pb-24 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.18),_transparent_70%)]"
        />
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <p className="font-body-en text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "শিল্পীর কথা" : "About the artist"}
            </p>
            <h1
              lang={lang}
              className={`mt-4 text-4xl font-light leading-[1.04] sm:text-6xl lg:text-7xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "বাংলার কারুশিল্পকে সমকালীন ভাষায় গড়া।"
                : "Rendering the craft of Bengal in a contemporary tongue."}
            </h1>
            <p
              aria-hidden
              lang={otherLang}
              className={`mt-2 text-lg text-white/30 sm:text-xl ${
                otherLang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {otherLang === "bn"
                ? "বাংলার কারুশিল্পকে সমকালীন ভাষায় গড়া।"
                : "Rendering the craft of Bengal in a contemporary tongue."}
            </p>

            <div
              lang={lang}
              className={`mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-white/75 sm:text-lg ${
                lang === "bn" ? "font-body-bn" : "font-body-en"
              }`}
            >
              {lang === "bn" ? (
                <>
                  <p>
                    রুবায়াত রায়হান একজন শিল্পী ও ডিজাইনার, যিনি ধাতুশিল্প, পণ্য,
                    সারফেস ও ফ্যাশন ডিজাইনের ক্ষেত্রে কাজ করেন। তাঁর অনুশীলন ব্রাস ও
                    তামার হাতে গড়া রিলিফ থেকে শুরু করে প্রাকৃতিক রঙে রঞ্জিত
                    সারফেস এবং সাইট-স্পেসিফিক ইনস্টলেশন পর্যন্ত বিস্তৃত।
                  </p>
                  <p>
                    তাঁর কাজ বাংলার শতাব্দীপ্রাচীন কারুঐতিহ্যকে সমকালীন ডিজাইনের
                    ভাষায় অনুবাদ করে — যেখানে উপাদান নিজের ভাষায় কথা বলে এবং প্রতিটি
                    পৃষ্ঠ একটি গল্প বহন করে।
                  </p>
                  <p>
                    ২০২১ সাল থেকে তিনি ঢাকার একটি ছোট স্টুডিও থেকে কমিশন,
                    সংগ্রাহক ও স্থাপত্যের জন্য কাজ করে আসছেন।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Rubayat Raihan is an artist and designer working across metal
                    art, product, surface and fashion. His practice ranges from
                    hand-hammered brass and copper relief to naturally dyed surface
                    studies and site-specific installations.
                  </p>
                  <p>
                    The work translates the centuries-old craft heritage of Bengal
                    into a contemporary design vocabulary — letting materials speak
                    in their own tongue and treating every surface as a narrative.
                  </p>
                  <p>
                    Since 2021 he has worked from a small studio in Dhaka, taking
                    commissions for collectors, hospitality and architectural
                    contexts.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Portrait card */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-3xl bg-gradient-to-br from-[#c9a84c]/30 to-transparent blur-2xl" />
            <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <img
                src={heroImage}
                alt="Hands working glowing copper at the forge"
                className="h-full w-full object-cover"
                width={900}
                height={1200}
              />
              <figcaption className="border-t border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
                <p className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-[#e8c98a]">
                  {lang === "bn" ? "স্টুডিও" : "The Studio"}
                </p>
                <p
                  lang={lang}
                  className={`mt-2 text-base text-white/85 ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {artistProfile?.basedIn ?? "Bangladesh"} ·{" "}
                  {lang === "bn" ? "সদস্য" : "Member"}{" "}
                  {artistProfile?.memberSince ?? "January 2021"}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-white/10 bg-black/40 px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
            {lang === "bn" ? "দর্শন" : "Philosophy"}
          </p>
          <h2
            lang={lang}
            className={`mt-3 max-w-3xl text-3xl font-light leading-tight sm:text-5xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "তিনটি স্তম্ভের উপর দাঁড়ানো একটি অনুশীলন।"
              : "A practice that stands on three pillars."}
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => {
              const copy = p[lang];
              return (
                <li
                  key={i}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition hover:border-[#c9a84c]/50 hover:bg-white/[0.07]"
                >
                  <span className="text-3xl text-[#c9a84c]" aria-hidden>
                    {p.icon}
                  </span>
                  <h3
                    lang={lang}
                    className={`mt-4 text-2xl font-light text-white ${
                      lang === "bn" ? "font-display-bn" : "font-display-en"
                    }`}
                  >
                    {copy.title}
                  </h3>
                  <p
                    lang={lang}
                    className={`mt-3 text-sm leading-relaxed text-white/70 ${
                      lang === "bn" ? "font-body-bn" : "font-body-en"
                    }`}
                  >
                    {copy.body}
                  </p>
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#e8c98a] via-[#c9a84c] to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
            {lang === "bn" ? "ভ্রমণ" : "Journey"}
          </p>
          <h2
            lang={lang}
            className={`mt-3 max-w-3xl text-3xl font-light sm:text-5xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn" ? "একটি অনুশীলনের কালক্রম।" : "A practice over time."}
          </h2>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <li
                key={t.year}
                className="bg-[#0a0907]/80 p-7 transition hover:bg-[#0a0907]/40"
              >
                <p className="font-display-en text-3xl font-light text-[#e8c98a] sm:text-4xl">
                  {t.year}
                </p>
                <p
                  lang={lang}
                  className={`mt-3 text-sm leading-relaxed text-white/70 ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {t[lang]}
                </p>
                <p
                  className="font-body-en mt-5 text-[0.55rem] uppercase tracking-[0.4em] text-white/30"
                  aria-hidden
                >
                  0{i + 1}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-black/40 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "এগিয়ে দেখুন" : "Continue"}
            </p>
            <p
              lang={lang}
              className={`mt-3 max-w-xl text-2xl font-light sm:text-3xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "স্টুডিও থেকে নির্বাচিত কাজগুলো দেখুন।"
                : "See selected works from the studio."}
            </p>
          </div>
          <Link
            to="/work"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#f5d98a] via-[#c9a84c] to-[#8c6a1f] px-7 py-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-black"
          >
            <span className="relative z-10">
              {lang === "bn" ? "পোর্টফোলিও দেখুন" : "Explore the portfolio"}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
