import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { exhibitions, statusLabel, type ExhibitionStatus } from "@/data/exhibitions";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/exhibitions/")({
  head: () => ({
    meta: [
      { title: "Exhibitions — Rubayat Raihan" },
      {
        name: "description",
        content:
          "Current, upcoming and archived exhibitions featuring the metalwork and design practice of Rubayat Raihan.",
      },
      { property: "og:title", content: "Exhibitions — Rubayat Raihan" },
      {
        property: "og:description",
        content:
          "Current, upcoming and archived exhibitions featuring the metalwork of Rubayat Raihan.",
      },
    ],
  }),
  component: ExhibitionsIndex,
});

const ORDER: ExhibitionStatus[] = ["current", "upcoming", "past"];

function ExhibitionsIndex() {
  const { lang } = useLanguage();

  const grouped = ORDER.map((status) => ({
    status,
    items: exhibitions.filter((e) => e.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-[#0a0907] text-white">
      <SiteNav transparentOnTop />

      {/* Hero */}
      <header className="relative isolate overflow-hidden px-5 pb-20 pt-36 sm:px-6 sm:pb-28 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.16),_transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent"
        />
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#c9a84c] to-[#c9a84c]" />
            <p className="font-body-en text-[0.65rem] uppercase tracking-[0.45em] text-[#e8c98a]">
              {lang === "bn" ? "প্রদর্শনী" : "Exhibitions"}
            </p>
          </div>
          <h1
            lang={lang}
            className={`mt-6 max-w-4xl text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-7xl ${
              lang === "bn" ? "font-display-bn" : "font-display-en"
            }`}
          >
            {lang === "bn"
              ? "গ্যালারির দেয়ালে — ধাতুর নীরব কথোপকথন।"
              : "In the gallery — metal in quiet conversation."}
          </h1>
          <p
            lang={lang}
            className={`mt-8 max-w-2xl text-base text-white/70 sm:text-lg ${
              lang === "bn" ? "font-body-bn" : "font-body-en"
            }`}
          >
            {lang === "bn"
              ? "প্রতিটি প্রদর্শনী একটি অধ্যয়ন — কিভাবে হাতে গড়া বস্তু একটি কক্ষের পরিবেশ, আলো এবং সম্প্রদায়ের সাথে বসবাস করে।"
              : "Each exhibition is a study in how hand-made objects inhabit a room — its light, its air, and the community that gathers within."}
          </p>
        </div>
      </header>

      {/* Status-grouped listing */}
      <main className="mx-auto max-w-7xl px-5 pb-28 sm:px-6">
        {grouped.map(({ status, items }) => (
          <section key={status} className="mb-20 last:mb-0">
            <div className="mb-8 flex items-baseline justify-between border-b border-white/10 pb-4">
              <h2 className="font-body-en text-[0.7rem] uppercase tracking-[0.45em] text-[#e8c98a]">
                {statusLabel(status, lang)}
              </h2>
              <span className="font-body-en text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.map((e) => {
                const hero = e.gallery[0];
                return (
                  <Link
                    key={e.id}
                    to="/exhibitions/$slug"
                    params={{ slug: e.slug }}
                    className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent ring-1 ring-inset ring-white/5 transition-all duration-700 hover:-translate-y-1 hover:border-[#c9a84c]/40 hover:shadow-[0_40px_100px_-30px_rgba(201,168,76,0.4)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={hero.src}
                        alt={hero.alt ?? hero.caption.en}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.08]"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-inset ring-white/10 transition-colors duration-700 group-hover:ring-[#c9a84c]/40"
                      />
                      <span className="font-body-en absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#c9a84c]/40 bg-black/50 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.3em] text-[#e8c98a] backdrop-blur-md">
                        <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
                        {statusLabel(e.status, lang)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                      <p className="font-body-en text-[0.6rem] uppercase tracking-[0.35em] text-[#e8c98a]">
                        {e.dateLabel[lang]}
                      </p>
                      <h3
                        lang={lang}
                        className={`text-xl font-light leading-snug text-white sm:text-2xl ${
                          lang === "bn" ? "font-display-bn" : "font-display-en"
                        }`}
                      >
                        {e.title[lang]}
                      </h3>
                      <p
                        lang={lang}
                        className={`text-xs text-white/55 ${
                          lang === "bn" ? "font-body-bn" : "font-body-en"
                        }`}
                      >
                        {e.venue[lang]} · {e.city[lang]}
                      </p>
                      <p
                        lang={lang}
                        className={`mt-1 line-clamp-3 text-sm text-white/70 ${
                          lang === "bn" ? "font-body-bn" : "font-body-en"
                        }`}
                      >
                        {e.summary[lang]}
                      </p>
                      <span className="font-body-en mt-4 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-[#e8c98a]">
                        {lang === "bn" ? "বিস্তারিত" : "Read more"}
                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
