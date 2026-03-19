import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { Link, useLocation } from "wouter"
import { useLanguage } from "@/i18n/LanguageContext"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [location, setLocation] = useLocation()
  const { lang, setLang, t } = useLanguage()

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
    { name: t.nav.about, id: "about" },
    { name: t.nav.programs, id: "programs" },
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

          {/* Logo */}
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
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[15px] font-display tracking-[0.18em] text-white/80 hover:text-primary transition-colors uppercase"
              >
                {link.name}
              </button>
            ))}

            <Link href="/blog" className="text-[15px] font-display tracking-[0.18em] text-white/80 hover:text-primary transition-colors uppercase">
              {t.nav.blog}
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[15px] font-display tracking-[0.18em] text-white/80 hover:text-primary transition-colors py-2 uppercase">
                {t.nav.tools} <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? "rotate-180 text-primary" : ""}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[380px] bg-[#111] border border-white/10 shadow-2xl rounded-sm overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                      <span className="font-display text-xs uppercase tracking-widest text-white/40">{t.nav.forgeTools}</span>
                      <Link href="/araclar" className="font-display text-xs uppercase tracking-widest text-primary hover:text-white transition-colors">
                        {t.nav.allTools}
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
                      {t.nav.toolLinks.map((tool) => (
                        <Link key={tool.path} href={tool.path} className="block px-4 py-3 bg-[#111] font-display tracking-wider text-gray-400 hover:text-black hover:bg-primary transition-colors text-xs uppercase">
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lang Toggle */}
            <button
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              className="flex items-center gap-1 font-display text-xs tracking-[0.2em] border border-white/20 px-3 py-1.5 text-white/70 hover:border-primary hover:text-primary transition-all duration-200"
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 bg-primary text-black font-display text-sm tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-white transition-all duration-300 shadow-[0_0_18px_rgba(245,197,24,0.35)]"
            >
              {t.nav.startNow}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              className="font-display text-xs tracking-[0.2em] border border-white/20 px-2.5 py-1 text-white/70 hover:border-primary hover:text-primary transition-all duration-200"
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>
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
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-display text-3xl text-white/80 hover:text-primary border-b border-white/5 pb-4 uppercase tracking-widest"
                >
                  {link.name}
                </button>
              ))}

              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-left font-display text-3xl text-white/80 hover:text-primary border-b border-white/5 pb-4 uppercase tracking-widest">
                {t.nav.blog}
              </Link>

              <div className="border-b border-white/5 pb-4">
                <span className="text-left font-display text-3xl text-primary block mb-4 uppercase tracking-widest">{t.nav.tools}</span>
                <div className="pl-4 flex flex-col gap-4">
                  {t.nav.toolLinks.map((tool) => (
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
                {t.nav.startNow} <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
