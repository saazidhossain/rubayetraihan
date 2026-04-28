import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "bn";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "rr:lang";

/**
 * Read the persisted language from localStorage on the client only.
 * SSR always returns "en" so the server-rendered HTML stays SEO-stable
 * (the document is indexed as English; the user's preference applies
 * after hydration).
 */
function readPersisted(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    const stored = readPersisted();
    if (stored !== "en") setLangState(stored);
  }, []);

  // Keep <html lang="..."> in sync with the active language so screen
  // readers, browsers and font-shaping pick the right language.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
  }, [lang]);

  // Listen for the legacy custom event from the Hero toggle button so we
  // don't have to rewire the existing UI.
  useEffect(() => {
    const handler = () => setLangState((l) => (l === "en" ? "bn" : "en"));
    window.addEventListener("rr:toggle-lang", handler);
    return () => window.removeEventListener("rr:toggle-lang", handler);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / disabled storage */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "bn" : "en");
  }, [lang, setLang]);

  // Persist whenever lang changes (covers the custom-event path too).
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
