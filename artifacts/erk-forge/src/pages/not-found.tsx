import { Link } from "wouter"
import { SEO } from "@/hooks/useSEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { ArrowLeft, Dumbbell, RotateCcw } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

const quickLinks = [
  { href: "/#programs", emoji: "💪" },
  { href: "/blog", emoji: "📖" },
  { href: "/araclar/bmi", emoji: "📏" },
  { href: "/#contact", emoji: "✉️" },
]

export default function NotFound() {
  const { t, lang } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title={lang === "en" ? "Page Not Found | Erk Forge Coaching" : "Sayfa Bulunamadı | Erk Forge Coaching"}
        description={lang === "en" ? "The page you're looking for could not be found." : "Aradığın sayfa bulunamadı."}
        canonical="/404"
        noIndex
      />
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <div
            className="font-display font-bold leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 25vw, 20rem)", color: "transparent", WebkitTextStroke: "2px rgba(245,197,24,0.12)" }}
          >
            404
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="-mt-8 md:-mt-16 relative z-10"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-6xl uppercase font-bold text-white mb-4 leading-none">
              {lang === "en" ? "PAGE" : "SAYFA"} <span className="text-primary">{lang === "en" ? "LOST" : "KAYBOLDU"}</span>
            </h1>

            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-16 bg-primary/40" />
              <span className="font-display text-xs uppercase tracking-[0.3em] text-primary/70">{lang === "en" ? "Error 404" : "Hata 404"}</span>
              <div className="h-px w-16 bg-primary/40" />
            </div>

            <p className="text-white/45 font-sans text-base md:text-lg max-w-md mx-auto leading-relaxed mb-10">
              {t.notFound.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="inline-flex items-center gap-2 bg-primary text-black font-display uppercase tracking-[0.2em] px-8 py-4 hover:bg-white transition-all duration-300 text-sm shadow-[0_0_25px_rgba(245,197,24,0.3)]">
                  <ArrowLeft className="w-4 h-4" /> {t.notFound.goHome}
                </button>
              </Link>
              <Link href="/araclar">
                <button className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-display uppercase tracking-[0.2em] px-8 py-4 hover:border-primary hover:text-primary transition-all duration-300 text-sm">
                  <RotateCcw className="w-4 h-4" /> {t.notFound.viewTools}
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10 mt-16 w-full max-w-2xl"
        >
          <div className="bg-[#0D0D0D] border border-white/8 p-6">
            <div className="text-white/30 font-display uppercase tracking-widest text-xs mb-5 text-center">
              {t.notFound.popularPages}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {t.notFound.pages.map((item, idx) => (
                <Link key={idx} href={quickLinks[idx].href}>
                  <div className="bg-black border border-white/8 hover:border-primary/50 hover:bg-primary/5 p-3 text-center transition-all duration-200 cursor-pointer group">
                    <div className="text-xl mb-1">{quickLinks[idx].emoji}</div>
                    <div className="font-display text-xs uppercase tracking-wider text-white/50 group-hover:text-primary transition-colors">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
