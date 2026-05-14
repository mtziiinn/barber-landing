import { HeroSection } from "@/components/landing/hero-section"
import { ServicesSection } from "@/components/landing/services-section"
import { TeamSection } from "@/components/landing/team-section"
import { LocationSection } from "@/components/landing/location-section"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
