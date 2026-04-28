import { createFileRoute } from "@tanstack/react-router";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Rubayat Raihan" },
      {
        name: "description",
        content:
          "Selected works by Rubayat Raihan — metal art, product design, surface design, fashion and installation.",
      },
      { property: "og:title", content: "Work — Rubayat Raihan" },
      {
        property: "og:description",
        content:
          "Selected works in metal, product, surface, fashion and installation art.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav />

      <section className="relative isolate overflow-hidden px-5 pb-12 pt-36 sm:px-6 sm:pb-16 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.18),_transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl">
          <p className="font-body-en text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a]">
            {lang === "bn" ? "পোর্টফোলিও" : "Portfolio"}
          </p>
          <h1
            lang={lang}
            className={`mt-4 max-w-4xl text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "ধাতু, পণ্য, সারফেস ও ইনস্টলেশনে নির্বাচিত কাজ।"
              : "Selected works across metal, form, surface and space."}
          </h1>
          <p className="font-body-en mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
            {lang === "bn"
              ? "প্রতিটি প্রকল্প হাতে গড়া, একক, এবং কমিশনের জন্য উপলব্ধ। ক্যাটাগরি অনুযায়ী ফিল্টার করুন।"
              : "Every project is hand-crafted, one-of-a-kind, and available to commission. Filter by category to explore."}
          </p>
        </div>
      </section>

      <PortfolioGrid lang={lang} />

      <SiteFooter />
    </main>
  );
}
