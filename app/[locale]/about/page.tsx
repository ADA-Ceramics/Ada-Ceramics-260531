import { AboutClient } from "@/components/pages/about-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | ADA Ceramics",
  description: "Professional ceramic manufacturer with 20+ years of experience. FDA & LFGB certified, wholesale & OEM/ODM services. Reliable supplier for global businesses.",
}

export default function AboutPage() {
  return <AboutClient />
}
