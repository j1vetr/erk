import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingCart, ClipboardList, MessageSquare, TrendingUp, ArrowRight } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Paket Siparişi Ver",
    desc: "Sana uygun paketi seç ve sipariş ver. Kontenjan sınırlı olduğundan yerinizi erkenden ayırtmanızı tavsiye ederiz.",
    detail: "2 dakika sürer",
  },
  {
    num: "02",
    icon: <ClipboardList className="w-6 h-6" />,
    title: "Sana Form İletiyoruz",
    desc: "Siparişinin ardından kişisel bilgilerini, hedeflerini, sağlık geçmişini ve günlük rutinini anlaman için detaylı bir form gönderiyoruz.",
    detail: "Hemen akabinde",
  },
  {
    num: "03",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Strateji Görüşmesi",
    desc: "Formunu aldıktan sonra WhatsApp üzerinden birebir görüşme yapıyoruz. Vücudunu, geçmişini ve yaşam tarzını anlıyorum — planın temeli burada atılıyor.",
    detail: "20–30 dakika",
  },
  {
    num: "04",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Dönüşüm Başlar",
    desc: "48 saat içinde antrenman ve beslenme programın hazır. Haftalık check-in ve anlık revizyonlarla seni süreç boyunca takip ediyorum.",
    detail: "Süreç boyunca",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" className="bg-[#050505] border-t border-white/5 py-20 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">Süreç</span>
            <div className="w-8 h-px bg-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold uppercase leading-none mb-4"
          >
            NASIL <span className="text-primary">ÇALIŞIR?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm font-sans max-w-md mx-auto"
          >
            Başvurudan ilk antrenman gününe kadar her adım netleştirilmiş, karmaşa yok.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-[56px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-px bg-white/8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                className="group relative"
              >
                {/* Step card */}
                <div className="bg-[#0D0D0D] border border-white/8 hover:border-primary/40 transition-all duration-400 p-6 h-full flex flex-col">

                  {/* Top: number + icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center text-primary shrink-0">
                      {step.icon}
                    </div>
                    <span className="font-display text-5xl font-bold text-white/6 group-hover:text-white/10 transition-colors leading-none">
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg uppercase tracking-wider text-white mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/45 font-sans text-sm leading-relaxed flex-1 mb-5">
                    {step.desc}
                  </p>

                  {/* Detail tag */}
                  <div className="flex items-center gap-2 text-primary/60 font-display text-[10px] tracking-[0.25em] uppercase border-t border-white/6 pt-4 group-hover:text-primary transition-colors">
                    <div className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary" />
                    {step.detail}
                  </div>
                </div>

                {/* Arrow between cards — desktop */}
                {idx < steps.length - 1 && (
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
            Hemen Başvur
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
