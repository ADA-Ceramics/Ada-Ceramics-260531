"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Factory, Cog, Ruler, Thermometer, Eye, Truck, Users } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export function FactoryClient() {

  const facilities = [
    { icon: Factory, title: "Raw Material Processing", desc: "High-quality kaolin and clay selected and processed for ceramic production" },
    { icon: Cog, title: "Forming & Shaping", desc: "Automatic and manual forming processes for various ceramic products" },
    { icon: Thermometer, title: "High-Temperature Kiln", desc: "Advanced kilns for precise firing at controlled temperatures" },
    { icon: Ruler, title: "Glazing & Decoration", desc: "Professional glazing and surface treatment for durability and beauty" },
    { icon: Eye, title: "Quality Inspection", desc: "Strict quality control at every production step" },
    { icon: Truck, title: "Packaging & Logistics", desc: "Safe packaging and efficient global shipping" },
  ]

  const processes = [
    { step: 1, title: "Material Selection", desc: "Select high-quality raw materials" },
    { step: 2, title: "Clay Processing", desc: "Crush, mix and purify clay" },
    { step: 3, title: "Forming", desc: "Shape products by machine or hand" },
    { step: 4, title: "Bisque Firing", desc: "First firing at low temperature" },
    { step: 5, title: "Glazing", desc: "Apply glaze evenly on surface" },
    { step: 6, title: "Glost Firing", desc: "High-temperature final firing" },
    { step: 7, title: "Quality Check", desc: "Full inspection of each product" },
    { step: 8, title: "Packaging", desc: "Safe packaging and storage" },
  ]

  const qualityFeatures = [
    "FDA & LFGB food-safe certification",
    "100% inspection for each order",
    "Lead & cadmium free materials",
    "Stable color and glaze quality",
    "Heat and scratch resistance",
    "Durable for daily and commercial use"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#f5f3ef] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span style={{ color: '#1a1a1a' }}>Our Modern</span>
              <span className="block" style={{ color: '#8b7355' }}>
                Ceramic Factory
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6b7280' }}>
              30,000㎡ professional ceramic production base with advanced equipment, strict quality control, and certified production lines.
            </p>
          </div>
        </div>
      </section>

      {/* Factory Stats */}
      <section className="py-16 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">30,000</p>
                <p className="text-muted-foreground mt-2">Sq. Meters</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">200+</p>
                <p className="text-muted-foreground mt-2">Workers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">8+</p>
                <p className="text-muted-foreground mt-2">Production Lines</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">99.8%</p>
                <p className="text-muted-foreground mt-2">Quality Pass Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">Our Facilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Advanced Production Equipment
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <facility.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{facility.title}</h3>
                <p className="text-muted-foreground">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">Production Flow</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Complete Manufacturing Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((process) => (
              <div key={process.step} className="bg-card rounded-2xl p-6 border border-border relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold text-foreground mt-4 mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold mb-2">Quality Assurance</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Strict Quality Control System
              </h2>
              <p className="text-muted-foreground mb-8">
                We implement full-process quality control from raw material to finished product, ensuring every piece meets international standards.
              </p>
              <ul className="space-y-4">
                {qualityFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/quality check.webp"
                alt="Quality Check"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white rounded-xl p-6 shadow-xl">
                <p className="text-4xl font-bold">99.8%</p>
                <p className="text-sm opacity-90">Pass Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary font-semibold mb-2">Our Team</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Professional Production Team
              </h2>
              <p className="text-muted-foreground mb-6">
                Our experienced team includes skilled technicians, strict quality inspectors, professional designers, and efficient production managers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Skilled Masters</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">QC Members</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-2xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">R&D Team</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-2xl font-bold text-primary">8+</p>
                  <p className="text-sm text-muted-foreground">Project Managers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Visit Our Factory Today
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Contact us to schedule a factory visit or discuss your ceramic project requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a2e] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all"
            >
              Book a Visit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/oem-odm"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              OEM/ODM Service
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
