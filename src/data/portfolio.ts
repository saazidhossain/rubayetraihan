/**
 * Rubayat Raihan — Portfolio Asset Library
 * --------------------------------------------------
 * Sourced from the artist's Google Drive (Apr 2026 import).
 * Bilingual (en + bn) for the language toggle.
 *
 * Categories:
 *  - Metal Art        (Brass relief work)
 *  - Product Design   (Lampshades, Wall Clocks)
 *  - Surface Design   (Tie-dye, Surface)
 *  - Installation Art (Experimental, Installation)
 */

// Metal relief
import metalRelief1 from "@/assets/portfolio/real/metal-relief-1.jpg";
import metalRelief2 from "@/assets/portfolio/real/metal-relief-2.jpg";
import metalRelief3 from "@/assets/portfolio/real/metal-relief-3.jpg";
import metalRelief4 from "@/assets/portfolio/real/metal-relief-4.jpg";
import metalRelief4a from "@/assets/portfolio/real/metal-relief-4a.jpg";
import metalRelief5 from "@/assets/portfolio/real/metal-relief-5.jpg";

// Product
import lampshade1 from "@/assets/portfolio/real/lampshade-1.jpg";
import lampshade1a from "@/assets/portfolio/real/lampshade-1a.jpg";
import lampshade1b from "@/assets/portfolio/real/lampshade-1b.jpg";
import lampshade2 from "@/assets/portfolio/real/lampshade-2.jpg";
import wallclock1 from "@/assets/portfolio/real/wallclock-1.jpg";

// Surface
import surface1 from "@/assets/portfolio/real/surface-1.jpg";
import surface2 from "@/assets/portfolio/real/surface-2.jpg";
import surface3 from "@/assets/portfolio/real/surface-3.jpg";
import tiedye1 from "@/assets/portfolio/real/tiedye-1.jpg";
import tiedye2 from "@/assets/portfolio/real/tiedye-2.jpg";

// Installation / Experimental
import installation1 from "@/assets/portfolio/real/installation-1.jpg";
import installation2 from "@/assets/portfolio/real/installation-2.jpg";
import experimental1 from "@/assets/portfolio/real/experimental-1.jpg";

export type CategoryId =
  | "metal_art"
  | "product_design"
  | "surface_design"
  | "fashion_design"
  | "installation_art";

export interface Bilingual {
  en: string;
  bn: string;
}

export interface ProjectMedia {
  image: string;
  gallery?: string[];
  videos?: string[];
  thumbnail?: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  category: CategoryId;
  title: Bilingual;
  description: Bilingual;
  concept?: Bilingual;
  materials?: Bilingual;
  techniques?: Bilingual;
  dimensions?: string;
  year?: number;
  featured?: boolean;
  commercialIntent?: string;
  media: ProjectMedia;
}

export interface Category {
  id: CategoryId;
  label: Bilingual;
}

export const categories: Category[] = [
  { id: "metal_art",        label: { en: "Metal Art",        bn: "ধাতব শিল্প" } },
  { id: "product_design",   label: { en: "Product Design",   bn: "পণ্য ডিজাইন" } },
  { id: "surface_design",   label: { en: "Surface Design",   bn: "সারফেস ডিজাইন" } },
  { id: "fashion_design",   label: { en: "Fashion Design",   bn: "ফ্যাশন ডিজাইন" } },
  { id: "installation_art", label: { en: "Installation Art", bn: "ইনস্টলেশন আর্ট" } },
];

export const projects: PortfolioProject[] = [
  // ========== METAL RELIEF ON BRASS ==========
  {
    id: "p-mr-01",
    slug: "brass-relief-i",
    category: "metal_art",
    featured: true,
    year: 2024,
    title: { en: "Brass Relief — Study I", bn: "ব্রাস রিলিফ — অধ্যয়ন ১" },
    description: {
      en: "Hand-hammered relief work on brass sheet — a foundational study in repoussé and chasing inspired by the folk motifs of Bengal.",
      bn: "ব্রাস শীটে হাতে-হাতুড়িকৃত রিলিফ — বাংলার লোকজ মোটিফে অনুপ্রাণিত রিপুসে ও চেজিং-এর মৌলিক অনুশীলন।",
    },
    materials: { en: "Brass sheet", bn: "ব্রাস শীট" },
    techniques: { en: "Repoussé, chasing", bn: "রিপুসে, চেজিং" },
    commercialIntent: "Collector / commission",
    media: { image: metalRelief1 },
  },
  {
    id: "p-mr-02",
    slug: "brass-relief-ii",
    category: "metal_art",
    featured: true,
    year: 2024,
    title: { en: "Brass Relief — Study II", bn: "ব্রাস রিলিফ — অধ্যয়ন ২" },
    description: {
      en: "A second relief composition exploring layered depth and the warm patina that emerges from the working of raw brass.",
      bn: "একটি দ্বিতীয় রিলিফ কম্পোজিশন — স্তরে স্তরে গভীরতা এবং কাঁচা ব্রাসের কাজ থেকে আবির্ভূত উষ্ণ প্যাটিনার অন্বেষণ।",
    },
    materials: { en: "Brass sheet, hand-applied patina", bn: "ব্রাস শীট, হাতে প্রয়োগকৃত প্যাটিনা" },
    media: { image: metalRelief2 },
  },
  {
    id: "p-mr-03",
    slug: "brass-relief-iii",
    category: "metal_art",
    year: 2024,
    title: { en: "Brass Relief — Study III", bn: "ব্রাস রিলিফ — অধ্যয়ন ৩" },
    description: {
      en: "A larger format brass panel pushing the figure further into three dimensions through deep repoussé.",
      bn: "গভীর রিপুসের মাধ্যমে চিত্রকে ত্রিমাত্রিকতায় আরও এগিয়ে নেওয়া একটি বৃহৎ ফরম্যাট ব্রাস প্যানেল।",
    },
    materials: { en: "Brass sheet", bn: "ব্রাস শীট" },
    media: { image: metalRelief3 },
  },
  {
    id: "p-mr-04",
    slug: "brass-relief-iv",
    category: "metal_art",
    year: 2024,
    title: { en: "Brass Relief — Study IV", bn: "ব্রাস রিলিফ — অধ্যয়ন ৪" },
    description: {
      en: "An intimate panel focused on surface texture and the dialogue between polished and oxidised brass.",
      bn: "সারফেস টেক্সচার এবং পালিশ ও অক্সিডাইজড ব্রাসের সংলাপের উপর কেন্দ্রীভূত একটি ঘনিষ্ঠ প্যানেল।",
    },
    materials: { en: "Brass sheet", bn: "ব্রাস শীট" },
    media: { image: metalRelief4, gallery: [metalRelief4a] },
  },
  {
    id: "p-mr-05",
    slug: "brass-relief-v",
    category: "metal_art",
    featured: true,
    year: 2025,
    title: { en: "Brass Relief — Study V", bn: "ব্রাস রিলিফ — অধ্যয়ন ৫" },
    description: {
      en: "The most recent piece in the series — a confident, large-scale brass relief intended for architectural display.",
      bn: "সিরিজের সাম্প্রতিকতম কাজ — স্থাপত্য প্রদর্শনের জন্য একটি আত্মবিশ্বাসী, বৃহৎ-পরিসরের ব্রাস রিলিফ।",
    },
    materials: { en: "Brass sheet", bn: "ব্রাস শীট" },
    commercialIntent: "Architectural commission",
    media: { image: metalRelief5 },
  },

  // ========== PRODUCT DESIGN ==========
  {
    id: "p-pd-01",
    slug: "lampshade-i",
    category: "product_design",
    featured: true,
    year: 2025,
    title: { en: "Lampshade — Sculptural Pendant I", bn: "ল্যাম্পশেড — ভাস্কর্যিক পেন্ডেন্ট ১" },
    description: {
      en: "A sculptural pendant lampshade — light, shadow and material studied as a single living object.",
      bn: "একটি ভাস্কর্যিক পেন্ডেন্ট ল্যাম্পশেড — আলো, ছায়া ও উপাদানকে একক জীবন্ত বস্তু হিসেবে অধ্যয়ন।",
    },
    materials: { en: "Mixed media", bn: "মিশ্র মাধ্যম" },
    commercialIntent: "Available for retail & hospitality",
    media: { image: lampshade1, gallery: [lampshade1a, lampshade1b] },
  },
  {
    id: "p-pd-02",
    slug: "lampshade-ii",
    category: "product_design",
    year: 2025,
    title: { en: "Lampshade — Sculptural Pendant II", bn: "ল্যাম্পশেড — ভাস্কর্যিক পেন্ডেন্ট ২" },
    description: {
      en: "A second lampshade exploration — softer silhouette, warmer cast.",
      bn: "একটি দ্বিতীয় ল্যাম্পশেড অন্বেষণ — কোমলতর সিলুয়েট, উষ্ণতর আভা।",
    },
    media: { image: lampshade2 },
  },
  {
    id: "p-pd-03",
    slug: "wall-clock",
    category: "product_design",
    featured: true,
    year: 2024,
    title: { en: "Wall Clock — Bespoke Edition", bn: "ওয়াল ক্লক — বেসপোক সংস্করণ" },
    description: {
      en: "A handcrafted wall clock that treats time-keeping as a quiet sculptural ritual on the wall.",
      bn: "একটি হস্তনির্মিত ওয়াল ক্লক যা সময়-মাপনকে দেয়ালের নীরব ভাস্কর্যিক আচার হিসেবে দেখে।",
    },
    media: { image: wallclock1 },
  },

  // ========== SURFACE DESIGN ==========
  {
    id: "p-sd-01",
    slug: "surface-i",
    category: "surface_design",
    featured: true,
    year: 2024,
    title: { en: "Surface Study I", bn: "সারফেস স্টাডি ১" },
    description: {
      en: "A surface design study layering pigment, weave and accidental marks into a singular field.",
      bn: "পিগমেন্ট, বুনন এবং আকস্মিক চিহ্নকে একটি একক ক্ষেত্রে স্তরিত করে গড়া সারফেস ডিজাইন স্টাডি।",
    },
    materials: { en: "Cotton, dye, mixed media", bn: "সুতি, রঙ, মিশ্র মাধ্যম" },
    media: { image: surface1 },
  },
  {
    id: "p-sd-02",
    slug: "surface-ii",
    category: "surface_design",
    year: 2024,
    title: { en: "Surface Study II", bn: "সারফেস স্টাডি ২" },
    description: {
      en: "A larger surface composition pushing scale, rhythm and the bleed of natural pigment.",
      bn: "মাত্রা, ছন্দ এবং প্রাকৃতিক রঙের ছড়িয়ে পড়াকে এগিয়ে নেওয়া একটি বৃহত্তর সারফেস কম্পোজিশন।",
    },
    media: { image: surface2 },
  },
  {
    id: "p-sd-03",
    slug: "surface-iii",
    category: "surface_design",
    year: 2025,
    title: { en: "Surface Study III", bn: "সারফেস স্টাডি ৩" },
    description: {
      en: "A textural panel — material as language, where pattern emerges from process rather than plan.",
      bn: "একটি টেক্সচারাল প্যানেল — উপাদানই ভাষা, যেখানে প্যাটার্ন পরিকল্পনার বদলে প্রক্রিয়া থেকে উদ্ভূত।",
    },
    media: { image: surface3 },
  },
  {
    id: "p-sd-04",
    slug: "tie-dye-i",
    category: "surface_design",
    featured: true,
    year: 2024,
    title: { en: "Tie-Dye Study I", bn: "টাই-ডাই স্টাডি ১" },
    description: {
      en: "A traditional resist-dye study reinterpreting Bengali tie-dye craft into contemporary surface language.",
      bn: "বাংলা টাই-ডাই কারুশিল্পকে সমকালীন সারফেস ভাষায় পুনর্ব্যাখ্যা করা একটি ঐতিহ্যবাহী রেজিস্ট-ডাই স্টাডি।",
    },
    materials: { en: "Cotton, natural dye", bn: "সুতি, প্রাকৃতিক রঙ" },
    techniques: { en: "Resist binding, vat dyeing", bn: "রেজিস্ট বাইন্ডিং, ভ্যাট ডাইং" },
    media: { image: tiedye1 },
  },
  {
    id: "p-sd-05",
    slug: "tie-dye-ii",
    category: "surface_design",
    year: 2024,
    title: { en: "Tie-Dye Study II", bn: "টাই-ডাই স্টাডি ২" },
    description: {
      en: "A second tie-dye exploration — tighter folds, deeper indigo, stronger negative space.",
      bn: "একটি দ্বিতীয় টাই-ডাই অন্বেষণ — কঠিনতর ভাঁজ, গভীরতর ইন্ডিগো, দৃঢ়তর নেগেটিভ স্পেস।",
    },
    media: { image: tiedye2 },
  },

  // ========== INSTALLATION / EXPERIMENTAL ==========
  {
    id: "p-in-01",
    slug: "installation-i",
    category: "installation_art",
    featured: true,
    year: 2025,
    title: { en: "Installation — Suspended I", bn: "ইনস্টলেশন — সাসপেন্ডেড ১" },
    description: {
      en: "A site-specific installation where craft objects become an inhabited atmosphere rather than discrete works.",
      bn: "একটি সাইট-স্পেসিফিক ইনস্টলেশন যেখানে কারুশিল্প-বস্তু আলাদা কাজের বদলে বসবাসযোগ্য পরিবেশে পরিণত হয়।",
    },
    media: { image: installation1 },
  },
  {
    id: "p-in-02",
    slug: "installation-ii",
    category: "installation_art",
    year: 2025,
    title: { en: "Installation — Suspended II", bn: "ইনস্টলেশন — সাসপেন্ডেড ২" },
    description: {
      en: "A second installation view — the same vocabulary of suspended elements seen at a different scale.",
      bn: "একটি দ্বিতীয় ইনস্টলেশন দৃশ্য — সাসপেন্ডেড উপাদানের একই শব্দভাণ্ডার ভিন্ন মাত্রায় দেখা।",
    },
    media: { image: installation2 },
  },
  {
    id: "p-ex-01",
    slug: "experimental-i",
    category: "installation_art",
    year: 2024,
    title: { en: "Experimental — Field Study", bn: "পরীক্ষামূলক — ক্ষেত্র অধ্যয়ন" },
    description: {
      en: "An experimental field study sitting between sculpture, surface and installation — early-stage research that feeds the rest of the practice.",
      bn: "ভাস্কর্য, সারফেস ও ইনস্টলেশনের মাঝে অবস্থিত একটি পরীক্ষামূলক ক্ষেত্র অধ্যয়ন — প্রারম্ভিক গবেষণা যা অনুশীলনের অন্যান্য অংশকে পুষ্ট করে।",
    },
    media: { image: experimental1 },
  },
];

// ---------- Helpers ----------

export const getProjectsByCategory = (cat: CategoryId | "all") =>
  cat === "all" ? projects : projects.filter((p) => p.category === cat);

export const getFeaturedProjects = (limit = 4) =>
  projects.filter((p) => p.featured).slice(0, limit);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getRelatedProjects = (project: PortfolioProject, limit = 3) =>
  projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, limit);

export const categoryLabel = (id: CategoryId, lang: "en" | "bn" = "en") =>
  categories.find((c) => c.id === id)?.label[lang] ?? id;

// ---------- Artist profile (sourced from Behance, Apr 2026) ----------

export const artistProfile = {
  name: { en: "Rubayat Raihan", bn: "রুবায়াত রায়হান" },
  basedIn: "Bangladesh",
  memberSince: "January 2021",
  availability: {
    en: "Available for freelance & full-time",
    bn: "ফ্রিল্যান্স ও ফুল-টাইমের জন্য উপলব্ধ",
  },
  behance: "https://www.behance.net/rubayatraihan",
};

/**
 * Map of internal project slugs to the matching public Behance gallery URL.
 * Sourced from https://www.behance.net/rubayatraihan (Apr 2026).
 */
export const behanceLinks: Record<string, string> = {
  "brass-relief-i":
    "https://www.behance.net/gallery/242500191/Relief-work-on-Brass-sheet-(-Metal-patina-1824)",
  "brass-relief-ii": "https://www.behance.net/gallery/242598451/Brass-Metal-Patina",
  "brass-relief-v": "https://www.behance.net/gallery/242598659/Unbound-(1212)",
  "wall-clock": "https://www.behance.net/gallery/242598743/Wall-Clock",
  "lampshade-i":
    "https://www.behance.net/gallery/242597433/Lampshade-using-traditional-technique",
  "installation-i": "https://www.behance.net/gallery/242598331/Installation-art",
  "tie-dye-i": "https://www.behance.net/gallery/242598557/Circle-of-Life",
};
