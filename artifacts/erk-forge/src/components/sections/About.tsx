import { motion, useInView } from "framer-motion"
import { Target, Flame, Shield, Award, ChevronRight } from "lucide-react"
import { useRef } from "react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    { title: "Kişiselleştirilmiş Yaklaşım", desc: "Senin metobolizmana ve yaşam tarzına özel stratejiler." },
    { title: "Bilimsel Temel", desc: "Kanıta dayalı antrenman ve beslenme protokolleri." },
    { title: "Sürekli Takip", desc: "Haftalık ve günlük form analizleri ile rotadan sapma yok." },
    { title: "Mental Dönüşüm", desc: "Sadece kasları değil, iradeyi de çelik gibi güçlendiriyoruz." },
  ]

  const StatBar = ({ label, percentage, delay }: { label: string, percentage: number, delay: number }) => (
    <div className="mb-6">
      <div className="flex justify-between font-display text-lg tracking-widest mb-2">
        <span className="text-white">{label}</span>
        <span className="text-primary">%{percentage}</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full bg-primary forge-glow relative"
        >
          <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-sm animate-[shimmer_2s_infinite]"></div>
        </motion.div>
      </div>
    </div>
  )

  return (
    <section id="about" className="py-20 bg-black relative border-t border-white/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl z-0 rounded-full" />
            <div className="relative z-10 border-2 border-white/5 bg-[#050505] p-2 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={`${import.meta.env.BASE_URL}images/coach-portrait.jpg`} 
                alt="Koç Erk" 
                className="w-full h-auto object-cover object-top"
              />
            </div>
            
            {/* Floating stats badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-black p-6 z-20 border-l-4 border-l-primary shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <Award className="w-12 h-12 text-primary" />
                <div>
                  <div className="text-xl font-display font-bold text-white tracking-widest">ISSA SERTİFİKALI</div>
                  <div className="text-sm font-sans text-gray-400">Master Trainer</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-display uppercase tracking-[0.3em] mb-4 flex items-center gap-4 text-sm">
              <span className="w-12 h-[2px] bg-primary block"></span> Demir Ustası
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-[0.95]">
              PROGRAM YAZMIYORUM.<br/>
              <span className="text-gray-500">SİLAH ÜRETİYORUM.</span>
            </h3>
            
            <div className="space-y-4 text-gray-400 text-sm md:text-base mb-10 font-sans font-light leading-relaxed">
              <p>
                Demir ocağına hoş geldin. Benim adım Erk ve felsefem çok basit: Zayıf metal kırılır, güçlü demir dayanır. Sıradanlıktan sıkılmış, sınırlarını zorlamaya hazır bireyleri alıyor; onları fiziksel ve mental zirvelerine ulaştırıyorum.
              </p>
              <p>
                Bu 30 günlük geçici bir çözüm değil. Bu; nasıl antrenman yaptığının, nasıl beslendiğinin ve nasıl düşündüğünün baştan aşağı yeniden inşa edilmesidir. Eğer rahatlık arıyorsan, yanlış yerdesin. Eğer sonuç arıyorsan, koçunu buldun.
              </p>
            </div>

            <div className="mb-8">
              <StatBar label="BESLENME BİLİMİ" percentage={95} delay={0.2} />
              <StatBar label="ANTRENMAN PROTOKOLÜ" percentage={98} delay={0.4} />
              <StatBar label="MENTAL DİRENÇ" percentage={100} delay={0.6} />
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-sm">
              <h4 className="font-display text-lg text-white mb-5 tracking-widest border-b border-white/10 pb-3">Neden Ben?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3">
                    <ChevronRight className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h5 className="text-white font-display tracking-wider text-lg">{feature.title}</h5>
                      <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
