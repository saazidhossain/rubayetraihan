/**
 * Rubayat Raihan — Portfolio Asset Library
 * --------------------------------------------------
 * Single source of truth for projects, images, videos
 * and thumbnails. Bilingual fields (en + bn) are
 * included for the language toggle.
 *
 * Categories follow the structure document:
 *  - Metal Art        (Relief Work, Patina)
 *  - Product Design   (Lampshades, Wall Clocks, Leather)
 *  - Surface Design   (Tie-dye, Experimental)
 *  - Fashion Design   (Dress Concepts, Illustration)
 *  - Installation Art
 */

import metalPeacock from "@/assets/portfolio/metal-peacock-relief.jpg";
import metalGeometric from "@/assets/portfolio/metal-geometric-relief.jpg";
import productLampshade from "@/assets/portfolio/product-lampshade.jpg";
import productWallclock from "@/assets/portfolio/product-wallclock.jpg";
import productLeatherBag from "@/assets/portfolio/product-leather-bag.jpg";
import surfaceShibori from "@/assets/portfolio/surface-shibori.jpg";
import surfaceExperimental from "@/assets/portfolio/surface-experimental.jpg";
import fashionDress from "@/assets/portfolio/fashion-dress-concept.jpg";
import fashionIllustration from "@/assets/portfolio/fashion-illustration.jpg";
import installationSuspended from "@/assets/portfolio/installation-suspended.jpg";

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
  /** Primary hero/thumbnail image (1280x1600 recommended). */
  image: string;
  /** Optional additional gallery images. */
  gallery?: string[];
  /** Optional embedded video URLs (YouTube, Vimeo, mp4). */
  videos?: string[];
  /** Optional dedicated low-res thumbnail. Falls back to `image`. */
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
  {
    id: "p-001",
    slug: "peacock-relief",
    category: "metal_art",
    featured: true,
    year: 2024,
    title: { en: "Peacock — Brass Relief", bn: "ময়ূর — ব্রাস রিলিফ" },
    description: {
      en: "Hand-hammered brass relief inspired by traditional Bengali peacock motifs, finished with a warm copper patina.",
      bn: "ঐতিহ্যবাহী বাংলা ময়ূর মোটিফ থেকে অনুপ্রাণিত হাতে-হাতুড়িকৃত ব্রাস রিলিফ, উষ্ণ কপার প্যাটিনায় সম্পন্ন।",
    },
    materials: { en: "Brass sheet, copper patina", bn: "ব্রাস শীট, কপার প্যাটিনা" },
    techniques: { en: "Repoussé, chasing, patination", bn: "রিপুসে, চেজিং, প্যাটিনেশন" },
    dimensions: "60 × 75 cm",
    commercialIntent: "Collector / commission",
    media: { image: metalPeacock },
  },
  {
    id: "p-002",
    slug: "geometric-relief",
    category: "metal_art",
    featured: true,
    year: 2024,
    title: { en: "Geometric Light Relief", bn: "জ্যামিতিক আলোক রিলিফ" },
    description: {
      en: "Sculptural copper and brass wall piece exploring Islamic-inspired geometry and the play of light through cut metal.",
      bn: "ইসলামিক জ্যামিতি এবং কাটা ধাতুর মাধ্যমে আলোর খেলা অন্বেষণকারী একটি ভাস্কর্যিক তামা ও ব্রাস ওয়াল পিস।",
    },
    materials: { en: "Copper, brass, oxidized finish", bn: "তামা, ব্রাস, অক্সিডাইজড ফিনিশ" },
    techniques: { en: "Plasma cutting, hand finishing", bn: "প্লাজমা কাটিং, হাতে ফিনিশিং" },
    dimensions: "90 × 70 cm",
    media: { image: metalGeometric },
  },
  {
    id: "p-003",
    slug: "pierced-lampshade",
    category: "product_design",
    featured: true,
    year: 2025,
    title: { en: "Pierced Brass Lampshade", bn: "পিয়ার্সড ব্রাস ল্যাম্পশেড" },
    description: {
      en: "A pierced brass pendant that projects intricate floral shadows across the room — sculpture and lighting in one.",
      bn: "একটি পিয়ার্সড ব্রাস পেন্ডেন্ট যা ঘর জুড়ে জটিল ফুলের ছায়া প্রজেক্ট করে — ভাস্কর্য এবং আলো একসাথে।",
    },
    materials: { en: "Brass, blackened finish", bn: "ব্রাস, ব্ল্যাকেন্ড ফিনিশ" },
    techniques: { en: "Hand piercing, soldering", bn: "হাতে পিয়ার্সিং, সোল্ডারিং" },
    dimensions: "Ø 32 × 28 cm",
    commercialIntent: "Available for retail & hospitality",
    media: { image: productLampshade },
  },
  {
    id: "p-004",
    slug: "copper-wallclock",
    category: "product_design",
    year: 2024,
    title: { en: "Copper Gear Wall Clock", bn: "কপার গিয়ার ওয়াল ক্লক" },
    description: {
      en: "A minimalist wall clock with a hand-hammered copper face and an exposed brass gear as a single sculptural detail.",
      bn: "হাতে-হাতুড়িকৃত কপার ফেস এবং একটি একক ভাস্কর্যিক বিবরণ হিসাবে উন্মুক্ত ব্রাস গিয়ার সহ একটি মিনিমালিস্ট ওয়াল ক্লক।",
    },
    materials: { en: "Copper, brass, steel hands", bn: "তামা, ব্রাস, স্টীল হ্যান্ডস" },
    dimensions: "Ø 36 cm",
    media: { image: productWallclock },
  },
  {
    id: "p-005",
    slug: "embossed-leather-bag",
    category: "product_design",
    year: 2023,
    title: { en: "Embossed Leather Messenger", bn: "এমবসড লেদার মেসেঞ্জার" },
    description: {
      en: "Vegetable-tanned leather messenger embossed with a traditional Bengali star motif, hand-stitched throughout.",
      bn: "ঐতিহ্যবাহী বাংলা স্টার মোটিফ দিয়ে এমবস করা ভেজিটেবল-ট্যানড লেদার মেসেঞ্জার, সম্পূর্ণরূপে হাতে সেলাই করা।",
    },
    materials: { en: "Vegetable-tanned leather, brass hardware", bn: "ভেজিটেবল-ট্যানড লেদার, ব্রাস হার্ডওয়্যার" },
    dimensions: "38 × 28 × 10 cm",
    media: { image: productLeatherBag },
  },
  {
    id: "p-006",
    slug: "indigo-shibori",
    category: "surface_design",
    featured: true,
    year: 2024,
    title: { en: "Indigo Shibori Study", bn: "ইন্ডিগো শিবোরি স্টাডি" },
    description: {
      en: "Hand-dyed indigo shibori panel exploring resist-folding rhythm and the unpredictable bleed of natural dye.",
      bn: "প্রাকৃতিক রঙের অপ্রত্যাশিত ব্লিড এবং রেজিস্ট-ফোল্ডিং ছন্দ অন্বেষণকারী হাতে-রঙ করা ইন্ডিগো শিবোরি প্যানেল।",
    },
    materials: { en: "Cotton, natural indigo", bn: "সুতি, প্রাকৃতিক ইন্ডিগো" },
    techniques: { en: "Itajime shibori, vat dyeing", bn: "ইতাজিমে শিবোরি, ভ্যাট ডাইং" },
    media: { image: surfaceShibori },
  },
  {
    id: "p-007",
    slug: "ember-brushstrokes",
    category: "surface_design",
    year: 2025,
    title: { en: "Ember — Experimental Print", bn: "এম্বার — পরীক্ষামূলক প্রিন্ট" },
    description: {
      en: "An experimental hand-painted surface in ember orange, charcoal and bone — built up in gestural layers on raw linen.",
      bn: "এম্বার অরেঞ্জ, চারকোল এবং বোনে একটি পরীক্ষামূলক হাতে-আঁকা সারফেস — কাঁচা লিনেনে অঙ্গভঙ্গিমূলক স্তরে তৈরি।",
    },
    materials: { en: "Linen, fabric paint, ink", bn: "লিনেন, ফ্যাব্রিক পেইন্ট, কালি" },
    media: { image: surfaceExperimental },
  },
  {
    id: "p-008",
    slug: "copper-thread-dress",
    category: "fashion_design",
    featured: true,
    year: 2025,
    title: { en: "Copper Thread Concept Dress", bn: "কপার থ্রেড কনসেপ্ট ড্রেস" },
    description: {
      en: "A flowing concept piece blending traditional Bengali embroidery with metallic copper thread and contemporary silhouette.",
      bn: "ঐতিহ্যবাহী বাংলা সূচিকর্মকে ধাতব তামার সুতা এবং সমকালীন সিলুয়েটের সাথে মিশ্রিত করে একটি প্রবাহিত কনসেপ্ট পিস।",
    },
    materials: { en: "Silk, copper thread, hand embroidery", bn: "সিল্ক, কপার থ্রেড, হাতে সূচিকর্ম" },
    media: { image: fashionDress },
  },
  {
    id: "p-009",
    slug: "atelier-illustration",
    category: "fashion_design",
    year: 2024,
    title: { en: "Atelier Illustration Study", bn: "অ্যাটেলিয়ার ইলাস্ট্রেশন স্টাডি" },
    description: {
      en: "Watercolour and ink fashion illustrations developed alongside textile swatches and lace studies on the studio table.",
      bn: "স্টুডিও টেবিলে টেক্সটাইল সোয়াচ এবং লেস স্টাডির পাশাপাশি তৈরি করা জলরঙ এবং কালির ফ্যাশন ইলাস্ট্রেশন।",
    },
    materials: { en: "Watercolour, ink, mixed media", bn: "জলরঙ, কালি, মিশ্র মাধ্যম" },
    media: { image: fashionIllustration },
  },
  {
    id: "p-010",
    slug: "suspended-discs",
    category: "installation_art",
    featured: true,
    year: 2025,
    title: { en: "Suspended — Copper Discs", bn: "সাসপেন্ডেড — কপার ডিস্কস" },
    description: {
      en: "A site-specific gallery installation: dozens of hand-forged copper and brass discs suspended in mid-air, painting the walls in shadow.",
      bn: "একটি সাইট-স্পেসিফিক গ্যালারি ইনস্টলেশন: কয়েক ডজন হাতে-ফোর্জড তামা এবং ব্রাস ডিস্ক বাতাসে স্থগিত, দেয়ালগুলিকে ছায়ায় রঙ করছে।",
    },
    materials: { en: "Copper, brass, monofilament", bn: "তামা, ব্রাস, মনোফিলামেন্ট" },
    dimensions: "Site-specific (≈ 3 × 2.5 m)",
    media: { image: installationSuspended },
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
