import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/lib/language";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rubayat Raihan — Artist & Designer" },
      {
        name: "description",
        content:
          "Bilingual portfolio of Rubayat Raihan — metal art, product design, surface design and installation work from Bangladesh.",
      },
      { name: "author", content: "Rubayat Raihan" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Preconnect to Google Fonts for low-latency first byte.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      // PERFORMANCE: load the entire font set in ONE stylesheet request and
      // explicitly request `display=swap` so text paints immediately with the
      // fallback and swaps in the webfont when ready (no FOIT).
      // Using a single CSS file lets the browser parallelise font downloads
      // and keeps the critical path minimal (one render-blocking stylesheet
      // instead of two).
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Tiro+Bangla:ital@0;1&family=Work+Sans:wght@300;400;500;600&family=Hind+Siliguri:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    // SSR-safe default: "en". The LanguageProvider updates this on the
    // client whenever the bilingual toggle changes (see src/lib/language.tsx)
    // so screen readers and font shaping always match the live UI.
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
