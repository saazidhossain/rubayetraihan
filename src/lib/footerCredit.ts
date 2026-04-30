/**
 * Centralised i18n helper for the "A Sazid Hossain Architecture" credit.
 * Both src/components/SiteFooter.tsx and the inline footer on the home
 * route import from here, so the two versions can never drift apart.
 */
import type { Lang } from "@/lib/language";

export const SAZID_CREDIT_HREF = "https://www.behance.net/saazidhossain";

export const SAZID_CREDIT_TEXT: Record<Lang, string> = {
  en: "A SAZID HOSSAIN ARCHITECTURE",
  bn: "একটি সাজিদ হোসেন স্থাপত্য",
};

export function getSazidCredit(lang: Lang) {
  return {
    text: SAZID_CREDIT_TEXT[lang],
    href: SAZID_CREDIT_HREF,
    lang,
  };
}
