import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const { t } = useLanguage()

  return (
    <section id="faq" className="bg-black border-t border-white/5 py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">{t.faq.label}</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none">
              {t.faq.heading1}{" "}
              <span className="text-primary">{t.faq.heading2}</span>
              <br />{t.faq.heading3}
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-white/35 font-sans text-sm leading-relaxed mb-4 max-w-xs lg:ml-auto">
              {t.faq.sub}
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-primary font-display tracking-widest uppercase text-xs border-b border-primary/30 pb-1.5 hover:border-primary hover:gap-3 transition-all duration-300"
            >
              {t.faq.askMe} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-0 divide-y divide-white/6">
          {t.faq.items.map((faq, idx) => {
            const isOpen = open === idx
            const num = String(idx + 1).padStart(2, "0")
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.07 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full text-left group relative"
                >
                  {/* Main row */}
                  <div className={`relative flex items-center gap-6 py-7 px-2 transition-all duration-300 ${
                    isOpen ? "pl-6" : "hover:pl-4"
                  }`}>

                    {/* Gold left border when open */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-400 ${
                      isOpen ? "bg-primary" : "bg-transparent group-hover:bg-primary/30"
                    }`} />

                    {/* Number */}
                    <span className={`font-display text-xs tracking-[0.35em] shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-primary" : "text-white/20 group-hover:text-white/40"
                    }`}>
                      {num}
                    </span>

                    {/* Question */}
                    <span className={`font-display text-lg md:text-xl lg:text-2xl uppercase font-bold leading-snug flex-1 tracking-wide transition-colors duration-300 ${
                      isOpen ? "text-primary" : "text-white group-hover:text-white/80"
                    }`}>
                      {faq.q}
                    </span>

                    {/* Toggle indicator */}
                    <div className={`shrink-0 flex items-center gap-2 font-display text-[10px] tracking-widest uppercase transition-all duration-300 ${
                      isOpen ? "text-primary" : "text-white/20 group-hover:text-white/50"
                    }`}>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`w-6 h-6 border flex items-center justify-center transition-colors duration-300 ${
                          isOpen ? "border-primary bg-primary/10" : "border-white/15"
                        }`}
                      >
                        <svg viewBox="0 0 12 12" className="w-3 h-3 fill-current">
                          <path d="M5.25 0h1.5v5.25H12v1.5H6.75V12h-1.5V6.75H0v-1.5h5.25z"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-6 px-2 pb-8 pl-6">
                        {/* Left spacer aligns with question text */}
                        <div className="w-[calc(1.5rem+1.5rem)] shrink-0" />
                        <div className="flex-1 border-l border-primary/20 pl-6">
                          <p className="text-white/55 font-sans text-sm md:text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          <span className="font-display text-[10px] tracking-[0.4em] text-white/20 uppercase">
            Erk Forge Coaching
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
        </motion.div>

      </div>
    </section>
  )
}
