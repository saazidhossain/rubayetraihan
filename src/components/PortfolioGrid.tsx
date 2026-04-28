import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  categories,
  getProjectsByCategory,
  type CategoryId,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";
type Lang = "en" | "bn";

interface Props {
  lang?: Lang;
}

export function PortfolioGrid({ lang = "en" }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => getProjectsByCategory(filter), [filter]);

  const allLabel = lang === "bn" ? "সকল কাজ" : "All Work";

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-24"
    >
      <header className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {lang === "bn" ? "পোর্টফোলিও" : "Portfolio"}
          </p>
          <h2
            id="portfolio-heading"
            lang={lang}
            className={`mt-3 text-3xl font-light tracking-tight text-foreground sm:text-5xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "ধাতু, পণ্য এবং সারফেসের শিল্প"
              : "Selected Works in Metal, Form & Surface"}
          </h2>
        </div>
      </header>

      {/* Filter chips */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={allLabel}
        />
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            active={filter === c.id}
            onClick={() => setFilter(c.id)}
            label={c.label[lang]}
          />
        ))}
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, idx) => (
          <li
            key={project.id}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-500 hover:shadow-2xl"
            style={{
              animation: "fade-in 0.5s ease-out both",
              animationDelay: `${idx * 60}ms`,
            }}
          >
            <Link
              to="/work/$slug"
              params={{ slug: project.slug }}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={project.media.thumbnail ?? project.media.image}
                  alt={project.title[lang]}
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Glass info card */}
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 sm:translate-y-2 sm:opacity-95">
                  <p className="font-body-en text-[10px] uppercase tracking-[0.25em] text-white/70">
                    {categories.find((c) => c.id === project.category)?.label[lang]}
                  </p>
                  <h3
                    lang={lang}
                    className={`mt-1 text-lg font-medium leading-snug text-white ${
                      lang === "bn" ? "font-display-bn" : "font-display-en"
                    }`}
                  >
                    {project.title[lang]}
                  </h3>
                  <p
                    lang={lang}
                    className={cn(
                      "mt-1 line-clamp-2 text-xs text-white/75 transition-all duration-500",
                      "max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100",
                      lang === "bn" ? "font-body-bn" : "font-body-en",
                    )}
                  >
                    {project.description[lang]}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {lang === "bn" ? "কোন কাজ পাওয়া যায়নি।" : "No work in this category yet."}
        </p>
      )}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300",
        active
          ? "border-foreground bg-foreground text-background shadow-md"
          : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
