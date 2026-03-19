import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, X, ExternalLink, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

// 👇 PayPal ödeme linkini buraya yapıştır
const PAYPAL_LINK = "https://www.paypal.me/SENIN_PAYPAL_KULLANICI_ADIN"

const CYCLE_MS = 4000

export function Programs() {
  const [selected, setSelected] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showPaypalModal, setShowPaypalModal] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef<number>(Date.now())
  const { t, lang } = useLanguage()

  const plans = t.programs.plans.map((p, i) => ({ ...p, highlight: i === 1 }))
  const plan = plans[selected]

  const resetCycle = (idx?: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setProgress(0)
    startRef.current = Date.now()
    if (idx !== undefined) setSelected(idx)

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      const pct = Math.min((elapsed / CYCLE_MS) * 100, 100)
      setProgress(pct)
      if (elapsed >= CYCLE_MS) {
        startRef.current = Date.now()
        setProgress(0)
        setSelected(prev => (prev + 1) % plans.length)
      }
    }, 30)
  }

  useEffect(() => {
    resetCycle()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  return (
    <section id="programs" className="bg-[#050505] border-t border-white/5 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">{t.programs.label}</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none mb-4">
            {t.programs.heading1} <span className="text-primary">{t.programs.heading2}</span>
          </h2>
          <p className="text-gray-500 text-sm font-sans max-w-lg mx-auto">{t.programs.sub}</p>
        </div>

        {/* Tab selector */}
        <div className="grid grid-cols-3 gap-3 mb-0">
          {plans.map((p, i) => (
            <button
              key={i}
              onClick={() => resetCycle(i)}
              className={`relative text-center py-6 px-4 border transition-all duration-300 group ${
                selected === i
                  ? p.highlight ? "bg-primary border-primary shadow-[0_0_40px_rgba(245,197,24,0.3)]" : "bg-white/8 border-primary/60"
                  : p.highlight ? "bg-primary/5 border-primary/30 hover:bg-primary/10 hover:border-primary/60"
                  : "bg-[#0D0D0D] border-white/15 hover:border-white/35 hover:bg-white/5"
              }`}
            >
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 font-display text-[9px] tracking-[0.25em] uppercase px-3 py-0.5 font-bold transition-all duration-300 ${
                selected === i && p.highlight ? "bg-black text-primary border border-primary"
                : p.highlight ? "bg-primary text-black"
                : selected === i ? "bg-primary/20 text-primary border border-primary/50"
                : "bg-white/8 text-white/50 border border-white/15"
              }`}>
                {p.tag}
              </div>
              <div className={`font-display text-5xl md:text-7xl font-bold leading-none mb-1 transition-colors ${
                selected === i ? p.highlight ? "text-black" : "text-primary"
                : p.highlight ? "text-primary/70 group-hover:text-primary" : "text-white/55 group-hover:text-white/80"
              }`}>
                {p.duration}
              </div>
              <div className={`font-display text-sm tracking-[0.3em] uppercase mb-3 transition-colors ${
                selected === i ? p.highlight ? "text-black/70" : "text-white"
                : p.highlight ? "text-primary/50 group-hover:text-primary/80" : "text-white/45 group-hover:text-white/70"
              }`}>
                {t.programs.week}
              </div>
              <div className={`font-display text-xl font-bold transition-colors ${
                selected === i ? p.highlight ? "text-black" : "text-primary"
                : p.highlight ? "text-primary/65 group-hover:text-primary" : "text-white/55 group-hover:text-white/80"
              }`}>
                €{p.price}
              </div>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {plans.map((_, i) => (
            <div key={i} className="h-[2px] bg-white/8 overflow-hidden">
              {selected === i && (
                <div
                  className={`h-full transition-none ${plans[i].highlight ? "bg-primary" : "bg-white/50"}`}
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className={`border ${plan.highlight ? "border-primary/50 bg-primary/4" : "border-white/10 bg-white/2"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

              {/* Left: package summary */}
              <div className={`lg:col-span-2 p-8 flex flex-col justify-between ${plan.highlight ? "border-b lg:border-b-0 lg:border-r border-primary/20" : "border-b lg:border-b-0 lg:border-r border-white/8"}`}>
                <div>
                  <div className={`inline-block font-display text-[10px] tracking-[0.35em] uppercase px-3 py-1 mb-4 ${
                    plan.highlight ? "bg-primary text-black" : "border border-white/20 text-gray-400"
                  }`}>
                    {plan.tag}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase mb-3 leading-tight">
                    {plan.label}
                  </h3>
                  <p className="text-gray-400 text-sm font-sans leading-relaxed mb-8">{plan.desc}</p>
                </div>

                <div>
                  <div className="flex items-end gap-2 mb-6 pb-6 border-b border-white/8">
                    <span className="text-gray-400 text-lg mb-1 font-sans">€</span>
                    <span className="font-display text-6xl font-bold text-white leading-none">{plan.price}</span>
                    <span className="text-gray-500 text-sm font-sans mb-2">{t.programs.perPayment}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (plan.duration === "8") {
                        setShowPaypalModal(true)
                      } else {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-4 font-display text-sm tracking-[0.2em] uppercase font-bold transition-all duration-200 group ${
                      plan.highlight
                        ? "bg-primary text-black hover:bg-white"
                        : "bg-white/8 border border-white/20 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {t.programs.selectPlan}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right: feature list */}
              <div className="lg:col-span-3 p-8">
                <div className="font-display text-xs text-gray-500 tracking-[0.35em] uppercase mb-6">
                  {t.programs.whatsIncluded}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.programs.features.map((feat, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className={`w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? "text-primary" : "text-white/40"}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-xs font-sans leading-relaxed">{feat}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 text-xs font-sans mt-6 pt-5 border-t border-white/5">
                  {t.programs.disclaimer}
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* PayPal Confirmation Modal */}
      <AnimatePresence>
        {showPaypalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowPaypalModal(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-[#0D0D0D] border border-white/15 w-full max-w-md p-8"
            >
              {/* Close */}
              <button
                onClick={() => setShowPaypalModal(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* PayPal logo area */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#003087] flex items-center justify-center">
                  <span className="font-bold text-white text-sm italic">P</span>
                </div>
                <div>
                  <div className="text-white/40 font-display text-[10px] tracking-[0.3em] uppercase">
                    {lang === "en" ? "Secure Payment" : "Güvenli Ödeme"}
                  </div>
                  <div className="text-white font-display text-sm tracking-widest uppercase">PayPal</div>
                </div>
              </div>

              {/* Package info */}
              <div className="bg-white/4 border border-white/8 p-4 mb-6">
                <div className="text-white/40 font-display text-[10px] tracking-widest uppercase mb-1">
                  {lang === "en" ? "Selected Package" : "Seçilen Paket"}
                </div>
                <div className="text-white font-display text-lg uppercase tracking-wider">
                  {lang === "en" ? "8-Week Program" : "8 Haftalık Program"}
                </div>
                <div className="text-primary font-display text-3xl font-bold mt-1">€135</div>
              </div>

              {/* Info text */}
              <p className="text-white/55 font-sans text-sm leading-relaxed mb-2">
                {lang === "en"
                  ? "You will be redirected to PayPal to complete your payment securely. The coaching process begins once your payment is confirmed."
                  : "Ödemeyi tamamlamak için PayPal sayfasına yönlendirileceksiniz. Ödemen onaylandıktan sonra koçluk süreci başlıyor."}
              </p>
              <div className="flex items-center gap-2 text-white/30 font-sans text-xs mb-8">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500/70 flex-shrink-0" />
                {lang === "en" ? "256-bit SSL encrypted, processed by PayPal" : "256-bit SSL şifreli, PayPal güvencesiyle işleniyor"}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <a
                  href={PAYPAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#0070BA] hover:bg-[#005ea6] text-white font-display text-sm tracking-[0.2em] uppercase transition-all duration-200"
                >
                  {lang === "en" ? "Pay with PayPal" : "PayPal ile Öde"}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowPaypalModal(false)}
                  className="w-full py-3 border border-white/15 text-white/40 font-display text-xs tracking-widest uppercase hover:border-white/30 hover:text-white/60 transition-all duration-200"
                >
                  {lang === "en" ? "Cancel" : "Vazgeç"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
