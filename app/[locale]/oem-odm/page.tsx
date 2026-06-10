import { OemOdmClient } from "@/components/pages/oemodm-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OEM & ODM Custom Solution | Reliable Chaozhou Ceramic Tableware Manufacturing |  ADA Ceramics",
  description: "Professional OEM/ODM ceramic tableware manufacturer. We provide comprehensive custom solutions including custom design, logo printing and private label services. Low MOQ starting from 500 pieces, FDA certified with 30+ years of manufacturing experience. Get your free quote today!",
  keywords: "ceramic OEM, ceramic ODM, custom ceramic tableware, private label ceramics, wholesale custom mugs, ceramic manufacturer China, bulk ceramic order",
}

export default function OemOdmPage() {
  return <OemOdmClient />
}
