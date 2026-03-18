import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, ChevronRight, ArrowRight, Ruler, Scale, Info, CheckCircle2 } from "lucide-react"
import { SEO } from "@/hooks/useSEO"
import { Link } from "wouter"

const otherTools = [
  { name: "Kalori & TDEE", desc: "Günlük kalori ihtiyacın", href: "/araclar/kalori", icon: "🔥" },
  { name: "1RM Hesaplayıcı", desc: "Maksimum kaldırma gücün", href: "/araclar/1rm", icon: "🏋️" },
  { name: "Vücut Yağ Oranı", desc: "Yağ & kas kütleni öğren", href: "/araclar/vucut-analizi", icon: "📊" },
]

export default function BMIPage() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<{ bmi: string; category: string; color: string; bgColor: string; text: string; tip: string } | null>(null)
  const [showCTA, setShowCTA] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const scrollToResult = () => setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)

  const calculate = (h = height, w = weight, scroll = false) => {
    const hNum = parseFloat(h) / 100
    const wNum = parseFloat(w)
    if (hNum > 0 && wNum > 0) {
      const bmiValue = wNum / (hNum * hNum)
      const bmi = bmiValue.toFixed(1)
      let category = "", color = "", bgColor = "", text = "", tip = ""
      if (bmiValue < 18.5) {
        category = "Zayıf"; color = "text-blue-400"; bgColor = "border-blue-500/40"
        text = "Vücut kitle indeksin düşük. Kas kütlesi eklemek ve güçlenmek için kalori fazlası ile düzenli ağırlık antrenmanı başlatmalısın."
        tip = "Zayıf BMI değerleri genellikle kas kütlesi eksikliğine işaret eder. Kaliteli protein alımı ile başla."
      } else if (bmiValue < 25) {
        category = "Normal / İdeal"; color = "text-green-400"; bgColor = "border-green-500/40"
        text = "Harika! Boy-kilo oranın ideal seviyede. Hedefine göre kas geliştirme (bulk) veya tanımlama (definasyon) programı yapılabilir."
        tip = "İdeal BMI aralığındasın. Şimdi odaklanman gereken şey vücut kompozisyonu — yağ/kas oranı."
      } else if (bmiValue < 30) {
        category = "Fazla Kilolu"; color = "text-yellow-400"; bgColor = "border-yellow-500/40"
        text = "Hafif bir kalori açığı (%15-20) ve haftada 3-4 gün ağırlık antrenmanıyla yağ yakımına başlayabilirsin."
        tip = "BMI tek başına yeterli değil — kas kütlesi yüksek sporcular da bu aralıkta olabilir. Yağ oranı hesaplayıcını da dene."
      } else {
        category = "Obez"; color = "text-red-400"; bgColor = "border-red-500/40"
        text = "Sağlığın için yapılandırılmış bir beslenme programı ve düzenli egzersiz rutini başlatman gerekiyor. Profesyonel destek kritik."
        tip = "Bu aşamada tek başına ilerlemek zorlaşabilir. Kişisel koçluk, süreci çok daha hızlı ve güvenli yapacaktır."
      }
      setResult({ bmi, category, color, bgColor, text, tip })
      setShowCTA(true)
      if (scroll) scrollToResult()
    }
  }

  const bmiToPosition = (bmi: number) => Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100))

  const filed = height && weight

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="BMI Hesaplayıcı | Vücut Kitle İndeksi Hesapla"
        description="Boy ve kilona göre BMI değerini, sağlık kategorini ve ideal kilo aralığını öğren. Ücretsiz online BMI hesaplayıcı."
        canonical="/araclar/bmi"
      />
      <Navbar />

      {/* ── Dramatic Header ── */}
      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">BMI Hesaplayıcı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Calculator className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                BMI <span className="text-primary">Hesaplayıcı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                Vücut Kitle İndeksi — boy ve kilona göre genel sağlık durumunu değerlendir. Fitness yolculuğunun başlangıç noktası.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Hesaplama Süresi", val: "10 saniye" },
              { label: "Formül", val: "kg / m²" },
              { label: "Doğruluk", val: "Genel gösterge" },
            ].map((pill) => (
              <div key={pill.label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-white/50 font-sans">{pill.label}:</span>
                <span className="text-white font-sans font-medium">{pill.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                <h2 className="font-display text-lg uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/8">
                  Bilgilerini Gir
                </h2>

                {/* Step 1 */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold flex-shrink-0">1</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Boyun</label>
                    <Ruler className="w-4 h-4 text-primary/60 ml-auto" />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => { setHeight(e.target.value); calculate(e.target.value, weight) }}
                      placeholder="180"
                      className="w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-lg">cm</span>
                  </div>
                  <p className="text-white/35 font-sans text-xs mt-2 ml-10">Ayakkabısız, dik durarak ölçülmüş boyun</p>
                </div>

                {/* Step 2 */}
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold flex-shrink-0">2</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Kilonu</label>
                    <Scale className="w-4 h-4 text-primary/60 ml-auto" />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => { setWeight(e.target.value); calculate(height, e.target.value) }}
                      placeholder="80"
                      className="w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-lg">kg</span>
                  </div>
                  <p className="text-white/35 font-sans text-xs mt-2 ml-10">Sabah aç karnına ölçülmüş kilo tercih edilir</p>
                </div>

                <button
                  onClick={() => calculate(height, weight, true)}
                  disabled={!filed}
                  className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3"
                >
                  BMI Değerimi Hesapla
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* BMI Skalası */}
              <div className="bg-[#0D0D0D] border border-white/10 p-6">
                <h3 className="font-display text-xs uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary/50" />
                  BMI Referans Tablosu
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Zayıf", range: "< 18.5", color: "bg-blue-500" },
                    { label: "Normal", range: "18.5 – 24.9", color: "bg-green-500" },
                    { label: "Fazla Kilolu", range: "25 – 29.9", color: "bg-yellow-500" },
                    { label: "Obez", range: "≥ 30", color: "bg-red-500" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${row.color}`} />
                      <span className="text-white/70 font-sans text-sm flex-1">{row.label}</span>
                      <span className="text-white/40 font-display text-sm">{row.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Main result card */}
                    <div className={`bg-[#0D0D0D] border-2 ${result.bgColor} p-7 text-center shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">Senin BMI Değerin</div>
                      <div className={`text-8xl font-display font-bold ${result.color} mb-2 leading-none`}>
                        {result.bmi}
                      </div>
                      <div className={`font-display uppercase tracking-wider text-lg mb-5 ${result.color}`}>
                        {result.category}
                      </div>

                      {/* Visual BMI scale */}
                      <div className="mb-1">
                        <div className="relative h-3 rounded-full overflow-hidden mb-2" style={{
                          background: "linear-gradient(to right, #3b82f6 0%, #22c55e 30%, #eab308 65%, #ef4444 100%)"
                        }}>
                          <motion.div
                            initial={{ left: "0%" }}
                            animate={{ left: `${bmiToPosition(parseFloat(result.bmi))}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          />
                        </div>
                        <div className="flex justify-between text-white/25 font-sans text-[10px]">
                          <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                        </div>
                      </div>
                    </div>

                    {/* Interpretation */}
                    <div className="bg-[#0D0D0D] border border-white/10 p-5">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">Koç Yorumu</div>
                      <p className="text-white/75 font-sans text-sm leading-relaxed">{result.text}</p>
                    </div>

                    {/* Tip */}
                    <div className="bg-primary/8 border border-primary/25 p-4 flex gap-3">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-white/65 font-sans text-xs leading-relaxed">{result.tip}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#0D0D0D] border border-white/8 p-8 text-center min-h-[320px] flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/4 flex items-center justify-center mb-5">
                      <Calculator className="w-9 h-9 text-white/20" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-2">Sonuç Bekleniyor</div>
                    <p className="text-white/20 font-sans text-xs">Boy ve kilonu girdiğinde<br />sonuç burada görünecek</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Post-result CTA */}
          <AnimatePresence>
            {showCTA && result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    BMI Değerin <span className="text-primary">{result.bmi}</span> — Peki Ya Sonra?
                  </h3>
                  <p className="text-white/55 font-sans text-sm">
                    BMI tek başına yeterli değil. Kişisel koçlukla somut bir programa başla.
                  </p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    Ücretsiz Danışma Al <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other tools */}
          <div className="mt-14">
            <div className="text-white/30 font-display uppercase tracking-widest text-xs mb-5">Diğer Araçlar</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <div className="bg-[#0D0D0D] border border-white/8 hover:border-primary/40 p-5 transition-all duration-300 group cursor-pointer">
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="font-display text-white uppercase tracking-wider text-sm group-hover:text-primary transition-colors mb-1">{tool.name}</div>
                    <div className="text-white/35 font-sans text-xs">{tool.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
