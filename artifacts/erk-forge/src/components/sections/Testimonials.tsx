import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function Testimonials() {
  const reviews = [
    {
      name: "Mert Doğan",
      age: 26,
      package: "8 Haftalık Program",
      packageTag: "Başlangıç",
      quote: "Daha önce 2 farklı koç denedim, ikisi de standart program gönderip kayboluverdi. Erk ilk haftadan farklıydı. 8 haftanın sonunda 6,5 kilo verdim ama asıl değişim kafa yapımda oldu.",
      stats: "−6,5 kg / 8 Hafta"
    },
    {
      name: "Nisan Yıldız",
      age: 33,
      package: "8 Haftalık Program",
      packageTag: "Başlangıç",
      quote: "İki çocukla haftada 3 gün spor yapabilmek bile mucizeydi. Erk programı hayatıma sığdırdı, uymam için zorlama yapmadı. 8 haftada ne yapılabilir diye düşünüyordum, yanılmışım.",
      stats: "−5 kg Yağ, +Enerji"
    },
    {
      name: "Kerem Arslan",
      age: 29,
      package: "12 Haftalık Program",
      packageTag: "En Popüler",
      quote: "1,5 yıldır aynı kiloyu kaldırıyordum. 12 haftanın 8. haftasında squat'ta 20 kilo artış gördüm. Erk'in periyotlama mantığını anlayınca her şey oturdu yerine.",
      stats: "+22 kg Squat 1RM"
    },
    {
      name: "Dilara Şahin",
      age: 27,
      package: "12 Haftalık Program",
      packageTag: "En Popüler",
      quote: "Sadece 'fit görünmek' istiyordum ama Erk hedefleri somutlaştırdı. Yağ oranım %28'den %19'a indi. Bunun için 12 hafta boyunca aç kalmadım, özel bir şey yemedim.",
      stats: "Yağ %28 → %19"
    },
    {
      name: "Selim Kaplan",
      age: 31,
      package: "16 Haftalık Program",
      packageTag: "Elite",
      quote: "İlk amatör yarışmama hazırlanıyordum. 16 haftalık süreçte her ölçüm, her fotoğraf takip edildi. Peak haftasında formumu görmek için sabah 5'te uyanmak zorunda kaldım, tahmin edersiniz neden.",
      stats: "İlk Yarışma — Fiz. Erkek 2."
    },
    {
      name: "Baran Çetin",
      age: 38,
      package: "16 Haftalık Program",
      packageTag: "Elite",
      quote: "Ofis hayatı, 38 yaş, bel fıtığı — spor yapamam diye geçiştiriyordum yıllarca. Erk'le başlamadan önce 'bu yaşta ne değişecek' dedim. 16 hafta sonra iş arkadaşlarım tanımadı.",
      stats: "−14 kg / Tam Vücut Dönüşümü"
    }
  ]

  const duplicatedReviews = [...reviews, ...reviews]

  const tagColors: Record<string, string> = {
    "Başlangıç": "border-white/20 text-white/60",
    "En Popüler": "border-primary/50 text-primary",
    "Elite": "border-white/30 text-white/80",
  }

  return (
    <section id="testimonials" className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display uppercase tracking-[0.3em] mb-3 text-xs"
          >
            ATEŞTE DÖVÜLENLER
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold uppercase text-white"
          >
            BAŞARI <span className="text-primary">HİKAYELERİ</span>
          </motion.h3>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden flex pb-10">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {duplicatedReviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[360px] md:w-[440px] flex-shrink-0 bg-[#0A0A0A] p-7 border border-white/10 hover:border-primary/40 transition-colors flex flex-col group"
            >
              <div className="flex justify-between items-start mb-5">
                <Quote className="w-8 h-8 text-primary/25 group-hover:text-primary/50 transition-colors" />
                <span className={`font-display text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 border ${tagColors[review.packageTag] ?? "border-white/20 text-white/50"}`}>
                  {review.package}
                </span>
              </div>

              <p className="text-white/75 mb-7 flex-grow font-sans leading-relaxed text-sm">
                "{review.quote}"
              </p>

              <div className="bg-primary/10 border border-primary/20 px-4 py-2 mb-5 w-fit">
                <span className="text-primary font-display tracking-widest uppercase text-xs">SONUÇ: {review.stats}</span>
              </div>

              <div className="border-t border-white/8 pt-5 mt-auto">
                <h5 className="font-display font-bold text-white text-xl tracking-wide uppercase">{review.name}, {review.age}</h5>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
