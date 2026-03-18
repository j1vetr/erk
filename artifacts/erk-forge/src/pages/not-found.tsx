import { Link } from "wouter"
import { SEO } from "@/hooks/useSEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { ArrowLeft, Dumbbell, RotateCcw } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="Sayfa Bulunamadı | Erk Forge Coaching"
        description="Aradığın sayfa bulunamadı."
        canonical="/404"
        noIndex
      />
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-16 px-4">

        {/* Arka plan efektleri */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Büyük 404 */}
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
            {/* İkon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Başlık */}
            <h1 className="font-display text-4xl md:text-6xl uppercase font-bold text-white mb-4 leading-none">
              Sayfa <span className="text-primary">Kayboldu</span>
            </h1>

            {/* Alt çizgi */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-16 bg-primary/40" />
              <span className="font-display text-xs uppercase tracking-[0.3em] text-primary/70">Hata 404</span>
              <div className="h-px w-16 bg-primary/40" />
            </div>

            {/* Açıklama */}
            <p className="text-white/45 font-sans text-base md:text-lg max-w-md mx-auto leading-relaxed mb-10">
              Aradığın sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir. Ama bir kayıp seni durdurmaz.
            </p>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="inline-flex items-center gap-2 bg-primary text-black font-display uppercase tracking-[0.2em] px-8 py-4 hover:bg-white transition-all duration-300 text-sm shadow-[0_0_25px_rgba(245,197,24,0.3)]">
                  <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
                </button>
              </Link>
              <Link href="/araclar">
                <button className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-display uppercase tracking-[0.2em] px-8 py-4 hover:border-primary hover:text-primary transition-all duration-300 text-sm">
                  <RotateCcw className="w-4 h-4" /> Forge Araçları
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Alt kart — hızlı linkler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10 mt-16 w-full max-w-2xl"
        >
          <div className="bg-[#0D0D0D] border border-white/8 p-6">
            <div className="text-white/30 font-display uppercase tracking-widest text-xs mb-5 text-center">Popüler Sayfalar</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Programlar", href: "/#programs", emoji: "💪" },
                { label: "Blog", href: "/blog", emoji: "📖" },
                { label: "BMI", href: "/araclar/bmi", emoji: "📏" },
                { label: "İletişim", href: "/#contact", emoji: "✉️" },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="bg-black border border-white/8 hover:border-primary/50 hover:bg-primary/5 p-3 text-center transition-all duration-200 cursor-pointer group">
                    <div className="text-xl mb-1">{item.emoji}</div>
                    <div className="font-display text-xs uppercase tracking-wider text-white/50 group-hover:text-primary transition-colors">{item.label}</div>
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
