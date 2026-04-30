/**
 * Exhibitions — sourced from the artist's social posts (Apr 2026)
 * and practice archive.
 *
 * Keep this file flat & typed: routes and components read from it.
 */

import buddhaOfBengal1 from "@/assets/portfolio/exhibition/buddha-of-bengal-1.jpg";
import buddhaOfBengal2 from "@/assets/portfolio/exhibition/buddha-of-bengal-2.jpg";
import buddhaOfBengal3 from "@/assets/portfolio/exhibition/buddha-of-bengal-3.jpg";

import type { Bilingual } from "./portfolio";

export type ExhibitionStatus = "upcoming" | "current" | "past";

export interface ExhibitionImage {
  src: string;
  caption: Bilingual;
  /** Optional alt override; defaults to English caption. */
  alt?: string;
}

export interface Exhibition {
  id: string;
  slug: string;
  title: Bilingual;
  subtitle?: Bilingual;
  venue: Bilingual;
  city: Bilingual;
  country: Bilingual;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string; // ISO YYYY-MM-DD
  dateLabel: Bilingual;
  timeLabel?: Bilingual;
  /** One or two-sentence preview used on list cards. */
  summary: Bilingual;
  /** Full write-up on the detail page (can contain \n\n paragraph breaks). */
  description: Bilingual;
  /** Ordered list of gallery images. First image doubles as the hero. */
  gallery: ExhibitionImage[];
  /** Short press/curator blurb, optional. */
  curatorNote?: Bilingual;
  featured?: boolean;
  status: ExhibitionStatus;
  /** Optional external link for press / tickets. */
  externalUrl?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "buddha-of-bengal-2026",
    slug: "buddha-of-bengal-2026",
    status: "current",
    featured: true,
    title: {
      en: "Buddha of Bengal: Our Sacred Community",
      bn: "বাংলার বুদ্ধ: আমাদের পবিত্র সম্প্রদায়",
    },
    subtitle: {
      en: "4th Annual Exhibition — Metalwork by Rubayat Raihan",
      bn: "৪র্থ বার্ষিক প্রদর্শনী — রুবায়াত রায়হানের ধাতব কাজ",
    },
    venue: {
      en: "La Galerie, Alliance Française de Dhaka",
      bn: "লা গ্যালারি, আলিয়ঁস ফ্রঁসেজ দ্য ঢাকা",
    },
    city: { en: "Dhaka", bn: "ঢাকা" },
    country: { en: "Bangladesh", bn: "বাংলাদেশ" },
    startDate: "2026-04-28",
    endDate: "2026-05-06",
    dateLabel: { en: "April 28 – May 6, 2026", bn: "২৮ এপ্রিল – ৬ মে, ২০২৬" },
    timeLabel: { en: "Daily, 2pm – 8pm", bn: "প্রতিদিন, দুপুর ২টা – রাত ৮টা" },
    summary: {
      en: "A hand-forged brass relief of the Buddha, exhibited alongside works exploring the sacred community of Bengal.",
      bn: "হাতে গড়া বুদ্ধের ব্রাস রিলিফ — বাংলার পবিত্র সম্প্রদায়কে ঘিরে অন্যান্য শিল্পীর কাজের পাশাপাশি প্রদর্শিত।",
    },
    description: {
      en: "Rubayat's contribution to the 4th Annual Buddha of Bengal exhibition is a large hand-hammered brass relief — a contemporary repoussé study reading as both portrait and altar.\n\nThe work sits within a group show at La Galerie, Alliance Française de Dhaka, alongside paintings and sculpture by other Bangladeshi artists. Seen together, the pieces form a quiet meditation on inheritance, ritual and the living presence of Buddhist iconography in Bengal.",
      bn: "৪র্থ বার্ষিক বাংলার বুদ্ধ প্রদর্শনীতে রুবায়াতের অবদান একটি বৃহৎ হাতে-হাতুড়িকৃত ব্রাস রিলিফ — একটি সমকালীন রিপুসে অধ্যয়ন যা একইসাথে প্রতিকৃতি ও বেদির মত পাঠযোগ্য।\n\nকাজটি লা গ্যালারি, আলিয়ঁস ফ্রঁসেজ দ্য ঢাকায় আয়োজিত একটি গ্রুপ শো-এর অংশ, যেখানে অন্যান্য বাংলাদেশি শিল্পীর চিত্রকর্ম ও ভাস্কর্যও রয়েছে। একসাথে কাজগুলো উত্তরাধিকার, আচার এবং বাংলায় বৌদ্ধ চিত্রকল্পের জীবন্ত উপস্থিতির এক নীরব ধ্যান রচনা করে।",
    },
    curatorNote: {
      en: "Metal as devotion — surface as scripture.",
      bn: "ধাতুই ভক্তি — পৃষ্ঠই শাস্ত্র।",
    },
    gallery: [
      {
        src: buddhaOfBengal1,
        caption: {
          en: "Brass relief of the Buddha — hand-hammered, framed in teak.",
          bn: "বুদ্ধের ব্রাস রিলিফ — হাতে-হাতুড়িকৃত, টিক কাঠে বাঁধাই।",
        },
      },
      {
        src: buddhaOfBengal2,
        caption: {
          en: "Gallery view: the relief centred between neighbouring works.",
          bn: "গ্যালারি দৃশ্য: পার্শ্ববর্তী কাজের মাঝে কেন্দ্রীভূত রিলিফ।",
        },
      },
      {
        src: buddhaOfBengal3,
        caption: {
          en: "Opening night at La Galerie, Alliance Française de Dhaka.",
          bn: "উদ্বোধনী রাত, লা গ্যালারি, আলিয়ঁস ফ্রঁসেজ দ্য ঢাকা।",
        },
      },
    ],
  },
];

// ---------- Helpers ----------

export const getExhibitionBySlug = (slug: string) =>
  exhibitions.find((e) => e.slug === slug);

export const getFeaturedExhibition = () =>
  exhibitions.find((e) => e.featured) ?? exhibitions[0];

export const getExhibitionsByStatus = (status: ExhibitionStatus) =>
  exhibitions.filter((e) => e.status === status);

export const statusLabel = (
  status: ExhibitionStatus,
  lang: "en" | "bn" = "en",
): string => {
  const map: Record<ExhibitionStatus, Bilingual> = {
    upcoming: { en: "Upcoming", bn: "আসন্ন" },
    current: { en: "On View", bn: "চলমান" },
    past: { en: "Archive", bn: "সংগ্রহ" },
  };
  return map[status][lang];
};
