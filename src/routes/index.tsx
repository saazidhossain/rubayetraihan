import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import heroImage from "@/assets/hero-craftsmanship.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rubayat Raihan — Artistry in Metal, Design in Form" },
      {
        name: "description",
        content:
          "Portfolio of Rubayat Raihan — metal art, product design, surface design, fashion design and installation work. Available for commissions worldwide.",
      },
      { property: "og:title", content: "Rubayat Raihan — Artistry in Metal, Design in Form" },
      {
        property: "og:description",
        content:
          "Hand-crafted metal relief, lighting, surface and fashion design from Bangladesh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <a
            href="#"
            className="text-sm uppercase tracking-[0.35em] text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Rubayat Raihan
          </a>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Toggle language"
          >
            {lang === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Artisan hands hammering glowing copper at the forge"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:pb-28">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/70">
            {lang === "bn" ? "শিল্পী ও ডিজাইনার" : "Artist & Designer"}
          </p>
          <h1
            className="max-w-4xl text-4xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {lang === "bn"
              ? "ধাতুতে শিল্প, আকারে ডিজাইন।"
              : "Artistry in Metal, Design in Form."}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
            {lang === "bn"
              ? "ঐতিহ্য ও সমকালীনতার সংমিশ্রণে গড়া হাতে-নির্মিত কাজ — ধাতব রিলিফ, পণ্য, সারফেস এবং ফ্যাশন।"
              : "Hand-made work bridging tradition and the contemporary — across metal relief, product, surface and fashion."}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="rounded-full bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.25em] text-black transition hover:bg-white/90"
            >
              {lang === "bn" ? "পোর্টফোলিও দেখুন" : "View Portfolio"}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 bg-white/5 px-7 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md transition hover:bg-white/15"
            >
              {lang === "bn" ? "কমিশনের জন্য যোগাযোগ" : "Commission Work"}
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <PortfolioGrid lang={lang} />

      {/* Simple footer placeholder */}
      <footer
        id="contact"
        className="border-t border-border bg-background px-4 py-12 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        © {new Date().getFullYear()} Rubayat Raihan
      </footer>
    </main>
  );
}
