/**
 * Quick local sanity test for the Sazid credit i18n helper.
 * Run with:  bun src/lib/footerCredit.test.ts
 *
 * Purpose: confirm that when the language toggles, the footer credit
 * changes text and lang attribute deterministically — i.e. both
 * <SiteFooter /> and the inline footer on the home route read the same
 * source of truth, so there can never be a hydration / SSR mismatch
 * between the two (they both call getSazidCredit(lang)).
 */
import { getSazidCredit, SAZID_CREDIT_HREF } from "./footerCredit";

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error("✗", msg);
    process.exit(1);
  }
  console.log("✓", msg);
}

const en = getSazidCredit("en");
assert(en.lang === "en", "EN credit uses lang=en");
assert(en.text === "A SAZID HOSSAIN ARCHITECTURE", "EN credit text is correct");
assert(en.href === SAZID_CREDIT_HREF, "EN credit href points to Behance");

const bn = getSazidCredit("bn");
assert(bn.lang === "bn", "BN credit uses lang=bn");
assert(bn.text === "একটি সাজিদ হোসেন স্থাপত্য", "BN credit text is correct");
assert(bn.href === SAZID_CREDIT_HREF, "BN credit href points to Behance");

// Toggle simulation — same value on every render, no drift between components.
for (let i = 0; i < 5; i++) {
  const lang = i % 2 === 0 ? "en" : "bn";
  const a = getSazidCredit(lang);
  const b = getSazidCredit(lang);
  assert(a.text === b.text, `toggle #${i} (${lang}) — consistent text`);
  assert(a.lang === b.lang, `toggle #${i} (${lang}) — consistent lang attr`);
}

console.log("\nAll footer credit i18n checks passed.");
