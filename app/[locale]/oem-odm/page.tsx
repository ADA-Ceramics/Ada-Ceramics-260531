import { OemOdmClient } from "@/components/pages/oemodm-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OEM/ODM Ceramic Tableware Manufacturing | Custom Wholesale | ADA Ceramics",
  description: "Professional OEM/ODM ceramic tableware manufacturer. Custom design, logo printing, private label available. Low MOQ 500pcs, FDA certified, 15+ years experience. Get free quote today!",
  keywords: "ceramic OEM, ceramic ODM, custom ceramic tableware, private label ceramics, wholesale custom mugs, ceramic manufacturer China, bulk ceramic order",
}

export default function OemOdmPage() {
  return <OemOdmClient />
}
