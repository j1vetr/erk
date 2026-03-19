import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, ChevronRight, ArrowRight, Ruler, Scale, Info, CheckCircle2 } from "lucide-react"
import { SEO } from "@/hooks/useSEO"
import { Link } from "wouter"
import { useLanguage } from "@/i18n/LanguageContext"

export default function BMIPage() {
  const { t, lang } = useLanguage()
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
        category = t.bmi.categories[0]; color = "text-blue-400"; bgColor = "border-blue-500/40"
        text = lang === "en"
          ? "Your Body Mass Index is low. You should start a calorie surplus with regular strength training to add muscle mass and get stronger."
          : "Vücut kitle indeksin düşük. Kas kütlesi eklemek ve güçlenmek için kalori fazlası ile düzenli ağırlık antrenmanı başlatmalısın."
        tip = lang === "en"
          ? "Low BMI values usually indicate a lack of muscle mass. Start with quality protein intake."
          : "Zayıf BMI değerleri genellikle kas kütlesi eksikliğine işaret eder. Kaliteli protein alımı ile başla."
      } else if (bmiValue < 25) {
        category = t.bmi.categories[1]; color = "text-green-400"; bgColor = "border-green-500/40"
        text = lang === "en"
          ? "Great! Your height-to-weight ratio is at an ideal level. Depending on your goal, you can pursue a muscle-building (bulk) or definition (cut) program."
          : "Harika! Boy-kilo oranın ideal seviyede. Hedefine göre kas geliştirme (bulk) veya tanımlama (definasyon) programı yapılabilir."
        tip = lang === "en"
          ? "You're in the ideal BMI range. Now focus on body composition — your fat-to-muscle ratio."
          : "İdeal BMI aralığındasın. Şimdi odaklanman gereken şey vücut kompozisyonu — yağ/kas oranı."
      } else if (bmiValue < 30) {
        category = t.bmi.categories[2]; color = "text-yellow-400"; bgColor = "border-yellow-500/40"
        text = lang === "en"
          ? "You can start fat loss with a slight calorie deficit (15–20%) and 3–4 days of strength training per week."
          : "Hafif bir kalori açığı (%15-20) ve haftada 3-4 gün ağırlık antrenmanıyla yağ yakımına başlayabilirsin."
        tip = lang === "en"
          ? "BMI alone is not enough — athletes with high muscle mass can also be in this range. Try the body fat calculator too."
          : "BMI tek başına yeterli değil — kas kütlesi yüksek sporcular da bu aralıkta olabilir. Yağ oranı hesaplayıcını da dene."
      } else {
        category = t.bmi.categories[3]; color = "text-red-400"; bgColor = "border-red-500/40"
        text = lang === "en"
          ? "For your health, you need to start a structured nutrition program and regular exercise routine. Professional support is critical."
          : "Sağlığın için yapılandırılmış bir beslenme programı ve düzenli egzersiz rutini başlatman gerekiyor. Profesyonel destek kritik."
        tip = lang === "en"
          ? "Progressing alone at this stage can be difficult. Personal coaching will make the process much faster and safer."
          : "Bu aşamada tek başına ilerlemek zorlaşabilir. Kişisel koçluk, süreci çok daha hızlı ve güvenli yapacaktır."
      }
      setResult({ bmi, category, color, bgColor, text, tip })
      setShowCTA(true)
      if (scroll) scrollToResult()
    }
  }

  const bmiToPosition = (bmi: number) => Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100))

  const filed = height && weight

  const otherTools = [
    { name: t.toolsHub.tools[1].title, desc: t.toolsHub.tools[1].desc, href: "/araclar/kalori", icon: "🔥" },
    { name: t.toolsHub.tools[2].title, desc: t.toolsHub.tools[2].desc, href: "/araclar/1rm", icon: "🏋️" },
    { name: t.toolsHub.tools[3].title, desc: t.toolsHub.tools[3].desc, href: "/araclar/vucut-analizi", icon: "📊" },
  ]

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title={lang === "en" ? "BMI Calculator | Calculate Body Mass Index" : "BMI Hesaplayıcı | Vücut Kitle İndeksi Hesapla"}
        description={lang === "en"
          ? "Calculate your BMI, health category and ideal weight range based on height and weight. Free online BMI calculator."
          : "Boy ve kilona göre BMI değerini, sağlık kategorini ve ideal kilo aralığını öğren. Ücretsiz online BMI hesaplayıcı."}
        canonical="/araclar/bmi"
      />
      <Navbar />

      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">
              {lang === "en" ? "Tools" : "Araçlar"}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">{lang === "en" ? "BMI Calculator" : "BMI Hesaplayıcı"}</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Calculator className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                BMI <span className="text-primary">{lang === "en" ? "Calculator" : "Hesaplayıcı"}</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                {lang === "en"
                  ? "Body Mass Index — assess your general health based on height and weight. The starting point of your fitness journey."
                  : "Vücut Kitle İndeksi — boy ve kilona göre genel sağlık durumunu değerlendir. Fitness yolculuğunun başlangıç noktası."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: lang === "en" ? "Calculation Time" : "Hesaplama Süresi", val: lang === "en" ? "10 seconds" : "10 saniye" },
              { label: lang === "en" ? "Formula" : "Formül", val: "kg / m²" },
              { label: lang === "en" ? "Accuracy" : "Doğruluk", val: lang === "en" ? "General indicator" : "Genel gösterge" },
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

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                <h2 className="font-display text-lg uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/8">
                  {lang === "en" ? "Enter Your Details" : "Bilgilerini Gir"}
                </h2>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold flex-shrink-0">1</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">
                      {lang === "en" ? "Height" : "Boyun"}
                    </label>
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
                  <p className="text-white/35 font-sans text-xs mt-2 ml-10">
                    {lang === "en" ? "Measured barefoot, standing straight" : "Ayakkabısız, dik durarak ölçülmüş boyun"}
                  </p>
                </div>

                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold flex-shrink-0">2</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">
                      {lang === "en" ? "Weight" : "Kilonu"}
                    </label>
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
                  <p className="text-white/35 font-sans text-xs mt-2 ml-10">
                    {lang === "en" ? "Preferred fasted in the morning" : "Sabah aç karnına ölçülmüş kilo tercih edilir"}
                  </p>
                </div>

                <button
                  onClick={() => calculate(height, weight, true)}
                  disabled={!filed}
                  className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3"
                >
                  {lang === "en" ? "Calculate My BMI" : "BMI Değerimi Hesapla"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#0D0D0D] border border-white/10 p-6">
                <h3 className="font-display text-xs uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary/50" />
                  {lang === "en" ? "BMI Reference Table" : "BMI Referans Tablosu"}
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: t.bmi.categories[0], range: "< 18.5", color: "bg-blue-500" },
                    { label: t.bmi.categories[1], range: "18.5 – 24.9", color: "bg-green-500" },
                    { label: t.bmi.categories[2], range: "25 – 29.9", color: "bg-yellow-500" },
                    { label: t.bmi.categories[3], range: "≥ 30", color: "bg-red-500" },
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

            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className={`bg-[#0D0D0D] border-2 ${result.bgColor} p-7 text-center shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">
                        {t.bmi.resultLabel}
                      </div>
                      <div className={`text-8xl font-display font-bold ${result.color} mb-2 leading-none`}>
                        {result.bmi}
                      </div>
                      <div className={`font-display uppercase tracking-wider text-lg mb-5 ${result.color}`}>
                        {result.category}
                      </div>

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

                    <div className="bg-[#0D0D0D] border border-white/10 p-5">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">
                        {lang === "en" ? "Coach Commentary" : "Koç Yorumu"}
                      </div>
                      <p className="text-white/75 font-sans text-sm leading-relaxed">{result.text}</p>
                    </div>

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
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-2">
                      {lang === "en" ? "Awaiting Result" : "Sonuç Bekleniyor"}
                    </div>
                    <p className="text-white/20 font-sans text-xs">
                      {lang === "en"
                        ? "Enter your height and weight to see your result"
                        : "Boy ve kilonu girdiğinde sonuç burada görünecek"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {showCTA && result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">
                    {lang === "en" ? "Next Step" : "Sonraki Adım"}
                  </div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    {lang === "en" ? "Your BMI is" : "BMI Değerin"} <span className="text-primary">{result.bmi}</span> — {lang === "en" ? "What's Next?" : "Peki Ya Sonra?"}
                  </h3>
                  <p className="text-white/55 font-sans text-sm">
                    {lang === "en"
                      ? "BMI alone isn't enough. Start a concrete program with personal coaching."
                      : "BMI tek başına yeterli değil. Kişisel koçlukla somut bir programa başla."}
                  </p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    {lang === "en" ? "Get Free Consultation" : "Ücretsiz Danışma Al"} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-14">
            <div className="text-white/30 font-display uppercase tracking-widest text-xs mb-5">{t.shared.otherTools}</div>
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
