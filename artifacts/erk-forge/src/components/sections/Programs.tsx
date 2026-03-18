import { motion } from "framer-motion"
import { Check, Flame, Zap, Crown } from "lucide-react"

export function Programs() {
  const plans = [
    {
      icon: <Zap className="w-10 h-10 text-gray-400 mb-6" />,
      name: "BAŞLANGIÇ",
      price: "1500",
      period: "₺ / aylık",
      desc: "Ateşe ilk adımını atanlar için temel disiplin.",
      features: [
        "Kişiselleştirilmiş Antrenman Programı", 
        "Temel Makro ve Kalori Planlaması", 
        "Aylık Form Kontrolü", 
        "E-posta Desteği",
        "Egzersiz Video Kütüphanesi"
      ],
      highlight: false
    },
    {
      icon: <Flame className="w-10 h-10 text-primary mb-6 drop-shadow-[0_0_10px_rgba(245,197,24,0.8)]" />,
      name: "PRO FORGE",
      price: "2500",
      period: "₺ / aylık",
      desc: "Ciddi hedefleri olan sporcular için kapsamlı koçluk.",
      features: [
        "İleri Seviye Antrenman Periyotlaması", 
        "Detaylı Kişiye Özel Beslenme Planı", 
        "Haftalık Form ve Gelişim Kontrolü", 
        "Sınırsız Video Form Analizi", 
        "Doğrudan WhatsApp İletişimi", 
        "Supplement Protokolleri"
      ],
      highlight: true
    },
    {
      icon: <Crown className="w-10 h-10 text-white mb-6" />,
      name: "ELİT DEMİR",
      price: "4000",
      period: "₺ / aylık",
      desc: "Fiziğinin sınırlarını zorlamak isteyen şampiyonlar için.",
      features: [
        "Pro Forge'daki Her Şey", 
        "Günlük Mikro Ayarlamalar", 
        "Yarışma / Peak Haftası Planlaması", 
        "Aylık 1x Canlı Görüntülü Görüşme", 
        "Kan Tahlili Analizi ve Yönlendirme", 
        "Öncelikli 7/24 Erişim"
      ],
      highlight: false
    }
  ]

  return (
    <section id="programs" className="py-32 relative bg-[#050505]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display uppercase tracking-[0.3em] mb-4 text-sm"
          >
            KOÇLUK SEVİYELERİ
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold uppercase"
          >
            SİLAHINI <span className="text-primary forge-glow">SEÇ</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative flex flex-col p-10 bg-[#0A0A0A] transition-all duration-300 ${
                plan.highlight 
                  ? "border-2 border-primary shadow-[0_0_30px_rgba(245,197,24,0.15)] z-10 scale-105" 
                  : "border border-white/5 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-display uppercase tracking-[0.2em] text-sm py-1.5 px-6 font-bold shadow-[0_0_15px_rgba(245,197,24,0.5)]">
                  EN POPÜLER
                </div>
              )}
              
              {plan.icon}

              <h4 className="font-display text-3xl font-bold uppercase mb-4 text-white tracking-wider">{plan.name}</h4>
              <p className="text-gray-400 text-base mb-8 h-12">{plan.desc}</p>
              
              <div className="mb-10 flex items-end gap-2 border-b border-white/10 pb-8">
                <span className="text-6xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 font-sans mb-2">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-5 mb-10">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-4 text-base text-gray-300">
                    <Check className={`w-6 h-6 shrink-0 ${plan.highlight ? 'text-primary' : 'text-gray-500'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 font-display text-xl tracking-widest uppercase transition-all duration-300 ${
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
