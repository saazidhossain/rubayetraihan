import { useMemo, useState } from "react";
import { exhibitions } from "@/data/exhibitions";
import { useLanguage } from "@/lib/language";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";

export function Exhibitions() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const exhibition = exhibitions[0];

  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      exhibition.gallery.map((g) => ({
        src: g.src,
        caption: g.caption,
      })),
    [exhibition],
  );

  if (!exhibition) return null;

  return (
    <section
      id="exhibitions"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#0a0907] px-6 py-20 text-white sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(201,168,76,0.12),_transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "প্রদর্শনী" : "Exhibitions"}
            </p>
            <h2
              lang={lang}
              className={`mt-4 text-3xl font-light leading-tight text-white sm:text-4xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {exhibition.title[lang]}
            </h2>
            {exhibition.subtitle && (
              <p
                lang={lang}
                className={`mt-3 text-sm text-white/60 ${
                  lang === "bn" ? "font-body-bn" : "font-body-en"
                }`}
              >
                {exhibition.subtitle[lang]}
              </p>
            )}

            <dl className="mt-8 space-y-3 text-sm">
              <Row
                label={lang === "bn" ? "স্থান" : "Venue"}
                value={`${exhibition.venue[lang]}, ${exhibition.city[lang]}`}
              />
              <Row
                label={lang === "bn" ? "তারিখ" : "Dates"}
                value={exhibition.dateLabel[lang]}
              />
              <Row
                label={lang === "bn" ? "সময়" : "Hours"}
                value={exhibition.timeLabel[lang]}
              />
            </dl>

            <p
              lang={lang}
              className={`mt-8 max-w-md text-sm leading-relaxed text-white/70 ${
                lang === "bn" ? "font-body-bn" : "font-body-en"
              }`}
            >
              {exhibition.description[lang]}
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {exhibition.gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-[#c9a84c]/50 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.caption[lang]}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span
                  lang={lang}
                  className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#e8c98a] opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {lang === "bn" ? "দেখুন" : "View"} ↗
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={openIndex}
          lang={lang}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
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
