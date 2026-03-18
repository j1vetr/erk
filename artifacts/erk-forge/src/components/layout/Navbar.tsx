import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
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
    { name: "Hakkımda", id: "about", isPage: false },
    { name: "Programlar", id: "programs", isPage: false },
    { name: "Referanslar", id: "testimonials", isPage: false },
    { name: "Blog", id: "blog", isPage: false },
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
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <div className="bg-black/60 rounded-sm px-3 py-1 backdrop-blur-sm border border-white/5 group-hover:border-primary/30 transition-all duration-200">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Erk Forge Coaching"
                className="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-base font-display tracking-widest text-gray-300 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}

            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-base font-display tracking-widest text-gray-300 hover:text-primary transition-colors py-2">
                ARAÇLAR <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
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
                      <Link key={tool.path} href={tool.path} className="block px-4 py-3 font-display tracking-wider text-gray-400 hover:text-black hover:bg-primary transition-colors">
                        {tool.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => scrollTo("contact")}
              className="px-6 py-2 bg-primary/10 hover:bg-primary border border-primary text-primary hover:text-black font-display tracking-widest text-lg rounded-sm transition-all duration-300 forge-glow"
            >
              ÜCRETSİZ DANIŞMA AL
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
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[100%] left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-display text-3xl text-gray-300 hover:text-primary border-b border-white/5 pb-4"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="border-b border-white/5 pb-4">
                <span className="text-left font-display text-3xl text-primary block mb-4">ARAÇLAR</span>
                <div className="pl-4 flex flex-col gap-4">
                  {toolLinks.map((tool) => (
                    <Link key={tool.path} href={tool.path} onClick={() => setMobileMenuOpen(false)} className="block font-display text-xl text-gray-400 hover:text-white">
                      - {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => scrollTo("contact")}
                className="mt-6 bg-primary text-black py-4 font-display text-2xl text-center rounded-sm shadow-[0_0_20px_rgba(245,197,24,0.4)]"
              >
                HEMEN BAŞLA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
