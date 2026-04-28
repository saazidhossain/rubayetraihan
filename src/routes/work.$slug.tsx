import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  categoryLabel,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/portfolio";
import { useLanguage } from "@/lib/language";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found" }] };
    const title = `${p.title.en} — Rubayat Raihan`;
    const description = p.description.en;
    const image = p.media.image;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0907] text-white">
      <div className="text-center">
        <p className="font-display-en text-3xl">Project not found</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full border border-[#c9a84c]/40 px-6 py-2 text-xs uppercase tracking-[0.3em] text-[#e8c98a] hover:bg-[#c9a84c]/10"
        >
          Back to portfolio
        </Link>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const { lang, toggle } = useLanguage();
  const otherLang: "en" | "bn" = lang === "en" ? "bn" : "en";

  const allImages = useMemo(
    () => [project.media.image, ...(project.media.gallery ?? [])],
    [project],
  );

  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      allImages.map((src, i) => ({
        src,
        alt: `${project.title.en} — view ${i + 1}`,
        caption: {
          en: `${project.title.en} · ${categoryLabel(project.category, "en")}`,
          bn: `${project.title.bn} · ${categoryLabel(project.category, "bn")}`,
        },
      })),
    [allImages, project],
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const related = getRelatedProjects(project, 3);

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="group flex items-center gap-3">
            <BrandLogo className="h-9 w-9" />
            <span className="font-display-en text-[0.95rem] tracking-[0.18em] text-white">
              Rubayat Raihan
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="font-body-en hidden text-[0.65rem] uppercase tracking-[0.3em] text-white/70 hover:text-white sm:inline"
            >
              ← Portfolio
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="font-body-en flex items-center gap-2 rounded-full border border-[#c9a84c]/40 bg-white/5 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/15"
              aria-label="Toggle language"
            >
              <span className="opacity-50">{lang === "en" ? "EN" : "বাং"}</span>
              <span className="text-[#c9a84c]">/</span>
              <span>{otherLang === "en" ? "EN" : "বাং"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden">
        <img
          src={project.media.image}
          alt={project.title[lang]}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/20" />

        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:pb-24">
          <p
            lang={lang}
            className={`text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a] ${
              lang === "bn" ? "font-body-bn" : "font-body-en"
            }`}
          >
            {categoryLabel(project.category, lang)}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h1
            lang={lang}
            className={`mt-4 max-w-4xl text-4xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {project.title[lang]}
          </h1>
          <p
            aria-hidden
            lang={otherLang}
            className={`mt-2 text-base text-white/40 sm:text-lg ${
              otherLang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {project.title[otherLang]}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr] lg:py-24">
        <div>
          <p
            lang={lang}
            className={`text-lg leading-relaxed text-white/85 sm:text-xl ${
              lang === "bn" ? "font-body-bn" : "font-body-en"
            }`}
          >
            {project.description[lang]}
          </p>

          {/* Gallery */}
          {allImages.length > 1 && (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5">
              {allImages.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setOpenIndex(i)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  aria-label={`Open image ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${project.title.en} — view ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    Open
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Side specs */}
        <aside className="space-y-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <SpecRow
              label={lang === "bn" ? "শ্রেণি" : "Category"}
              value={categoryLabel(project.category, lang)}
              lang={lang}
            />
            {project.year && (
              <SpecRow
                label={lang === "bn" ? "বছর" : "Year"}
                value={String(project.year)}
                lang={lang}
              />
            )}
            {project.dimensions && (
              <SpecRow
                label={lang === "bn" ? "মাপ" : "Dimensions"}
                value={project.dimensions}
                lang={lang}
              />
            )}
            {project.materials && (
              <SpecRow
                label={lang === "bn" ? "উপাদান" : "Materials"}
                value={project.materials[lang]}
                lang={lang}
              />
            )}
            {project.techniques && (
              <SpecRow
                label={lang === "bn" ? "কৌশল" : "Techniques"}
                value={project.techniques[lang]}
                lang={lang}
              />
            )}
            {project.commercialIntent && (
              <SpecRow
                label={lang === "bn" ? "প্রাপ্যতা" : "Availability"}
                value={project.commercialIntent}
                lang={lang}
              />
            )}
          </div>

          <a
            href="mailto:hello@rubayatraihan.studio?subject=Commission%20enquiry"
            className="block rounded-2xl border border-[#c9a84c]/40 bg-gradient-to-br from-[#c9a84c]/15 to-transparent p-6 backdrop-blur-md transition hover:border-[#c9a84c]"
          >
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.3em] text-[#e8c98a]">
              {lang === "bn" ? "কমিশন" : "Commission"}
            </p>
            <p
              lang={lang}
              className={`mt-3 text-lg leading-snug text-white ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn"
                ? "এই কাজটির অনুরূপ একটি কমিশন করতে চান?"
                : "Want a piece in the spirit of this one?"}
            </p>
            <p className="font-body-en mt-2 text-xs text-white/60">
              hello@rubayatraihan.studio →
            </p>
          </a>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/10 bg-black/40 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2
              lang={lang}
              className={`mb-8 text-2xl font-light text-white sm:text-3xl ${
                lang === "bn" ? "font-display-bn" : "font-display-en"
              }`}
            >
              {lang === "bn" ? "সম্পর্কিত কাজ" : "Related work"}
            </h2>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="group block overflow-hidden rounded-2xl border border-white/10"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={p.media.image}
                        alt={p.title[lang]}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                        <p
                          lang={lang}
                          className={`text-sm text-white ${
                            lang === "bn" ? "font-display-bn" : "font-display-en"
                          }`}
                        >
                          {p.title[lang]}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Lightbox
        images={lightboxImages}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        lang={lang}
      />
    </main>
  );
}

function SpecRow({
  label,
  value,
  lang,
}: {
  label: string;
  value: string;
  lang: "en" | "bn";
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 py-3 last:border-0">
      <span className="font-body-en shrink-0 text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <span
        lang={lang}
        className={`text-right text-sm text-white/90 ${
          lang === "bn" ? "font-body-bn" : "font-body-en"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
