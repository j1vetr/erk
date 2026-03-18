import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { Link, useLocation } from "wouter"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [location, setLocation] = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    if (location !== "/") {
      setLocation("/")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = [
    { name: "Hakkımda", id: "about" },
    { name: "Programlar", id: "programs" },
    { name: "Referanslar", id: "testimonials" },
  ]

  const toolLinks = [
    { name: "Araçlar Merkezi", path: "/araclar" },
    { name: "BMI Hesaplayıcı", path: "/araclar/bmi" },
    { name: "Kalori (TDEE)", path: "/araclar/kalori" },
    { name: "1RM Maksimum", path: "/araclar/1rm" },
    { name: "Vücut Analizi", path: "/araclar/vucut-analizi" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5 py-2" : "bg-gradient-to-b from-black/70 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo — arka plan yok */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Erk Forge Coaching"
              className={`w-auto object-contain group-hover:scale-105 transition-all duration-300 ${isScrolled ? "h-16" : "h-[88px]"}`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-[15px] font-display tracking-[0.18em] text-white/80 hover:text-primary transition-colors uppercase"
              >
                {link.name}
              </button>
            ))}

            {/* Blog direct link */}
            <Link href="/blog" className="text-[15px] font-display tracking-[0.18em] text-white/80 hover:text-primary transition-colors uppercase">
              Blog
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[15px] font-display tracking-[0.18em] text-white/80 hover:text-primary transition-colors py-2 uppercase">
                Araçlar <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? "rotate-180 text-primary" : ""}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-[#111] border border-white/10 shadow-2xl rounded-sm py-2 overflow-hidden"
                  >
                    {toolLinks.map((tool) => (
                      <Link key={tool.path} href={tool.path} className="block px-4 py-3 font-display tracking-wider text-gray-400 hover:text-black hover:bg-primary transition-colors text-sm">
                        {tool.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Butonu */}
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 bg-primary text-black font-display text-sm tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-white transition-all duration-300 shadow-[0_0_18px_rgba(245,197,24,0.35)]"
            >
              Hemen Başlayalım
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-primary p-2">
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100svh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-display text-3xl text-white/80 hover:text-primary border-b border-white/5 pb-4 uppercase tracking-widest"
                >
                  {link.name}
                </button>
              ))}

              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-left font-display text-3xl text-white/80 hover:text-primary border-b border-white/5 pb-4 uppercase tracking-widest">
                Blog
              </Link>

              <div className="border-b border-white/5 pb-4">
                <span className="text-left font-display text-3xl text-primary block mb-4 uppercase tracking-widest">Araçlar</span>
                <div className="pl-4 flex flex-col gap-4">
                  {toolLinks.map((tool) => (
                    <Link key={tool.path} href={tool.path} onClick={() => setMobileMenuOpen(false)} className="block font-display text-xl text-white/60 hover:text-white">
                      — {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollTo("contact")}
                className="mt-6 bg-primary text-black py-4 font-display text-2xl text-center shadow-[0_0_20px_rgba(245,197,24,0.4)] flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                Hemen Başlayalım <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
