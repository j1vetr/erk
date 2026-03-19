import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, ChevronRight, ArrowRight, Info, CheckCircle2, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { SEO } from "@/hooks/useSEO"
import { Link } from "wouter"
import { useLanguage } from "@/i18n/LanguageContext"

const activityValues = ["1.2", "1.375", "1.55", "1.725", "1.9"]
const activityIcons = ["🪑", "🚶", "🏃", "⚡", "🔥"]

export default function CaloriePage() {
  const { t, lang } = useLanguage()

  const otherTools = [
    { name: t.toolsHub.tools[0].title, desc: t.toolsHub.tools[0].desc, href: "/araclar/bmi", icon: "📏" },
    { name: t.toolsHub.tools[2].title, desc: t.toolsHub.tools[2].desc, href: "/araclar/1rm", icon: "🏋️" },
    { name: t.toolsHub.tools[3].title, desc: t.toolsHub.tools[3].desc, href: "/araclar/vucut-analizi", icon: "📊" },
  ]
  const [step, setStep] = useState(1)
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("erkek")
  const [activity, setActivity] = useState("")
  const [result, setResult] = useState<{ tdee: number; bmr: number; cut: number; bulk: number } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const activityLevels = t.calorie.activityLevels.map((lvl, i) => ({
    val: activityValues[i],
    icon: activityIcons[i],
    label: lvl.label,
    desc: lvl.desc,
  }))

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age)
    if (w > 0 && h > 0 && a > 0 && activity) {
      let bmr = (10 * w) + (6.25 * h) - (5 * a)
      bmr += gender === "erkek" ? 5 : -161
      const tdee = Math.round(bmr * parseFloat(activity))
      setResult({ bmr: Math.round(bmr), tdee, cut: tdee - 500, bulk: tdee + 300 })
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)
    }
  }

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-xl font-display text-center outline-none transition-all placeholder:text-white/20"

  const stepValid = {
    1: gender !== "",
    2: age !== "" && weight !== "" && height !== "",
    3: activity !== "",
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title={lang === "en" ? "Daily Calorie & TDEE Calculator | Erk Forge" : "Günlük Kalori & TDEE Hesaplayıcı | Erk Forge"}
        description={lang === "en"
          ? "Calculate your daily calorie needs (TDEE) based on age, height, weight and activity level. Custom calorie targets for cut, bulk and maintenance."
          : "Yaşına, boyuna, kilona ve aktivite seviyene göre günlük kalori ihtiyacını (TDEE) hesapla. Cut, bulk ve idame için özel kalori hedefleri."}
        canonical="/araclar/kalori"
      />
      <Navbar />

      {/* ── Dramatic Header ── */}
      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/6 via-primary/6 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">
              {lang === "en" ? "Tools" : "Araçlar"}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Kalori & TDEE</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Flame className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                {lang === "en" ? "Calorie &" : "Kalori &"} <span className="text-primary">TDEE</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                {lang === "en"
                  ? "Calculate your daily energy expenditure. Learn exactly what you need to burn fat, maintain weight or build muscle."
                  : "Günlük enerji harcamanı hesapla. Yağ yakmak, kilo korumak veya kas kazanmak için tam ihtiyacını öğren."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: lang === "en" ? "Formula" : "Formül", val: "Mifflin-St Jeor" },
              { label: lang === "en" ? "Calculation" : "Hesaplama", val: "BMR × Aktivite" },
              { label: lang === "en" ? "Output" : "Çıktı", val: lang === "en" ? "3 Scenarios" : "3 Senaryo" },
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
          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => s < step || (stepValid[s as 1|2|3]) ? setStep(s) : null}
                  className={`w-8 h-8 rounded-full font-display text-sm font-bold flex items-center justify-center transition-all ${
                    step === s ? "bg-primary text-black" :
                    s < step ? "bg-primary/30 text-primary border border-primary/50 cursor-pointer hover:bg-primary/50" :
                    "bg-white/8 text-white/30 cursor-default"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                </button>
                <span className={`font-display text-xs uppercase tracking-wider hidden sm:block ${step === s ? "text-white" : "text-white/30"}`}>
                  {s === 1 ? (lang === "en" ? "Gender" : "Cinsiyet") : s === 2 ? (lang === "en" ? "Details" : "Bilgiler") : (lang === "en" ? "Activity" : "Aktivite")}
                </span>
                {s < 3 && <div className={`w-8 h-px ${s < step ? "bg-primary/50" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">

                {/* Step 1: Cinsiyet */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="font-display text-lg uppercase tracking-widest text-white mb-2">{t.calorie.step1}</h2>
                      <p className="text-white/40 font-sans text-sm mb-7">
                        {lang === "en" ? "Basal metabolic rate calculation varies by gender." : "Bazal metabolizma hesabı cinsiyete göre farklılaşır."}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {["erkek", "kadin"].map((g) => (
                          <button
                            key={g}
                            onClick={() => setGender(g)}
                            className={`py-8 border-2 font-display text-xl uppercase tracking-widest transition-all duration-200 flex flex-col items-center gap-3 ${
                              gender === g ? "bg-primary/15 border-primary text-primary shadow-[0_0_20px_rgba(245,197,24,0.15)]" : "bg-black border-white/15 text-white/50 hover:border-white/40"
                            }`}
                          >
                            <span className="text-4xl">{g === "erkek" ? "👨" : "👩"}</span>
                            {g === "erkek" ? t.shared.male : t.shared.female}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setStep(2)} className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all flex items-center justify-center gap-3">
                        {t.calorie.next} <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="font-display text-lg uppercase tracking-widest text-white mb-2">{t.calorie.step2}</h2>
                      <p className="text-white/40 font-sans text-sm mb-7">
                        {lang === "en" ? "The more accurate the data, the more precise the result." : "Hesap ne kadar doğru olursa, sonuç o kadar isabetli olur."}
                      </p>
                      <div className="space-y-5 mb-7">
                        <div>
                          <label className="block text-primary font-display text-xs tracking-widest uppercase mb-2">{t.shared.age}</label>
                          <div className="relative">
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="28" className={inputClass} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">{t.shared.years}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-primary font-display text-xs tracking-widest uppercase mb-2">{t.shared.weight}</label>
                            <div className="relative">
                              <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="80" className={inputClass} />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">{t.shared.kg}</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-primary font-display text-xs tracking-widest uppercase mb-2">{t.shared.height}</label>
                            <div className="relative">
                              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="180" className={inputClass} />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">{t.shared.cm}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="px-5 py-4 border border-white/20 text-white/50 font-display text-sm uppercase tracking-widest hover:border-white/50 transition-all">
                          {t.calorie.back}
                        </button>
                        <button onClick={() => setStep(3)} disabled={!stepValid[2]} className="flex-1 bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                          {t.calorie.next} <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Activity */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="font-display text-lg uppercase tracking-widest text-white mb-2">{t.calorie.step3}</h2>
                      <p className="text-white/40 font-sans text-sm mb-6">
                        {lang === "en" ? "This choice impacts the result the most — be honest." : "Bu seçim sonucu en çok etkileyen faktör — dürüst ol."}
                      </p>
                      <div className="space-y-2.5 mb-7">
                        {activityLevels.map((lvl) => (
                          <button
                            key={lvl.val}
                            onClick={() => setActivity(lvl.val)}
                            className={`w-full flex items-center gap-4 p-4 border text-left transition-all duration-200 ${
                              activity === lvl.val ? "bg-primary/15 border-primary" : "bg-black border-white/10 hover:border-white/30"
                            }`}
                          >
                            <span className="text-2xl">{lvl.icon}</span>
                            <div className="flex-1">
                              <div className={`font-display text-sm uppercase tracking-widest ${activity === lvl.val ? "text-primary" : "text-white/80"}`}>
                                {lvl.label}
                              </div>
                              <div className="text-white/35 font-sans text-xs mt-0.5">{lvl.desc}</div>
                            </div>
                            {activity === lvl.val && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(2)} className="px-5 py-4 border border-white/20 text-white/50 font-display text-sm uppercase tracking-widest hover:border-white/50 transition-all">
                          {t.calorie.back}
                        </button>
                        <button onClick={calculate} disabled={!activity} className="flex-1 bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,197,24,0.25)]">
                          {t.calorie.showResult} <Flame className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    {/* Maintenance */}
                    <div className="bg-[#0D0D0D] border-2 border-primary p-6 text-center shadow-[0_0_30px_rgba(245,197,24,0.12)]">
                      <div className="flex items-center justify-center gap-2 text-primary font-display tracking-widest uppercase text-xs mb-3">
                        <Minus className="w-4 h-4" /> {t.calorie.daily}
                      </div>
                      <div className="text-6xl font-display font-bold text-white mb-1">{result.tdee}</div>
                      <div className="text-white/40 font-sans text-xs">kcal / {lang === "en" ? "day" : "gün"}</div>
                      <div className="mt-4 pt-4 border-t border-white/8 text-white/35 font-sans text-xs">
                        {t.calorie.bmrLabel}: <span className="text-white/70">{result.bmr} kcal</span>
                      </div>
                    </div>
                    {/* Cut */}
                    <div className="bg-[#0D0D0D] border border-red-500/30 p-5 flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-500/15 flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-red-400 font-display text-xs uppercase tracking-widest mb-0.5">{t.calorie.cut} (−500)</div>
                        <div className="text-white font-sans text-xs text-white/50">{lang === "en" ? "For fat loss" : "Yağ yakımı için"}</div>
                      </div>
                      <div className="font-display text-2xl text-white">{result.cut}</div>
                    </div>
                    {/* Bulk */}
                    <div className="bg-[#0D0D0D] border border-green-500/30 p-5 flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-green-400 font-display text-xs uppercase tracking-widest mb-0.5">{t.calorie.bulk} (+300)</div>
                        <div className="text-white font-sans text-xs text-white/50">{lang === "en" ? "For muscle gain" : "Kas kazanımı için"}</div>
                      </div>
                      <div className="font-display text-2xl text-white">{result.bulk}</div>
                    </div>
                    {/* Tip */}
                    <div className="bg-primary/8 border border-primary/25 p-4 flex gap-3">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-white/60 font-sans text-xs leading-relaxed">
                        {lang === "en"
                          ? "These values are a starting point. It takes 2 weeks of tracking to determine your real daily expenditure."
                          : "Bu değerler başlangıç noktası. Gerçek günlük harcamanı belirlemek için 2 haftalık takip gerekir."}
                      </p>
                    </div>
                    <button onClick={() => { setResult(null); setStep(1); setActivity("") }} className="w-full py-3 border border-white/15 text-white/50 font-display text-xs uppercase tracking-widest hover:border-white/40 transition-all">
                      {t.calorie.recalculate}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 p-8 text-center min-h-[320px] flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/4 flex items-center justify-center mb-5">
                      <Flame className="w-9 h-9 text-white/20" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-2">{lang === "en" ? "3 Steps" : "3 Adım"}</div>
                    <p className="text-white/20 font-sans text-xs">
                      {lang === "en" ? "Complete the steps to see 3 different scenarios" : "Adımları tamamladığında 3 farklı senaryo görünecek"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Post-result CTA */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">{lang === "en" ? "Next Step" : "Sonraki Adım"}</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    {lang === "en" ? "You eat" : "Günde"} <span className="text-primary">{result.tdee} kcal</span> {lang === "en" ? "a day — But How?" : "yiyeceksin — Ama Nasıl?"}
                  </h3>
                  <p className="text-white/55 font-sans text-sm">
                    {lang === "en"
                      ? "Get personal coaching for macro distribution, meal timing and a complete nutrition plan."
                      : "Makro dağılımı, öğün zamanlaması ve yemek planı için kişisel koçluk al."}
                  </p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    {lang === "en" ? "Create Plan" : "Plan Oluştur"} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other tools */}
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
