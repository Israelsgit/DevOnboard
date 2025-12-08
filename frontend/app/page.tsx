"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { Particles } from "@/components/landing/Particles";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-teal-500/30 overflow-x-hidden">
      <Particles />
      <Navbar />
      <Hero />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
