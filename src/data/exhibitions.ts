/**
 * Exhibitions — sourced from the artist's Facebook post (Apr 2026).
 *
 * Picture 4 text:
 *   "Rubayat Raihan at Alliance Française de Dhaka.
 *    My metalwork at the 4th Annual Exhibition of BUDDHA OF BENGAL:
 *    Our Sacred Community.
 *    April 28 – May 6, 2026
 *    Time: Daily, 2pm to 8pm
 *    La Galerie, Alliance Française de Dhaka"
 */

import buddhaOfBengal1 from "@/assets/portfolio/exhibition/buddha-of-bengal-1.jpg";
import buddhaOfBengal2 from "@/assets/portfolio/exhibition/buddha-of-bengal-2.jpg";
import buddhaOfBengal3 from "@/assets/portfolio/exhibition/buddha-of-bengal-3.jpg";

import type { Bilingual } from "./portfolio";

export interface Exhibition {
  id: string;
  title: Bilingual;
  subtitle?: Bilingual;
  venue: Bilingual;
  city: Bilingual;
  startDate: string; // ISO
  endDate: string; // ISO
  dateLabel: Bilingual;
  timeLabel: Bilingual;
  description: Bilingual;
  gallery: { src: string; caption: Bilingual }[];
  featured?: boolean;
}

export const exhibitions: Exhibition[] = [
  {
    id: "buddha-of-bengal-2026",
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
    city: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
    startDate: "2026-04-28",
    endDate: "2026-05-06",
    dateLabel: { en: "April 28 – May 6, 2026", bn: "২৮ এপ্রিল – ৬ মে, ২০২৬" },
    timeLabel: { en: "Daily, 2pm – 8pm", bn: "প্রতিদিন, দুপুর ২টা – রাত ৮টা" },
    description: {
      en: "A hand-forged brass relief of the Buddha presented alongside works by other artists, exploring the sacred community of Bengal through metal, pigment and light.",
      bn: "অন্যান্য শিল্পীদের কাজের পাশাপাশি প্রদর্শিত বুদ্ধের হাতে গড়া ব্রাস রিলিফ — ধাতু, রঙ ও আলোর মাধ্যমে বাংলার পবিত্র সম্প্রদায়ের অন্বেষণ।",
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

export const getFeaturedExhibition = () =>
  exhibitions.find((e) => e.featured) ?? exhibitions[0];
