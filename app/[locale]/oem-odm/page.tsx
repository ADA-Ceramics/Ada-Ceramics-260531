import { OemOdmClient } from "@/components/pages/oemodm-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OEM & ODM Custom Solution | Reliable Chaozhou Ceramic Tableware Manufacturing |  ADA Ceramics",
  description: "Professional OEM/ODM ceramic tableware manufacturer. Custom design, logo printing, private label available. Low MOQ 500pcs, FDA certified, 30+ years experience. Get free quote today!",
  keywords: "ceramic OEM, ceramic ODM, custom ceramic tableware, private label ceramics, wholesale custom mugs, ceramic manufacturer China, bulk ceramic order",
}

export default function OemOdmPage() {
  return <OemOdmClient />
}
