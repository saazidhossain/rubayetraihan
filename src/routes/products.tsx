import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/language";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Rubayat Raihan" },
      {
        name: "description",
        content:
          "Hand-crafted lampshades, wall clocks, brass relief panels and limited-edition objects available to commission.",
      },
      { property: "og:title", content: "Products — Rubayat Raihan" },
      {
        property: "og:description",
        content:
          "Lampshades, wall clocks and brass relief panels — available to commission.",
      },
    ],
  }),
  component: ProductsPage,
});

interface Tier {
  id: "ready" | "custom" | "limited";
  label: { en: string; bn: string };
  blurb: { en: string; bn: string };
  slugs: string[];
}

const TIERS: Tier[] = [
  {
    id: "ready",
    label: { en: "Ready to Order", bn: "তৈরি অর্ডারের জন্য" },
    blurb: {
      en: "Designs that can be reproduced in 3–5 weeks once an order is placed.",
      bn: "অর্ডার পাওয়ার পর ৩–৫ সপ্তাহে পুনরায় তৈরি করা সম্ভব এমন ডিজাইন।",
    },
    slugs: ["lampshade-i", "lampshade-ii", "wall-clock"],
  },
  {
    id: "custom",
    label: { en: "Custom Commissions", bn: "কাস্টম কমিশন" },
    blurb: {
      en: "One-of-a-kind brass relief and surface work created in dialogue with you.",
      bn: "আপনার সাথে আলোচনার মাধ্যমে তৈরি একক ব্রাস রিলিফ ও সারফেস কাজ।",
    },
    slugs: ["brass-relief-i", "brass-relief-ii", "brass-relief-v"],
  },
  {
    id: "limited",
    label: { en: "Limited Editions", bn: "সীমিত সংস্করণ" },
    blurb: {
      en: "Small editions — typically 1–10 pieces — drawn from gallery and installation series.",
      bn: "ছোট সংস্করণ — সাধারণত ১–১০ কপি — গ্যালারি ও ইনস্টলেশন সিরিজ থেকে।",
    },
    slugs: ["installation-i", "tie-dye-i", "surface-i"],
  },
];

function ProductsPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav />

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-15%] -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.2),_transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl">
          <p className="font-body-en text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a]">
            {lang === "bn" ? "পণ্য" : "Products"}
          </p>
          <h1
            lang={lang}
            className={`mt-4 max-w-4xl text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "অর্ডার ও কমিশনের জন্য বস্তু।"
              : "Objects to order and to commission."}
          </h1>
          <p className="font-body-en mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
            {lang === "bn"
              ? "ছোট ল্যাম্পশেড থেকে স্থাপত্যিক ব্রাস প্যানেল — সব কাজ স্টুডিওতে হাতে তৈরি।"
              : "From small lampshades to architectural brass panels — every piece is hand-made in the studio."}
          </p>
        </div>
      </section>

      {/* Tiers */}
      {TIERS.map((tier, ti) => {
        const items = tier.slugs
          .map((s) => projects.find((p) => p.slug === s))
          .filter(Boolean) as typeof projects;

        return (
          <section
            key={tier.id}
            className={`px-5 py-16 sm:px-6 sm:py-24 ${ti % 2 === 1 ? "border-y border-white/10 bg-black/40" : ""}`}
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-[#e8c98a]">
                    {String(ti + 1).padStart(2, "0")} ·{" "}
                    {lang === "bn" ? "শ্রেণি" : "Tier"}
                  </p>
                  <h2
                    lang={lang}
                    className={`mt-3 text-3xl font-light leading-tight sm:text-5xl ${
                      lang === "bn" ? "font-display-bn" : "font-display-en"
                    }`}
                  >
                    {tier.label[lang]}
                  </h2>
                </div>
                <p
                  lang={lang}
                  className={`max-w-md text-sm text-white/65 sm:text-base ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {tier.blurb[lang]}
                </p>
              </div>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <li
                    key={p.id}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition hover:border-[#c9a84c]/40"
                  >
                    <Link to="/work/$slug" params={{ slug: p.slug }} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={p.media.image}
                          alt={p.title[lang]}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </div>
                      <div className="border-t border-white/10 p-5">
                        <h3
                          lang={lang}
                          className={`text-lg font-light text-white ${
                            lang === "bn" ? "font-display-bn" : "font-display-en"
                          }`}
                        >
                          {p.title[lang]}
                        </h3>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="font-body-en text-[0.6rem] uppercase tracking-[0.3em] text-[#e8c98a]">
                            {lang === "bn" ? "মূল্যের জন্য জিজ্ঞাসা করুন" : "Inquire for price"}
                          </p>
                          <span className="font-body-en text-[0.65rem] uppercase tracking-[0.3em] text-white/40 transition group-hover:translate-x-1 group-hover:text-[#e8c98a]">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}
