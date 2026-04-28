import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rubayat Raihan — Artistry in Metal, Design in Form" },
      {
        name: "description",
        content:
          "Portfolio of Rubayat Raihan — metal art, product design, surface design, fashion design and installation work. Available for commissions worldwide.",
      },
      { property: "og:title", content: "Rubayat Raihan — Artistry in Metal, Design in Form" },
      {
        property: "og:description",
        content:
          "Hand-crafted metal relief, lighting, surface and fashion design from Bangladesh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  // Hero dispatches a custom event from its built-in language toggle
  useEffect(() => {
    const handler = () => setLang((l) => (l === "en" ? "bn" : "en"));
    window.addEventListener("rr:toggle-lang", handler);
    return () => window.removeEventListener("rr:toggle-lang", handler);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0907] text-white">
      <Hero lang={lang} />

      {/* Portfolio grid */}
      <PortfolioGrid lang={lang} />

      {/* Simple footer placeholder */}
      <footer
        id="contact"
        className="border-t border-border bg-background px-4 py-12 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        © {new Date().getFullYear()} Rubayat Raihan
      </footer>
    </main>
  );
}
