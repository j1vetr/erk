import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Instagram, CheckCircle2 } from "lucide-react"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simüle edilmiş API isteği
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // 5 saniye sonra formu sıfırla
    setTimeout(() => {
      setIsSuccess(false)
      ;(e.target as HTMLFormElement).reset()
    }, 5000)
  }

  const InputClass = "w-full bg-[#111] border border-white/10 p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-sans text-lg placeholder:text-gray-600"
  const LabelClass = "block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest"

  return (
    <section id="contact" className="py-20 bg-black relative border-t border-white/5">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Sol: İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-display uppercase tracking-[0.3em] mb-3 flex items-center gap-3 text-xs">
              <span className="w-10 h-[2px] bg-primary block"></span> İLETİŞİME GEÇ
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold uppercase text-white mb-6 leading-[1.1]">
              ATEŞE ADIM <br/> <span className="text-primary">ATMAYA HAZIR MISIN?</span>
            </h3>
            <p className="text-gray-400 mb-10 text-sm md:text-base font-sans leading-relaxed">
              Bahane üretmeyi bırakıp harekete geçme vakti. Koçluk başvurusu için formu doldur. Sadece demire ve değişime adanmış kişilerle çalışıyorum. Kontenjanlar son derece sınırlıdır.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="bg-[#111] p-4 border border-white/10 group-hover:border-primary transition-colors">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-display uppercase tracking-[0.2em] mb-1">E-Posta</div>
                  <div className="font-sans text-xl text-white group-hover:text-primary transition-colors">info@erkforgecoaching.com</div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="bg-[#111] p-4 border border-white/10 group-hover:border-primary transition-colors">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-display uppercase tracking-[0.2em] mb-1">Telefon / WhatsApp</div>
                  <div className="font-sans text-xl text-white group-hover:text-primary transition-colors">+90 548 844 19 99</div>
                </div>
              </div>

              <a href="https://www.instagram.com/erk_ozkunt" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group cursor-pointer">
                <div className="bg-[#111] p-4 border border-white/10 group-hover:border-primary transition-colors">
                  <Instagram className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-display uppercase tracking-[0.2em] mb-1">Instagram</div>
                  <div className="font-sans text-xl text-white group-hover:text-primary transition-colors">@erk_ozkunt</div>
                </div>
              </a>

              <div className="flex items-start gap-6">
                <div className="bg-[#111] p-4 border border-white/10">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-display uppercase tracking-[0.2em] mb-1">Konum</div>
                  <div className="font-sans text-xl text-white">İstanbul, Türkiye <span className="block text-gray-500 text-base mt-1">(Tüm Dünya İçin Online Koçluk)</span></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sağ: İletişim Formu */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#050505] p-10 border border-white/10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary flex flex-col items-center justify-center text-black p-10 text-center z-20"
                >
                  <CheckCircle2 className="w-24 h-24 mb-6" />
                  <h4 className="font-display text-5xl uppercase font-bold mb-4">Mesaj Alındı</h4>
                  <p className="font-sans text-xl font-medium">Hedeflerin incelenecek ve sana en kısa sürede dönüş yapılacaktır. Demiri sıcak tut.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit} 
                  className="space-y-6 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={LabelClass}>Ad Soyad</label>
                      <input type="text" required className={InputClass} placeholder="Adın ve Soyadın" />
                    </div>
                    <div>
                      <label className={LabelClass}>Telefon Numarası</label>
                      <input type="tel" required className={InputClass} placeholder="05XX XXX XX XX" />
                    </div>
                  </div>

                  <div>
                    <label className={LabelClass}>E-Posta Adresi</label>
                    <input type="email" required className={InputClass} placeholder="ornek@email.com" />
                  </div>

                  <div>
                    <label className={LabelClass}>İlgilendiğin Program</label>
                    <div className="relative">
                      <select required className={`${InputClass} appearance-none`}>
                        <option value="" disabled selected>Program Seçiniz</option>
                        <option value="baslangic">Başlangıç Programı</option>
                        <option value="pro">Pro Forge Programı</option>
                        <option value="elit">Elit Demir Programı</option>
                        <option value="diger">Diğer / Kararsızım</option>
                      </select>
                      <ChevronDownSelect />
                    </div>
                  </div>

                  <div>
                    <label className={LabelClass}>Mevcut Durumun ve Hedeflerin</label>
                    <textarea 
                      required 
                      rows={4}
                      className={`${InputClass} resize-none`} 
                      placeholder="Şu anki kilon, boyun, spor geçmişin ve ulaşmak istediğin hedef nedir?"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black py-5 font-display text-2xl uppercase tracking-widest font-bold hover:bg-white transition-colors flex justify-center items-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        Gönderiliyor...
                      </>
                    ) : (
                      "Başvuruyu Gönder"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function ChevronDownSelect() {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  )
}
