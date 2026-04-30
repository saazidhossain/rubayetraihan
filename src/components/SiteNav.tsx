import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { useLanguage } from "@/lib/language";

interface NavItem {
  to:
    | "/"
    | "/work"
    | "/products"
    | "/exhibitions"
    | "/about"
    | "/contact"
    | "/insights";
  label: { en: string; bn: string };
}

const NAV: NavItem[] = [
  { to: "/", label: { en: "Home", bn: "হোম" } },
  { to: "/work", label: { en: "Work", bn: "কাজ" } },
  { to: "/exhibitions", label: { en: "Exhibitions", bn: "প্রদর্শনী" } },
  { to: "/products", label: { en: "Products", bn: "পণ্য" } },
  { to: "/about", label: { en: "About", bn: "আমার সম্পর্কে" } },
  { to: "/insights", label: { en: "Insights", bn: "অন্তর্দৃষ্টি" } },
  { to: "/contact", label: { en: "Contact", bn: "যোগাযোগ" } },
];

interface SiteNavProps {
  /** When true, the nav stays transparent until the user scrolls (used on hero pages). */
  transparentOnTop?: boolean;
}

/**
 * Top-level site navigation.
 * Glass-themed, bilingual, sticky with scroll-aware backdrop.
 */
export function SiteNav({ transparentOnTop = false }: SiteNavProps) {
  const { lang, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  const otherLang = lang === "en" ? "EN" : "বাং";
  const currentLang = lang === "en" ? "EN" : "বাং";

  const wrapperClass = `fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
    scrolled
      ? "border-b border-white/10 bg-[#0a0907]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0907]/55"
      : "bg-transparent"
  }`;

  return (
    <header className={wrapperClass}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <BrandLogo className="h-9 w-9 transition-transform duration-700 group-hover:rotate-[18deg] sm:h-10 sm:w-10" />
          <span className="leading-tight">
            <span className="font-display-en block text-[0.85rem] tracking-[0.18em] text-white sm:text-[0.95rem]">
              Rubayat Raihan
            </span>
            <span className="font-body-en hidden text-[0.6rem] uppercase tracking-[0.32em] text-[#c9a84c] sm:block">
              Maker · Studio
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="font-body-en hidden items-center gap-7 text-[0.7rem] uppercase tracking-[0.28em] text-white/70 lg:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{
                className: "text-[#e8c98a]",
              }}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative transition-colors hover:text-white"
            >
              <span lang={lang} className={lang === "bn" ? "font-body-bn" : ""}>
                {item.label[lang]}
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#e8c98a] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="font-body-en flex items-center gap-1.5 rounded-full border border-[#c9a84c]/40 bg-white/5 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.28em] text-white backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 sm:px-4"
            aria-label={`Switch language to ${otherLang}`}
          >
            <span className="opacity-50">{currentLang}</span>
            <span className="text-[#c9a84c]">/</span>
            <span>{otherLang}</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`}
            />
            <span
              className={`absolute h-px w-4 bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-down sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/10 bg-[#0a0907]/85 backdrop-blur-2xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-6">
          <ul className="flex flex-col divide-y divide-white/5">
            {NAV.map((item, idx) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeProps={{ className: "text-[#e8c98a]" }}
                  activeOptions={{ exact: item.to === "/" }}
                  className="group flex items-center justify-between py-4 text-white transition-colors hover:text-[#e8c98a]"
                >
                  <span
                    lang={lang}
                    className={`text-2xl font-light ${lang === "bn" ? "font-display-bn" : "font-display-en"}`}
                  >
                    {item.label[lang]}
                  </span>
                  <span className="font-body-en text-[0.6rem] tracking-[0.3em] text-white/30 transition-all group-hover:translate-x-1 group-hover:text-[#e8c98a]">
                    0{idx + 1} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
