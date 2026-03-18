import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Programs } from "@/components/sections/Programs"
import { Testimonials } from "@/components/sections/Testimonials"
import { Blog } from "@/components/sections/Blog"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}
