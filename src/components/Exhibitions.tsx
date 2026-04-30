import { Link } from "@tanstack/react-router";
import { getFeaturedExhibition, statusLabel } from "@/data/exhibitions";
import { useLanguage } from "@/lib/language";
import { ExhibitionGallery } from "./ExhibitionGallery";

/**
 * Home-page Exhibitions strip.
 * Shows the single featured exhibition with a cinematic hero image and
 * a mosaic gallery underneath. Links through to /exhibitions and the
 * dedicated detail page.
 */
export function Exhibitions() {
  const { lang } = useLanguage();
  const exhibition = getFeaturedExhibition();
  if (!exhibition) return null;

  const heroImg = exhibition.gallery[0];
  const rest = exhibition.gallery.slice(1);

  return (
    <section
      id="exhibitions"
      className="relative isolate overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#0a0907] via-[#0c0a07] to-[#0a0907] px-5 py-24 text-white sm:px-6 sm:py-32"
    >
      {/* Ambient gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.14),_transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        {/* Eyebrow */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#c9a84c] to-[#c9a84c]" />
              <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
                {lang === "bn" ? "প্রদর্শনী" : "Exhibitions"}
              </p>
            </div>
            <h2
              lang={lang}
              className={`mt-5 max-w-3xl text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "গ্যালারি ও প্রদর্শনী"
                : "On view in the gallery."}
            </h2>
          </div>
          <Link
            to="/exhibitions"
            className="font-body-en group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.32em] text-white/80 backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#e8c98a]"
          >
            <span>{lang === "bn" ? "সব প্রদর্শনী" : "All exhibitions"}</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Featured card — cinematic hero on the left, metadata on the right */}
        <article className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <Link
            to="/exhibitions/$slug"
            params={{ slug: exhibition.slug }}
            className="group relative isolate block overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/5 transition-all duration-700 hover:border-[#c9a84c]/40 hover:shadow-[0_50px_140px_-40px_rgba(201,168,76,0.4)]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4]">
              <img
                src={heroImg.src}
                alt={heroImg.alt ?? heroImg.caption.en}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]"
              />

              {/* Film-grain style vignette */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.7)_100%)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              />

              {/* Inner frame */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-4 rounded-xl ring-1 ring-inset ring-white/15 transition-colors duration-700 group-hover:ring-[#c9a84c]/40 sm:inset-6"
              />

              {/* Status chip */}
              <span className="font-body-en absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/50 bg-black/50 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-[#e8c98a] backdrop-blur-md sm:left-7 sm:top-7">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9a84c]" />
                {statusLabel(exhibition.status, lang)}
              </span>

              {/* Overlaid title block */}
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
                <p className="font-body-en text-[0.6rem] uppercase tracking-[0.35em] text-[#e8c98a]">
                  {exhibition.dateLabel[lang]}
                </p>
                <h3
                  lang={lang}
                  className={`mt-3 text-2xl font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-3xl lg:text-4xl ${
                    lang === "bn" ? "font-display-bn" : "font-display-en"
                  }`}
                >
                  {exhibition.title[lang]}
                </h3>
                <p
                  lang={lang}
                  className={`mt-2 text-sm text-white/70 ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {exhibition.venue[lang]} · {exhibition.city[lang]}
                </p>
              </div>
            </div>
          </Link>

          {/* Details card */}
          <div className="flex flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 backdrop-blur-md sm:p-9">
            <div>
              {exhibition.subtitle && (
                <p
                  lang={lang}
                  className={`text-sm text-white/55 ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {exhibition.subtitle[lang]}
                </p>
              )}

              <dl className="mt-6 space-y-4 text-sm">
                <Row
                  label={lang === "bn" ? "স্থান" : "Venue"}
                  value={`${exhibition.venue[lang]}, ${exhibition.city[lang]}`}
                />
                <Row
                  label={lang === "bn" ? "তারিখ" : "Dates"}
                  value={exhibition.dateLabel[lang]}
                />
                {exhibition.timeLabel && (
                  <Row
                    label={lang === "bn" ? "সময়" : "Hours"}
                    value={exhibition.timeLabel[lang]}
                  />
                )}
              </dl>

              <p
                lang={lang}
                className={`mt-8 text-sm leading-relaxed text-white/75 ${
                  lang === "bn" ? "font-body-bn" : "font-body-en"
                }`}
              >
                {exhibition.summary[lang]}
              </p>

              {exhibition.curatorNote && (
                <blockquote
                  lang={lang}
                  className={`mt-6 border-l-2 border-[#c9a84c]/60 pl-4 text-sm italic text-white/55 ${
                    lang === "bn" ? "font-display-bn" : "font-display-en"
                  }`}
                >
                  &ldquo;{exhibition.curatorNote[lang]}&rdquo;
                </blockquote>
              )}
            </div>

            <Link
              to="/exhibitions/$slug"
              params={{ slug: exhibition.slug }}
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#f5d98a] via-[#c9a84c] to-[#8c6a1f] px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-black shadow-[0_10px_40px_-10px_rgba(201,168,76,0.6)] transition hover:shadow-[0_15px_55px_-10px_rgba(201,168,76,0.85)]"
            >
              <span>{lang === "bn" ? "বিস্তারিত দেখুন" : "View exhibition"}</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </article>

        {/* Secondary gallery — mosaic of remaining frames */}
        {rest.length > 0 && (
          <div className="mt-10">
            <ExhibitionGallery images={rest} layout="mosaic" />
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-white/10 pb-3 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="font-body-en text-[0.6rem] uppercase tracking-[0.35em] text-white/40 sm:w-24">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white/85 sm:mt-0">{value}</dd>
    </div>
  );
}
