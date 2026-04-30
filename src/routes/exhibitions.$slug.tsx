import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ExhibitionGallery } from "@/components/ExhibitionGallery";
import {
  exhibitions,
  getExhibitionBySlug,
  statusLabel,
} from "@/data/exhibitions";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/exhibitions/$slug")({
  loader: ({ params }) => {
    const exhibition = getExhibitionBySlug(params.slug);
    if (!exhibition) throw notFound();
    return { exhibition };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.exhibition;
    if (!e) return { meta: [{ title: "Exhibition not found" }] };
    const title = `${e.title.en} — ${e.venue.en}`;
    const description = e.summary.en;
    const image = e.gallery[0]?.src;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0907] text-white">
      <div className="text-center">
        <p className="font-display-en text-3xl">Exhibition not found</p>
        <Link
          to="/exhibitions"
          className="mt-6 inline-block rounded-full border border-[#c9a84c]/40 px-6 py-2 text-xs uppercase tracking-[0.3em] text-[#e8c98a] hover:bg-[#c9a84c]/10"
        >
          ← All exhibitions
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0907] p-6 text-white">
      <div className="max-w-md text-center">
        <p className="font-display-en text-2xl">Something went wrong</p>
        <p className="mt-2 text-sm text-white/60">{error.message}</p>
        <Link
          to="/exhibitions"
          className="mt-6 inline-block rounded-full border border-[#c9a84c]/40 px-6 py-2 text-xs uppercase tracking-[0.3em] text-[#e8c98a] hover:bg-[#c9a84c]/10"
        >
          ← All exhibitions
        </Link>
      </div>
    </div>
  ),
  component: ExhibitionDetail,
});

function ExhibitionDetail() {
  const { exhibition: e } = Route.useLoaderData();
  const { lang } = useLanguage();

  // Sibling navigation (prev / next within the ordered list)
  const idx = exhibitions.findIndex((x) => x.slug === e.slug);
  const prev = idx > 0 ? exhibitions[idx - 1] : null;
  const next = idx >= 0 && idx < exhibitions.length - 1 ? exhibitions[idx + 1] : null;

  const hero = e.gallery[0];
  const paragraphs = e.description[lang].split(/\n\n+/);

  return (
    <div className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav transparentOnTop />

      {/* Cinematic hero */}
      <header className="relative isolate flex min-h-[85svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={hero.src}
            alt={hero.alt ?? hero.caption.en}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-[#0a0907]/70 to-[#0a0907]/30"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.7)_100%)]"
          />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-6 sm:pb-20 sm:pt-48">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/exhibitions"
              className="font-body-en inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-white/60 transition hover:text-[#e8c98a]"
            >
              ← {lang === "bn" ? "সব প্রদর্শনী" : "All exhibitions"}
            </Link>
            <span className="font-body-en inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/50 bg-black/40 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-[#e8c98a] backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9a84c]" />
              {statusLabel(e.status, lang)}
            </span>
          </div>

          <h1
            lang={lang}
            className={`mt-8 max-w-5xl text-5xl font-light leading-[1.02] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)] sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {e.title[lang]}
          </h1>
          {e.subtitle && (
            <p
              lang={lang}
              className={`mt-5 max-w-3xl text-base text-white/75 sm:text-lg ${
                lang === "bn" ? "font-body-bn" : "font-body-en"
              }`}
            >
              {e.subtitle[lang]}
            </p>
          )}
        </div>
      </header>

      {/* Meta strip */}
      <section className="border-y border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-5 py-8 sm:grid-cols-4 sm:divide-x sm:px-6">
          <Meta
            label={lang === "bn" ? "স্থান" : "Venue"}
            value={e.venue[lang]}
          />
          <Meta
            label={lang === "bn" ? "শহর" : "City"}
            value={`${e.city[lang]}, ${e.country[lang]}`}
          />
          <Meta
            label={lang === "bn" ? "তারিখ" : "Dates"}
            value={e.dateLabel[lang]}
          />
          {e.timeLabel && (
            <Meta
              label={lang === "bn" ? "সময়" : "Hours"}
              value={e.timeLabel[lang]}
            />
          )}
        </div>
      </section>

      {/* Description + curator note */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "নোট" : "About"}
            </p>
            {e.curatorNote && (
              <blockquote
                lang={lang}
                className={`mt-6 border-l-2 border-[#c9a84c]/60 pl-5 text-xl font-light italic leading-snug text-white/75 ${
                  lang === "bn" ? "font-display-bn" : "font-display-en"
                }`}
              >
                &ldquo;{e.curatorNote[lang]}&rdquo;
              </blockquote>
            )}
          </div>
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                lang={lang}
                className={`text-lg leading-relaxed text-white/85 ${
                  lang === "bn" ? "font-body-bn" : "font-body-en"
                }`}
              >
                {p}
              </p>
            ))}
            {e.externalUrl && (
              <a
                href={e.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-en inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/40 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.3em] text-[#e8c98a] hover:bg-[#c9a84c]/10"
              >
                {lang === "bn" ? "প্রেস ও তথ্য" : "Press & info"} ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Full gallery */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#0a0907] via-[#0c0a07] to-[#0a0907] px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#c9a84c] to-[#c9a84c]" />
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "গ্যালারি" : "Gallery"}
            </p>
          </div>
          <ExhibitionGallery images={e.gallery} layout="grid" />
        </div>
      </section>

      {/* Prev / Next */}
      {(prev || next) && (
        <section className="border-t border-white/10 px-5 py-14 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2">
            {prev ? (
              <Link
                to="/exhibitions/$slug"
                params={{ slug: prev.slug }}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#c9a84c]/40 hover:bg-white/[0.06]"
              >
                <p className="font-body-en text-[0.6rem] uppercase tracking-[0.35em] text-white/40">
                  ← {lang === "bn" ? "পূর্ববর্তী" : "Previous"}
                </p>
                <p
                  lang={lang}
                  className={`mt-2 text-lg text-white/90 ${
                    lang === "bn" ? "font-display-bn" : "font-display-en"
                  }`}
                >
                  {prev.title[lang]}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to="/exhibitions/$slug"
                params={{ slug: next.slug }}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 text-right transition hover:border-[#c9a84c]/40 hover:bg-white/[0.06]"
              >
                <p className="font-body-en text-[0.6rem] uppercase tracking-[0.35em] text-white/40">
                  {lang === "bn" ? "পরবর্তী" : "Next"} →
                </p>
                <p
                  lang={lang}
                  className={`mt-2 text-lg text-white/90 ${
                    lang === "bn" ? "font-display-bn" : "font-display-en"
                  }`}
                >
                  {next.title[lang]}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-0 py-2 sm:px-6">
      <p className="font-body-en text-[0.55rem] uppercase tracking-[0.35em] text-white/40">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-white/90">{value}</p>
    </div>
  );
}
