import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Hero } from "@/components/Hero";
import { useLanguage } from "@/lib/language";
import { artistProfile } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rubayat Raihan — Artistry in Metal, Design in Form" },
      {
        name: "description",
        content:
          "Portfolio of Rubayat Raihan — metal art, product design, surface design and installation work from Bangladesh. Available for commissions worldwide.",
      },
      {
        property: "og:title",
        content: "Rubayat Raihan — Artistry in Metal, Design in Form",
      },
      {
        property: "og:description",
        content:
          "Hand-crafted brass relief, lighting, surface and installation work from Bangladesh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <Hero lang={lang} />

      <PortfolioGrid lang={lang} />

      {/* Studio note */}
      <section
        id="about"
        className="border-t border-white/10 bg-black/40 px-6 py-20 sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_2fr]">
          <p
            lang="en"
            className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]"
          >
            {lang === "bn" ? "স্টুডিও" : "The Studio"}
          </p>
          <div>
            <p
              lang={lang}
              className={`text-2xl leading-snug text-white/90 sm:text-3xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "ধাকার একটি ছোট স্টুডিও থেকে — হাতে গড়া ব্রাস রিলিফ, আলো, সারফেস ও ইনস্টলেশন। প্রতিটি কাজ অর্ডার অনুযায়ী, কেউ একটি কপির মতো নয়।"
                : "From a small studio in Bangladesh — hand-forged brass relief, lighting, surface and installation work. Each piece is made to order; no two are the same."}
            </p>
            <p className="font-body-en mt-6 text-sm text-white/60">
              {artistProfile?.basedIn ?? "Bangladesh"} ·{" "}
              {lang === "bn" ? "সদস্য" : "Member"}{" "}
              {artistProfile?.memberSince ?? "January 2021"} ·{" "}
              {lang === "bn"
                ? "ফ্রিল্যান্স ও ফুল-টাইমের জন্য উপলব্ধ"
                : "Available for freelance & full-time"}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-white/10 bg-[#0a0907] px-6 py-14"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p
              className={`text-2xl font-light text-white sm:text-3xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "একটি কাজ একসাথে তৈরি করি।"
                : "Let's make something together."}
            </p>
            <a
              href="mailto:hello@rubayatraihan.studio"
              className="font-body-en mt-3 inline-block text-sm text-[#e8c98a] underline-offset-4 hover:underline"
            >
              hello@rubayatraihan.studio
            </a>
          </div>
          <div className="font-body-en flex flex-wrap gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
            <a
              href={artistProfile?.behance ?? "https://www.behance.net/rubayatraihan"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Behance ↗
            </a>
            <Link to="/" className="hover:text-white">
              Portfolio
            </Link>
          </div>
        </div>
        <p className="font-body-en mt-10 text-center text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
          © {new Date().getFullYear()} Rubayat Raihan
        </p>
      </footer>
    </main>
  );
}
