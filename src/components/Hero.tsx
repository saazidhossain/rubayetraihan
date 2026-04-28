import { useEffect, useRef } from "react";
import { BrandLogo } from "./BrandLogo";
import heroImage from "@/assets/hero-craftsmanship.jpg";

type Lang = "en" | "bn";

interface HeroProps {
  lang: Lang;
}

const COPY = {
  eyebrow: { en: "Artist · Designer · Maker", bn: "শিল্পী · ডিজাইনার · নির্মাতা" },
  headlineLineA: { en: "Artistry in Metal,", bn: "ধাতুতে শিল্প," },
  headlineLineB: { en: "Design in Form.", bn: "আকারে ডিজাইন।" },
  subhead: {
    en: "Hand-forged metal relief, lighting, surface and fashion — work that bridges the centuries-old craft of Bengal with a contemporary design language.",
    bn: "হাতে গড়া ধাতব রিলিফ, আলো, সারফেস ও ফ্যাশন — বাংলার শতাব্দীপ্রাচীন কারুশিল্পকে সমকালীন ডিজাইন ভাষায় রূপান্তরের প্রয়াস।",
  },
  cta1: { en: "Explore the Portfolio", bn: "পোর্টফোলিও দেখুন" },
  cta2: { en: "Commission a Piece", bn: "কমিশন দিন" },
  scroll: { en: "Scroll", bn: "নিচে যান" },
  marquee: {
    en: ["Metal Art", "Product Design", "Surface Design", "Fashion", "Installation"],
    bn: ["ধাতুশিল্প", "প্রোডাক্ট ডিজাইন", "সারফেস ডিজাইন", "ফ্যাশন", "ইনস্টলেশন"],
  },
};

export function Hero({ lang }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  // Vanilla JS parallax + cursor-tracked spotlight
  useEffect(() => {
    const node = parallaxRef.current;
    if (!node) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        node.style.setProperty("--py", `${y * 0.18}px`);
      });
    };
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      node.style.setProperty("--mx", `${x}%`);
      node.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    node.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      node.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const otherLang: Lang = lang === "en" ? "bn" : "en";

  return (
    <section
      ref={parallaxRef}
      className="hero relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0a0907] text-white"
      style={
        {
          // CSS variables driven by the JS handlers above
          ["--py" as never]: "0px",
          ["--mx" as never]: "50%",
          ["--my" as never]: "40%",
        } as React.CSSProperties
      }
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ transform: "translate3d(0, var(--py), 0) scale(1.06)" }}
      >
        <img
          src={heroImage}
          alt="Artisan hands hammering glowing copper at the forge"
          className="h-full w-full object-cover opacity-70"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
      </div>

      {/* Cursor-tracked gold spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(201,168,76,0.25), transparent 60%)",
        }}
      />

      {/* Layered gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_85%)]" />

      {/* Decorative gold filigree - top right */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -top-20 -right-20 h-[28rem] w-[28rem] opacity-20 mix-blend-screen"
      >
        <defs>
          <linearGradient id="hero-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5d98a" />
            <stop offset="100%" stopColor="#8c6a1f" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke="url(#hero-gold)"
          strokeWidth="0.6"
          className="hero-filigree"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <circle
              key={i}
              cx="200"
              cy="200"
              r={20 + i * 10}
              strokeDasharray={`${2 + i} ${6 + i}`}
            />
          ))}
        </g>
      </svg>

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#" className="group flex items-center gap-3">
            <BrandLogo className="h-10 w-10 transition-transform duration-700 group-hover:rotate-[20deg]" />
            <span className="leading-tight">
              <span className="font-display-en block text-[0.95rem] tracking-[0.18em] text-white">
                Rubayat Raihan
              </span>
              <span className="font-body-en block text-[0.65rem] uppercase tracking-[0.32em] text-[#c9a84c]">
                Maker · Studio
              </span>
            </span>
          </a>

          <nav className="font-body-en hidden items-center gap-8 text-[0.7rem] uppercase tracking-[0.3em] text-white/70 md:flex">
            <a href="#portfolio" className="transition hover:text-white">Work</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <button
            type="button"
            onClick={() => {
              const ev = new CustomEvent("rr:toggle-lang");
              window.dispatchEvent(ev);
            }}
            className="group flex items-center gap-2 rounded-full border border-[#c9a84c]/40 bg-white/5 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/15"
            aria-label="Toggle language"
          >
            <span className="opacity-50">{lang === "en" ? "EN" : "বাং"}</span>
            <span className="text-[#c9a84c]">/</span>
            <span>{otherLang === "en" ? "EN" : "বাং"}</span>
          </button>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 sm:pb-32">
        {/* Eyebrow with gold rule */}
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9a84c] to-[#c9a84c]" />
          <p
            lang={lang}
            className={`text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a] ${
              lang === "bn" ? "font-body-bn" : "font-body-en"
            }`}
          >
            {COPY.eyebrow[lang]}
          </p>
        </div>

        {/* Headline — large serif, bilingual layered */}
        <h1
          lang={lang}
          className={`hero-headline max-w-5xl ${
            lang === "bn" ? "font-display-bn" : "font-display-en"
          }`}
        >
          <span className="block text-5xl font-light text-white sm:text-7xl lg:text-[5.5rem]">
            <span className="hero-line inline-block">{COPY.headlineLineA[lang]}</span>
          </span>
          <span
            className="block text-5xl font-light italic sm:text-7xl lg:text-[5.5rem]"
            style={{
              background:
                "linear-gradient(180deg, #f5d98a 0%, #c9a84c 55%, #8c6a1f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <span className="hero-line hero-line-2 inline-block">
              {COPY.headlineLineB[lang]}
            </span>
          </span>
        </h1>

        {/* Echo of the headline in the other script — subtle, decorative */}
        <p
          aria-hidden
          lang={otherLang}
          className={`mt-3 text-base font-light tracking-wide text-white/30 sm:text-lg ${
            otherLang === "bn" ? "font-display-bn font-echo-bn" : "font-display-en font-echo-en"
          }`}
        >
          {COPY.headlineLineA[otherLang]} {COPY.headlineLineB[otherLang]}
        </p>

        {/* Subhead */}
        <p
          lang={lang}
          className={`mt-8 max-w-2xl text-base text-white/75 sm:text-lg ${
            lang === "bn" ? "font-body-bn" : "font-body-en"
          }`}
        >
          {COPY.subhead[lang]}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#portfolio"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#f5d98a] via-[#c9a84c] to-[#8c6a1f] px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-black shadow-[0_10px_40px_-10px_rgba(201,168,76,0.6)] transition hover:shadow-[0_15px_50px_-10px_rgba(201,168,76,0.8)]"
          >
            <span className="relative z-10">{COPY.cta1[lang]}</span>
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#e8c98a]"
          >
            {COPY.cta2[lang]}
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
          <span className="hero-scroll-line block h-8 w-px bg-gradient-to-b from-[#c9a84c] to-transparent" />
          {COPY.scroll[lang]}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="hero-marquee flex gap-12 overflow-hidden py-4">
          <div className="hero-marquee-track flex shrink-0 items-center gap-12 whitespace-nowrap">
            {[...COPY.marquee[lang], ...COPY.marquee[lang], ...COPY.marquee[lang]].map(
              (label, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span
                    className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60"
                    style={{
                      fontFamily:
                        lang === "bn"
                          ? "'Hind Siliguri', sans-serif"
                          : "'Work Sans', sans-serif",
                    }}
                  >
                    {label}
                  </span>
                  <span className="text-[#c9a84c]">✦</span>
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
