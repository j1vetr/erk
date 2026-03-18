import { motion } from "framer-motion"
import { Quote, ArrowRight } from "lucide-react"

export function Testimonials() {
  const reviews = [
    {
      name: "Burak Yılmaz",
      age: 28,
      type: "Elit Demir Programı",
      quote: "Erk bahanelerimi tamamen yok etti. Sadece 5 kilo vermek için gelmiştim, 8 kilo saf kas kütlesi ve sarsılmaz bir mentalite ile ayrıldım. Verdiği program kesinlikle şaka değil.",
      emoji: "🔥",
      stats: "+8kg Kas Kütlesi"
    },
    {
      name: "Selin Kaya",
      age: 24,
      type: "Pro Forge Programı",
      quote: "Erk ile tanışana kadar sert antrenman yaptığımı sanıyordum. Yoğunluk ve toparlanma yaklaşımımı tamamen baştan programladı. Asla hayal edemediğim ağırlıkları kaldırıyorum.",
      emoji: "💪",
      stats: "-12kg Yağ Kaybı"
    },
    {
      name: "Deniz Arslan",
      age: 35,
      type: "Başlangıç Programı",
      quote: "Sadece beslenme stratejisi bile yatırıma değerdi. Gereksiz diyetler yok, popüler akımlar yok. Beni bir makineye dönüştüren, tamamen bilime dayalı bir yakıt planı.",
      emoji: "⚡",
      stats: "Vücut Yağı %18 -> %10"
    },
    {
      name: "Caner Demir",
      age: 31,
      type: "Pro Forge Programı",
      quote: "Yıllardır platodaydım ve gelişemiyordum. Erk'in periyotlaması sayesinde bench press 1RM değerim 3 ayda 20kg arttı. İnanılmaz bir koç.",
      emoji: "🦍",
      stats: "+20kg Bench Press"
    },
    {
      name: "Ayşe Çelik",
      age: 29,
      type: "Elit Demir Programı",
      quote: "İlk yarışmama Erk hocayla hazırlandım. Peak haftasında yaptığı ince ayarlar sayesinde podyuma hayatımın en iyi formuyla çıktım.",
      emoji: "🏆",
      stats: "Bikini Fitness 1.si"
    },
    {
      name: "Ozan Tekin",
      age: 42,
      type: "Başlangıç Programı",
      quote: "İş yoğunluğum arasında nasıl antrenman yapacağımı bilemiyordum. Yaşam tarzıma o kadar iyi entegre etti ki, artık sporu değil, sporsuz kalmayı zor buluyorum.",
      emoji: "⏱️",
      stats: "Sürdürülebilir Rutin"
    }
  ]

  // Sonsuz kaydırma için içeriği kopyalayalım
  const duplicatedReviews = [...reviews, ...reviews]

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
            BAŞARI <span className="text-gray-600">HİKAYELERİ</span>
          </motion.h3>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden flex pb-10">
        <motion.div 
          className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {duplicatedReviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-[#0A0A0A] p-8 border border-white/10 hover:border-primary/50 transition-colors flex flex-col group"
            >
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
                <span className="text-3xl">{review.emoji}</span>
              </div>
              
              <p className="text-gray-300 italic mb-8 flex-grow font-sans leading-relaxed text-lg">
                "{review.quote}"
              </p>
              
              <div className="bg-primary/10 border border-primary/20 p-3 mb-6 inline-block w-fit">
                <span className="text-primary font-display tracking-widest uppercase text-sm">SONUÇ: {review.stats}</span>
              </div>

              <div className="border-t border-white/10 pt-6 mt-auto">
                <h5 className="font-display font-bold text-white text-2xl tracking-wide uppercase">{review.name}, {review.age}</h5>
                <span className="text-gray-500 text-sm font-sans block mt-1">{review.type}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
