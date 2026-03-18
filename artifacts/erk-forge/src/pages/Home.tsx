import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Programs } from "@/components/sections/Programs"
import { Tools } from "@/components/sections/Tools"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Tools />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
