import { motion } from "framer-motion"
import { ForgeButton } from "@/components/ui/forge-button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-forge.png`}
          alt="Dark Gym Forge"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-background" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-display uppercase tracking-widest text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Elite Bodybuilding & Fitness
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-6"
        >
          FORGE YOUR <br />
          <span className="forge-text-gradient">IRON WILL</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 font-sans"
        >
          No excuses. No shortcuts. Just heavy iron, raw discipline, and a master plan. 
          Transform your physique under the guidance of Erk Forge Coaching.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <ForgeButton size="lg" onClick={() => scrollTo("contact")}>
            Start Coaching
          </ForgeButton>
          <ForgeButton variant="outline" size="lg" onClick={() => scrollTo("programs")}>
            View Programs
          </ForgeButton>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors"
        onClick={() => scrollTo("about")}
      >
        <span className="font-display uppercase text-xs tracking-[0.2em]">Descend</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
