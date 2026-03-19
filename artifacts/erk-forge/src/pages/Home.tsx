import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Programs } from "@/components/sections/Programs"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { FAQ } from "@/components/sections/FAQ"
import { Blog } from "@/components/sections/Blog"
import { Footer } from "@/components/layout/Footer"
import { SEO } from "@/hooks/useSEO"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <SEO
        title="Erk Forge Coaching | Kişisel Fitness & Vücut Geliştirme Koçluğu"
        description="İstanbul merkezli online kişisel koçluk. Bilimsel antrenman programları, beslenme planlaması ve 7+ yıllık deneyimle fiziğini dönüştür. Şimdi başla."
        canonical="/"
      />
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <HowItWorks />
      <FAQ />
      <Blog />
      <Footer />
    </main>
  )
}
