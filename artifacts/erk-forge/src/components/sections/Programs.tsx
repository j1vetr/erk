import { motion } from "framer-motion"
import { Check, Flame, Zap, Crown } from "lucide-react"

export function Programs() {
  const plans = [
    {
      icon: <Zap className="w-10 h-10 text-gray-400 mb-6" />,
      name: "8 HAFTA",
      duration: "8 Haftalık Program",
      price: "135",
      period: "€",
      desc: "Temeli sağlam atmak isteyenler için güçlü bir başlangıç.",
      features: [
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
        "Takviye (supplement) rehberliği"
      ],
      highlight: false
    },
    {
      icon: <Flame className="w-10 h-10 text-primary mb-6 drop-shadow-[0_0_10px_rgba(245,197,24,0.8)]" />,
      name: "12 HAFTA",
      duration: "12 Haftalık Program",
      price: "170",
      period: "€",
      desc: "Kalıcı dönüşüm için en çok tercih edilen program.",
      features: [
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
        "Takviye (supplement) rehberliği"
      ],
      highlight: true
    },
    {
      icon: <Crown className="w-10 h-10 text-white mb-6" />,
      name: "16 HAFTA",
      duration: "16 Haftalık Program",
      price: "200",
      period: "€",
      desc: "Fiziğinin sınırlarını zorlamak isteyen kararlı sporcular için.",
      features: [
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
        "Takviye (supplement) rehberliği"
      ],
      highlight: false
    }
  ]

  return (
    <section id="programs" className="py-20 relative bg-[#050505]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display uppercase tracking-[0.3em] mb-3 text-xs"
          >
            KOÇLUK PAKETLERİ
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold uppercase"
          >
            PROGRAMINI <span className="text-primary">SEÇ</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col p-8 bg-[#0A0A0A] transition-all duration-300 ${
                plan.highlight 
                  ? "border-2 border-primary shadow-[0_0_20px_rgba(245,197,24,0.12)] z-10 lg:scale-[1.03]" 
                  : "border border-white/5 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-display uppercase tracking-[0.2em] text-xs py-1 px-5 font-bold">
                  EN POPÜLER
                </div>
              )}
              
              {plan.icon}

              <h4 className="font-display text-2xl font-bold uppercase mb-1 text-white tracking-wider">{plan.name}</h4>
              <p className="text-primary/70 font-display text-xs uppercase tracking-widest mb-3">{plan.duration}</p>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              
              <div className="mb-6 flex items-end gap-1 border-b border-white/10 pb-6">
                <span className="text-gray-400 font-sans text-xl mb-1">{plan.period}</span>
                <span className="text-5xl font-display font-bold text-white leading-none">{plan.price}</span>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-primary' : 'text-gray-500'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 font-display text-sm tracking-widest uppercase transition-all duration-300 ${
                  plan.highlight 
                    ? "bg-primary text-black hover:bg-white" 
                    : "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white"
                }`}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                HEMEN SEÇ
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
