import { useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { Plus, Minus, ArrowRight } from "lucide-react"

const faqs = [
  {
    q: "Online koçluk yüz yüze kadar etkili mi?",
    a: "Büyük çoğunluk için evet — hatta daha etkili. Yüz yüze eğitimde sporcunun koçuna erişimi haftada birkaç saatken, online koçlukta WhatsApp üzerinden her gün iletişim halindeyiz. Form videolarını izliyor, haftalık ölçümlerini analiz ediyor ve programı anlık olarak revize ediyorum. Yüz yüze olduğunda kaçırdığım şeyleri online'da yakalıyorum.",
  },
  {
    q: "Hangi programı seçmeliyim?",
    a: "8 hafta doğru alışkanlıkları kurmak için idealdir. Kalıcı bir dönüşüm hedefliyorsan ve disiplinini kanıtlamışsan 12 hafta en mantıklı seçenek — danışanlarımın büyük çoğunluğu bu paketi tercih ediyor. 16 hafta ise rekabetçi bir hedefe ya da dramatik bir dönüşüme ihtiyaç duyanlar için. Emin değilsen başvuru formunu doldur; görüşmede birlikte kararlaştıralım.",
  },
  {
    q: "Programa başlamak için ne kadar spor geçmişine ihtiyacım var?",
    a: "Sıfır. Geçmişin ne olursa olsun programa entegre ediliyor. Tamamen başlangıç seviyesindeki danışanlar için sistem kurulumu daha önce gelir — hızlı sonuç değil, sürdürülebilir alışkanlık. Geçmişin varsa da sıfırdan başlatıyorum; çünkü kötü alışkanlıkları silmek yenisini öğretmekten bazen daha önemli.",
  },
  {
    q: "Ödeme nasıl yapılır?",
    a: "Görüşme sonrasında sana ödeme bilgileri iletilir. Havale veya EFT ile tek seferlik ödeme yapılır. Program başlamadan önce ödeme tamamlanmış olmalıdır. Taksit veya kısmi ödeme şu an için mevcut değil.",
  },
  {
    q: "Programda beslenme planı da var mı?",
    a: "Evet — her paketin içinde kişiselleştirilmiş kalori ve makro hesabı, sürdürülebilir beslenme planı ve takviye rehberi yer alıyor. Diyet listeleri değil, mantığını anlayacağın bir beslenme çerçevesi sunuyorum. Böylece program bittikten sonra da bağımsız hareket edebiliyorsun.",
  },
  {
    q: "Haftalık check-in nasıl işliyor?",
    a: "Her hafta aynı gün tartı, ölçü ve fotoğraflarını WhatsApp üzerinden paylaşıyorsun. Ben bunları analiz edip yazılı geri bildirim veriyorum, gerekli durumlarda programı revize ediyorum. İlerleme duruyorsa ya da gidişat beklediğimizin dışındaysa müdahale anında oluyor.",
  },
  {
    q: "Seyahat etsem veya yoğun bir dönemim olsa ne olur?",
    a: "Program sana ayarlanır, sen programa değil. İş seyahati, tatil ya da yoğun dönemler için 'minimum hasar' protokolleri hazırlıyorum. Sıfır egzersiz ve serbest beslenme yerine, mevcut koşulda yapılabilecek en iyi planı sunuyorum.",
  },
  {
    q: "Kontenjan gerçekten sınırlı mı?",
    a: "Evet. Aynı anda aldığım danışan sayısını bilerek az tutuyorum çünkü her birine verdiğim dikkat ve hız benim için öncelik. Kontenjan dolunca yeni başvuruları bekleme listesine alıyorum. Bu yüzden ilgini şimdi belirtmeni tavsiye ederim.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="faq" className="bg-black border-t border-white/5 py-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">

          {/* Sol: başlık sabit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-primary" />
              <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">SSS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight mb-5">
              AKLINDA <br /><span className="text-primary">SORULAR</span><br />MI VAR?
            </h2>
            <p className="text-white/40 font-sans text-sm leading-relaxed mb-8">
              En sık sorulan sorulara cevap veriyorum. Yanıtını bulamazsan doğrudan iletişime geç.
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 text-primary font-display tracking-widest uppercase text-xs border-b border-primary/30 pb-1.5 hover:border-primary hover:gap-3 transition-all duration-300"
            >
              Bana Sor <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Sağ: accordion listesi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            {faqs.map((faq, idx) => {
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
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5" />
                        : <Plus className="w-3.5 h-3.5" />
                      }
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
                          <p className="text-white/55 font-sans text-sm leading-relaxed">
                            {faq.a}
                          </p>
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
