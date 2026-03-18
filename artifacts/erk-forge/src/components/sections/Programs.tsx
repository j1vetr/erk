import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    duration: "8",
    label: "8 Haftalık Program",
    tag: "Başlangıç",
    price: "135",
    desc: "Temeli sağlam atmak isteyenler için güçlü bir başlangıç. Doğru alışkanlıkları kazanacak, vücudunu tanıyacak ve ilk gerçek dönüşümünü yaşayacaksın.",
    highlight: false,
  },
  {
    duration: "12",
    label: "12 Haftalık Program",
    tag: "En Popüler",
    price: "170",
    desc: "Kalıcı dönüşüm için en çok tercih edilen program. Yeterli süre, yeterli baskı, maksimum sonuç. Çoğu danışan bu paketle hedefine ulaşır.",
    highlight: true,
  },
  {
    duration: "16",
    label: "16 Haftalık Program",
    tag: "Elite",
    price: "200",
    desc: "Fiziğinin sınırlarını zorlamak isteyen kararlı sporcular için. Derinlemesine program revizyonu, ileri düzey optimizasyon ve uzun vadeli alışkanlık inşası.",
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
  const [selected, setSelected] = useState(1)
  const plan = plans[selected]

  return (
    <section id="programs" className="bg-[#050505] border-t border-white/5 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Başlık ── */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">Koçluk Paketleri</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none mb-4">
            KAÇA HAFTA <span className="text-primary">ÇALIŞIYORUZ?</span>
          </h2>
          <p className="text-gray-500 text-sm font-sans max-w-lg mx-auto">
            Her pakette aynı koçluk kalitesi, aynı 11 özellik sunulur. Yalnızca süre değişir — süre arttıkça dönüşüm derinleşir.
          </p>
        </div>

        {/* ── Tab seçici ── */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {plans.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative text-center py-6 px-4 border transition-all duration-300 group ${
                selected === i
                  ? p.highlight
                    ? "bg-primary border-primary"
                    : "bg-white/8 border-white/40"
                  : "bg-transparent border-white/10 hover:border-white/30"
              }`}
            >
              {p.highlight && selected !== i && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black font-display text-[9px] tracking-[0.25em] uppercase px-3 py-0.5 font-bold">
                  {p.tag}
                </div>
              )}
              {selected === i && p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-primary font-display text-[9px] tracking-[0.25em] uppercase px-3 py-0.5 font-bold border border-primary">
                  {p.tag}
                </div>
              )}
              <div className={`font-display text-5xl md:text-7xl font-bold leading-none mb-1 transition-colors ${
                selected === i
                  ? p.highlight ? "text-black" : "text-primary"
                  : "text-white/25 group-hover:text-white/50"
              }`}>
                {p.duration}
              </div>
              <div className={`font-display text-sm tracking-[0.3em] uppercase mb-3 transition-colors ${
                selected === i
                  ? p.highlight ? "text-black/70" : "text-white"
                  : "text-white/30 group-hover:text-white/50"
              }`}>
                HAFTA
              </div>
              <div className={`font-display text-xl font-bold transition-colors ${
                selected === i
                  ? p.highlight ? "text-black" : "text-primary"
                  : "text-white/40 group-hover:text-white/60"
              }`}>
                €{p.price}
              </div>
            </button>
          ))}
        </div>

        {/* ── Detay paneli ── */}
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

              {/* Sol: paket özeti */}
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
                  <p className="text-gray-400 text-sm font-sans leading-relaxed mb-8">
                    {plan.desc}
                  </p>
                </div>

                <div>
                  <div className="flex items-end gap-2 mb-6 pb-6 border-b border-white/8">
                    <span className="text-gray-400 text-lg mb-1 font-sans">€</span>
                    <span className="font-display text-6xl font-bold text-white leading-none">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm font-sans mb-2">/ tek seferlik</span>
                  </div>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className={`w-full flex items-center justify-center gap-2 py-4 font-display text-sm tracking-[0.2em] uppercase font-bold transition-all duration-200 group ${
                      plan.highlight
                        ? "bg-primary text-black hover:bg-white"
                        : "bg-white/8 border border-white/20 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Bu Paketi Seç
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Sağ: özellik listesi */}
              <div className="lg:col-span-3 p-8">
                <div className="font-display text-xs text-gray-500 tracking-[0.35em] uppercase mb-6">
                  Bu pakette neler var?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feat, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className={`w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlight ? "text-primary" : "text-white/40"
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-xs font-sans leading-relaxed">{feat}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 text-xs font-sans mt-6 pt-5 border-t border-white/5">
                  Tüm paketler aynı özellikleri içerir. Süre farkı; dönüşümün derinliğini ve program revizyonu sayısını belirler.
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
