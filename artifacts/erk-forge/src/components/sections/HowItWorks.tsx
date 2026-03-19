import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingCart, ClipboardList, MessageSquare, TrendingUp, ArrowRight } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

const stepIcons = [
  <ShoppingCart className="w-6 h-6" />,
  <ClipboardList className="w-6 h-6" />,
  <MessageSquare className="w-6 h-6" />,
  <TrendingUp className="w-6 h-6" />,
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="bg-[#050505] border-t border-white/5 py-20 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">{t.howItWorks.label}</span>
            <div className="w-8 h-px bg-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold uppercase leading-none mb-4"
          >
            {t.howItWorks.heading1} <span className="text-primary">{t.howItWorks.heading2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm font-sans max-w-md mx-auto"
          >
            {t.howItWorks.sub}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[56px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-px bg-white/8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {t.howItWorks.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                className="group relative"
              >
                <div className="bg-[#0D0D0D] border border-white/8 hover:border-primary/40 transition-all duration-400 p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center text-primary shrink-0">
                      {stepIcons[idx]}
                    </div>
                    <span className="font-display text-5xl font-bold text-white/6 group-hover:text-white/10 transition-colors leading-none">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg uppercase tracking-wider text-white mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/45 font-sans text-sm leading-relaxed flex-1 mb-5">
                    {step.desc}
                  </p>

                  <div className="flex items-center gap-2 text-primary/60 font-display text-[10px] tracking-[0.25em] uppercase border-t border-white/6 pt-4 group-hover:text-primary transition-colors">
                    <div className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary" />
                    {step.detail}
                  </div>
                </div>

                {idx < t.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-[54px] z-20 items-center justify-center w-6 h-6 bg-[#050505]">
                    <ArrowRight className="w-4 h-4 text-primary/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-3 bg-primary text-black font-display uppercase tracking-[0.2em] px-10 py-4 hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(245,197,24,0.25)] text-sm"
          >
            {t.howItWorks.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
