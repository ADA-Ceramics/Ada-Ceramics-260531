import { FactoryClient } from "@/components/pages/factory-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Factory | ADA Ceramics",
  description: "46,000㎡ certified ceramic factory with 8+ production lines. FDA & LFGB approved, wholesale & OEM/ODM supported for global buyers.",
}

export default function FactoryPage() {
  return <FactoryClient />
}
