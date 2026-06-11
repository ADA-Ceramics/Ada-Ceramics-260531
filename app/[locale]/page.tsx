import { HomeClient } from "@/components/home/home-client";
import { Metadata } from "next";

// New SEO title and description
export const metadata: Metadata = {
  title: "ADA Ceramics | OEM & ODM Ceramic Tableware Wholesale Factory",
  description:
    "Professional OEM/ODM ceramic tableware manufacturer. Wholesale plates, bowls, mugs and dinnerware sets for restaurants, hotels and global retailers.",
  keywords: "custom ceramic tableware, OEM/ODM dinnerware, wholesale plates, mugs, bakeware",
  robots: "index, follow",
  openGraph: {
    title: "ADA Ceramics | OEM & ODM Ceramic Tableware Wholesale Factory",
    description: "Professional OEM/ODM ceramic tableware manufacturer. Wholesale plates, bowls, mugs and dinnerware sets for restaurants, hotels and global retailers.",
    type: "website"
  }
};

const fixedCategories = [
  {
    name: "Custom OEM/ODM Solutions",
    description: "Professional custom ceramic tableware tailored for global brands, restaurants and retail partners.",
    image: "/wholesale-ceramics-supplier.webp",
    alt: "Custom OEM/ODM ceramic tableware manufacturing",
    slug: "oem-odm",
  },
  {
    name: "Wholesale Plates",
    description: "Chip-resistant dinner plates for busy restaurants and catering services.",
    image: "/wholesale-plates.webp",
    alt: "Wholesale ceramic dinner plates",
    slug: "wholesale-plates",
  },
  {
    name: "Wholesale Bowls",
    description: "Versatile soup and salad bowls, food-safe for busy commercial kitchens.",
    image: "/wholesale-bowls.webp",
    alt: "Wholesale ceramic soup and salad bowls",
    slug: "wholesale-bowls",
  },
  {
    name: "Wholesale Dinnerware Sets",
    description: "Matching tableware collections for hotels and hospitality businesses.",
    image: "/wholesale-dinnerware-sets.webp",
    alt: "Wholesale ceramic dinnerware sets for hospitality",
    slug: "wholesale-dinnerware-sets",
  },
  {
    name: "Wholesale Cups and Mugs",
    description: "Customizable ceramic drinkware for cafes and corporate gifts.",
    image: "/wholesale-cups-mugs.webp",
    alt: "Wholesale ceramic cups and mugs",
    slug: "wholesale-cups-mugs",
  },
  {
    name: "Wholesale Bakeware",
    description: "Oven-safe ceramic bakeware for commercial kitchens and bakeries.",
    image: "/wholesale-bakeware.webp",
    alt: "Wholesale ceramic bakeware",
    slug: "wholesale-bakeware",
  },
];

export default function HomePage() {
  return <HomeClient categories={fixedCategories} />;
}
