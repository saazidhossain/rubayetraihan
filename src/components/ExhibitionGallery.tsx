import { useMemo, useState } from "react";
import type { ExhibitionImage } from "@/data/exhibitions";
import { useLanguage } from "@/lib/language";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";

interface ExhibitionGalleryProps {
  images: ExhibitionImage[];
  /** "mosaic" = hero + companions (home). "grid" = uniform columns (detail page). */
  layout?: "mosaic" | "grid";
  className?: string;
}

/**
 * Reusable bilingual gallery with the glass lightbox baked in.
 * Used on the home Exhibitions strip and the /exhibitions/$slug detail page.
 */
export function ExhibitionGallery({
  images,
  layout = "mosaic",
  className = "",
}: ExhibitionGalleryProps) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      images.map((g) => ({
        src: g.src,
        alt: g.alt ?? g.caption.en,
        caption: g.caption,
      })),
    [images],
  );

  if (!images.length) return null;

  const gridClass =
    layout === "mosaic"
      ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      : "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3";

  return (
    <>
      <div className={`${gridClass} ${className}`}>
        {images.map((g, i) => {
          const isHero = layout === "mosaic" && i === 0;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={
                lang === "bn"
                  ? `ছবি ${i + 1} দেখুন`
                  : `View image ${i + 1}`
              }
              className={`group relative isolate overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/5 transition-all duration-500 hover:border-[#c9a84c]/50 hover:shadow-[0_30px_90px_-30px_rgba(201,168,76,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c98a] ${
                isHero
                  ? "col-span-2 row-span-2 aspect-[4/5]"
                  : layout === "mosaic"
                    ? "aspect-[3/4]"
                    : "aspect-[4/5]"
              }`}
            >
              {/* Inner frame — evokes the gallery's wood liner */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[6px] z-10 rounded-lg ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-[#c9a84c]/30"
              />

              <img
                src={g.src}
                alt={g.alt ?? g.caption[lang]}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
              />

              {/* Ambient gold wash on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.25),_transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-soft-light"
              />

              {/* Readability gradient + caption */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90"
              />

              <span className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3">
                <span
                  lang={lang}
                  className={`max-w-[75%] text-left text-[0.72rem] leading-snug text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:text-sm ${
                    lang === "bn" ? "font-body-bn" : "font-body-en"
                  }`}
                >
                  {g.caption[lang]}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/40 bg-black/40 text-[0.7rem] text-[#e8c98a] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/15">
                  ↗
                </span>
              </span>

              {/* Corner index chip */}
              <span className="font-body-en pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.3em] text-[#e8c98a] backdrop-blur-md">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
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
    </>
  );
}
