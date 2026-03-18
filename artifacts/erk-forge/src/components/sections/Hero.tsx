import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Users, Target, Trophy } from "lucide-react"
import { ForgeButton } from "@/components/ui/forge-button"

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Sayı sayacı için hook
  const Counter = ({ end, duration, label }: { end: number, duration: number, label: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeProgress * end))

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step)
        }
      }

      animationFrame = window.requestAnimationFrame(step)
      return () => window.cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return (
      <div className="flex flex-col items-center">
        <span className="font-display text-4xl md:text-5xl text-white font-bold">{count}+</span>
        <span className="text-primary font-display tracking-widest text-sm uppercase">{label}</span>
      </div>
    )
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={`${import.meta.env.BASE_URL}videos/hero-bg.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#000]" />
        
        {/* Particles Overlay */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary font-display uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(245,197,24,0.3)]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(245,197,24,1)]" />
          Elit Vücut Geliştirme & Fitness Koçluğu
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-7xl sm:text-8xl md:text-[9rem] font-bold leading-[0.85] mb-6 drop-shadow-2xl"
        >
          DEMİRİ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FFF5CC] to-primary forge-glow">FORGE ET</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-2xl text-gray-300 mb-12 font-sans font-light"
        >
          Bahane yok. Kestirme yok. Sadece ağır demir, saf disiplin ve ustaca bir plan. 
          Fiziğini Erk Forge Koçluğu rehberliğinde baştan yarat.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          <button 
            onClick={() => scrollTo("contact")}
            className="px-10 py-5 bg-primary text-black font-display text-2xl tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(245,197,24,0.5)]"
          >
            Hemen Başla
          </button>
          <button 
            onClick={() => scrollTo("programs")}
            className="px-10 py-5 bg-black/50 border border-white/20 text-white font-display text-2xl tracking-widest uppercase hover:border-primary hover:text-primary backdrop-blur-sm transition-all duration-300"
          >
            Programları İncele
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 md:gap-24 w-full max-w-4xl border-t border-white/10 pt-10"
        >
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-primary/50 mb-2" />
            <Counter end={500} duration={2000} label="Mutlu Müşteri" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Trophy className="w-8 h-8 text-primary/50 mb-2" />
            <Counter end={8} duration={2000} label="Yıl Deneyim" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Target className="w-8 h-8 text-primary/50 mb-2" />
            <Counter end={97} duration={2000} label="% Başarı Oranı" />
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary flex flex-col items-center gap-2 cursor-pointer transition-colors"
        onClick={() => scrollTo("about")}
      >
        <span className="font-display uppercase text-sm tracking-[0.3em]">AŞAĞI İN</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}
