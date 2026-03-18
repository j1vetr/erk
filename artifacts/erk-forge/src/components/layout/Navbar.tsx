import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Dumbbell } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Programs", id: "programs" },
    { name: "Tools", id: "tools" },
    { name: "Testimonials", id: "testimonials" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollTo("hero")}
          >
            <Dumbbell className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-display font-bold text-2xl tracking-widest uppercase">
              Erk <span className="text-primary">Forge</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-display uppercase tracking-widest text-gray-300 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollTo("contact")}
              className="px-6 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-white font-display uppercase tracking-wider text-sm rounded transition-all"
            >
              Get Coached
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-display uppercase text-xl text-gray-300 hover:text-primary py-2 border-b border-white/5"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => scrollTo("contact")}
                className="mt-4 bg-primary text-white py-3 font-display uppercase text-lg text-center rounded-sm"
              >
                Start Forging
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
