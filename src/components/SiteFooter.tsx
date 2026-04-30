import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";
import { artistProfile } from "@/data/portfolio";
import { getSazidCredit } from "@/lib/footerCredit";

const FOOTER_LINKS = [
  { to: "/work" as const, label: { en: "Work", bn: "কাজ" } },
  { to: "/products" as const, label: { en: "Products", bn: "পণ্য" } },
  { to: "/about" as const, label: { en: "About", bn: "আমার সম্পর্কে" } },
  { to: "/insights" as const, label: { en: "Insights", bn: "অন্তর্দৃষ্টি" } },
  { to: "/contact" as const, label: { en: "Contact", bn: "যোগাযোগ" } },
];

export function SiteFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0907] px-5 pb-10 pt-20 text-white sm:px-6 sm:pt-28">
      {/* Atmospheric gold wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.18),_transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl">
        {/* CTA band */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "একসাথে কাজ করি" : "Let's work together"}
            </p>
            <h2
              lang={lang}
              className={`mt-4 max-w-xl text-3xl font-light leading-tight text-white sm:text-5xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "আপনার গল্প — হাতে গড়া ধাতুতে।"
                : "Your story — hand-forged in metal."}
            </h2>
            <p className="font-body-en mt-4 max-w-md text-sm text-white/60">
              {lang === "bn"
                ? "কমিশন, সহযোগিতা ও প্রেস সংক্রান্ত যোগাযোগের জন্য।"
                : "For commissions, collaborations and press."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#f5d98a] via-[#c9a84c] to-[#8c6a1f] px-7 py-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-black shadow-[0_10px_40px_-10px_rgba(201,168,76,0.6)] transition hover:shadow-[0_15px_55px_-10px_rgba(201,168,76,0.85)]"
              >
                <span className="relative z-10">
                  {lang === "bn" ? "কমিশন দিন" : "Commission a piece"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <a
                href="mailto:hello@rubayatraihan.studio"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#e8c98a]"
              >
                hello@rubayatraihan.studio
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <p className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-white/30">
                {lang === "bn" ? "নেভিগেশন" : "Navigate"}
              </p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="font-body-en text-sm text-white/70 transition hover:text-[#e8c98a]"
                    >
                      <span lang={lang} className={lang === "bn" ? "font-body-bn" : ""}>
                        {l.label[lang]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body-en text-[0.6rem] uppercase tracking-[0.4em] text-white/30">
                {lang === "bn" ? "এলসহোয়্যার" : "Elsewhere"}
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={artistProfile?.behance ?? "https://www.behance.net/rubayatraihan"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body-en text-sm text-white/70 transition hover:text-[#e8c98a]"
                  >
                    Behance ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body-en text-sm text-white/70 transition hover:text-[#e8c98a]"
                  >
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body-en text-sm text-white/70 transition hover:text-[#e8c98a]"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sub-bar */}
        <div className="flex flex-col items-center gap-6 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body-en text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
            © {new Date().getFullYear()} Rubayat Raihan ·{" "}
            {artistProfile?.basedIn ?? "Bangladesh"}
          </p>
          {(() => {
            const credit = getSazidCredit(lang);
            return (
              <a
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center gap-1 sm:items-end"
                // Only the active language is exposed to screen readers.
                aria-label={credit.text}
              >
                <span
                  key={credit.lang}
                  lang={credit.lang}
                  data-testid="sazid-credit"
                  className={`bg-gradient-to-r from-[#e8c98a] via-[#f3dcae] to-[#b8893f] bg-clip-text text-transparent font-light text-[0.82rem] sm:text-base transition-all duration-500 ${
                    credit.lang === "bn"
                      ? "font-display-bn tracking-[0.06em] group-hover:tracking-[0.1em]"
                      : "font-display-en tracking-[0.16em] group-hover:tracking-[0.2em]"
                  }`}
                >
                  {credit.text}
                </span>
                <span className="mt-1 h-px w-16 origin-left scale-x-0 bg-gradient-to-r from-[#e8c98a] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            );
          })()}
        </div>
      </div>
    </footer>
  );
}
