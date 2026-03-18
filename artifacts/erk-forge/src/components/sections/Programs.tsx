import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"
import { useRef, useState } from "react"

const plans = [
  {
    num: "01",
    name: "8 HAFTA",
    tag: "Başlangıç",
    price: "135",
    desc: "Temeli sağlam atmak isteyenler için güçlü bir başlangıç.",
    highlight: false,
  },
  {
    num: "02",
    name: "12 HAFTA",
    tag: "En Popüler",
    price: "170",
    desc: "Kalıcı dönüşüm için en çok tercih edilen program.",
    highlight: true,
  },
  {
    num: "03",
    name: "16 HAFTA",
    tag: "Elite",
    price: "200",
    desc: "Fiziğinin sınırlarını zorlamak isteyen kararlı sporcular için.",
    highlight: false,
  },
]

const features = [
  "Hedefe ve yaşam tarzına özel antrenman planı",
  "Kişiye özel makro ve kalori hesaplaması",
  "Sürdürülebilir beslenme planı",
  "Haftalık check-in (ölçü, kilo, fotoğraf değerlendirmesi)",
  "İlerlemeye göre program revizyonu",
  "WhatsApp üzerinden destek ve günlük mesajlaşma",
  "Doğru form ve teknik rehberliği",
  "Gerekirse birebir video analiz",
  "Kısa ve uzun vadeli hedef belirleme",
  "Disiplin ve alışkanlık kazandırma",
  "Takviye (supplement) rehberliği",
]

export function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [open, setOpen] = useState<number | null>(1)

  return (
    <section id="programs" className="bg-[#050505] relative border-t border-white/5 overflow-hidden" ref={ref}>

      {/* Arka plan dekorasyon */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Başlık */}
        <motion.div
          className="flex items-end justify-between mb-16 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-display text-primary text-xs tracking-[0.4em] uppercase">Koçluk Paketleri</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none">
              PROGRAMINI<br />
              <span className="text-primary">SEÇ.</span>
            </h2>
          </div>
          <p className="hidden md:block text-gray-500 text-sm font-sans max-w-xs text-right leading-relaxed">
            Her paket, tüm koçluk özelliklerini içerir. Fark yalnızca süre ve dönüşüm derinliğindedir.
          </p>
        </motion.div>

        {/* Accordion satırları */}
        <div className="divide-y divide-white/8">
          {plans.map((plan, idx) => {
            const isOpen = open === idx
            return (
              <motion.div
                key={plan.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                {/* Satır başlığı — tıklanabilir */}
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className={`w-full text-left group transition-colors duration-300 ${
                    plan.highlight ? "bg-primary/5 hover:bg-primary/8" : "hover:bg-white/3"
                  }`}
                >
                  <div className="flex items-center gap-6 px-6 py-7">

                    {/* Numara */}
                    <span className={`font-display text-6xl md:text-8xl font-bold leading-none shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-primary" : "text-white/10 group-hover:text-white/20"
                    }`}>
                      {plan.num}
                    </span>

                    {/* İsim + etiket */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`font-display text-2xl md:text-4xl font-bold uppercase tracking-wide transition-colors ${
                          isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}>
                          {plan.name}
                        </span>
                        {plan.highlight && (
                          <span className="bg-primary text-black font-display text-[10px] tracking-[0.25em] uppercase px-3 py-1 font-bold shrink-0">
                            {plan.tag}
                          </span>
                        )}
                        {!plan.highlight && (
                          <span className="border border-white/15 text-gray-500 font-display text-[10px] tracking-[0.25em] uppercase px-3 py-1 shrink-0">
                            {plan.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm font-sans hidden sm:block">{plan.desc}</p>
                    </div>

                    {/* Fiyat */}
                    <div className="text-right shrink-0">
                      <div className="flex items-start justify-end gap-1">
                        <span className="text-gray-400 font-sans text-base mt-2">€</span>
                        <span className={`font-display text-5xl md:text-6xl font-bold leading-none transition-colors ${
                          isOpen ? "text-primary" : "text-white/60 group-hover:text-white"
                        }`}>
                          {plan.price}
                        </span>
                      </div>
                    </div>

                    {/* Açma oku */}
                    <div className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? "border-primary bg-primary text-black rotate-45" : "border-white/15 text-white/40 group-hover:border-white/40"
                    }`}>
                      <span className="text-lg leading-none font-light">+</span>
                    </div>
                  </div>
                </button>

                {/* Açılan özellik listesi */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={`px-6 pb-8 pt-2 border-t ${plan.highlight ? "border-primary/20" : "border-white/5"}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mb-8">
                      {features.map((feat, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: i * 0.04, duration: 0.3 }}
                        >
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.highlight ? "text-primary" : "text-white/40"}`} />
                          <span className="text-gray-400 text-xs font-sans leading-relaxed">{feat}</span>
                        </motion.div>
                      ))}
                    </div>
                    <button
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      className={`font-display text-sm uppercase tracking-[0.2em] px-8 py-3 transition-all duration-200 ${
                        plan.highlight
                          ? "bg-primary text-black hover:bg-white"
                          : "border border-white/20 text-white hover:border-white/60 hover:bg-white/5"
                      }`}
                    >
                      Bu Paketi Seç →
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
