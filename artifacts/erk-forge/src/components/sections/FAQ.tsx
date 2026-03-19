import { useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { Plus, Minus, ArrowRight } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { t } = useLanguage()

  return (
    <section id="faq" className="bg-black border-t border-white/5 py-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">

          {/* Left: sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">{t.faq.label}</span>
              <div className="w-8 h-px bg-primary lg:hidden" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight mb-4">
              {t.faq.heading1} <br /><span className="text-primary">{t.faq.heading2}</span><br />{t.faq.heading3}
            </h2>
            <p className="text-white/40 font-sans text-sm leading-relaxed mb-6 max-w-xs mx-auto lg:mx-0">
              {t.faq.sub}
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 text-primary font-display tracking-widest uppercase text-xs border-b border-primary/30 pb-1.5 hover:border-primary hover:gap-3 transition-all duration-300"
              >
                {t.faq.askMe} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Right: accordion list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            {t.faq.items.map((faq, idx) => {
              const isOpen = open === idx
              return (
                <div
                  key={idx}
                  className={`border transition-all duration-300 ${
                    isOpen ? "border-primary/40 bg-primary/4" : "border-white/8 hover:border-white/20 bg-[#0D0D0D]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                  >
                    <span className={`font-display text-sm md:text-base uppercase tracking-wider leading-snug transition-colors ${
                      isOpen ? "text-primary" : "text-white group-hover:text-white/80"
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "border-primary bg-primary text-black" : "border-white/20 text-white/50"
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-primary/15 pt-4">
                          <p className="text-white/55 font-sans text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
