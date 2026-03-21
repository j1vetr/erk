import { motion, useInView } from "framer-motion"
import { Target, Zap, Shield, TrendingUp } from "lucide-react"
import { useRef } from "react"
import { useLanguage } from "@/i18n/LanguageContext"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const pillarIcons = [
    <Target className="w-4 h-4" />,
    <Zap className="w-4 h-4" />,
    <Shield className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
  ]

  return (
    <section id="about" className="bg-black relative overflow-hidden border-t border-white/5" ref={ref}>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[22vw] font-bold text-white/[0.025] uppercase leading-none tracking-tighter">
          ERK
        </span>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        <motion.div
          className="flex items-center gap-4 mb-14"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-10 h-px bg-primary" />
          <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">{t.about.label}</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

          {/* Photo column */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/40 z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/40 z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />

            <div className="overflow-hidden relative">
              <img
                src={`${import.meta.env.BASE_URL}images/coach-portrait.webp`}
                alt="Erk Forge Coach"
                className="w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: "3/4", filter: "contrast(1.08) brightness(0.92)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <motion.div
              className="absolute bottom-6 left-6 right-6 bg-black/85 border-l-2 border-primary p-4 backdrop-blur-sm z-30"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="text-primary font-display text-[10px] tracking-[0.35em] uppercase mb-1">{t.about.certLabel}</div>
              <div className="text-white font-display text-base tracking-widest uppercase">{t.about.certTitle}</div>
            </motion.div>
          </motion.div>

          {/* Content column */}
          <motion.div
            className="lg:col-span-7 lg:pl-16"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold uppercase leading-[1.1] mb-8 tracking-tight">
              {t.about.heading1}{" "}
              <span className="text-primary">{t.about.heading2}</span>{" "}
              {t.about.heading3}
            </h2>

            <div className="border-l-2 border-primary/40 pl-5 mb-10 space-y-3 max-w-xl">
              <p className="text-white/80 text-sm leading-relaxed font-sans">{t.about.body1}</p>
              <p className="text-white/60 text-sm leading-relaxed font-sans">{t.about.body2}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-10 border-t border-b border-white/10 divide-x divide-white/8">
              {[
                { value: "7+",   label: t.about.statExp },
                { value: "150+", label: t.about.statClients },
                { value: "48S",  label: t.about.statDelivery },
                { value: "%90+", label: t.about.statSuccess },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`py-6 text-center ${i % 2 === 0 && i > 1 ? "border-t border-white/8 sm:border-t-0" : ""}`}
                >
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary leading-none mb-1.5">{stat.value}</div>
                  <div className="text-white/40 text-[9px] font-display tracking-[0.28em] uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {t.about.pillars.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 group"
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.1 }}
                >
                  <div className="w-7 h-7 border border-primary/50 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-colors duration-200">
                    {pillarIcons[i]}
                  </div>
                  <div>
                    <div className="text-white font-display text-xs tracking-wider uppercase mb-0.5">{p.title}</div>
                    <div className="text-white/60 text-xs font-sans leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
