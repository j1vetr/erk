import { useState, useRef } from "react"
import { SEO } from "@/hooks/useSEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { PieChart, ChevronRight, ArrowRight, Info, CheckCircle2, Beef, Wheat, Droplets } from "lucide-react"
import { Link } from "wouter"
import { useLanguage } from "@/i18n/LanguageContext"

export default function MacroPage() {
  const { t, lang } = useLanguage()

  const otherTools = [
    { name: t.toolsHub.tools[1].title, desc: t.toolsHub.tools[1].desc, href: "/araclar/kalori", icon: "🔥" },
    { name: t.toolsHub.tools[5].title, desc: t.toolsHub.tools[5].desc, href: "/araclar/ideal-kilo", icon: "⚖️" },
    { name: t.toolsHub.tools[6].title, desc: t.toolsHub.tools[6].desc, href: "/araclar/su-ihtiyaci", icon: "💧" },
  ]

  const goals = lang === "en" ? [
    { id: "cut", label: "Burn Fat", desc: "Definition — burn fat on a calorie deficit while preserving muscle", icon: "🔥", protein: 2.4, fat: 0.8, color: "border-red-500/50 bg-red-500/5" },
    { id: "maintain", label: "Maintain", desc: "Maintenance — eat healthy while preserving your current physique", icon: "⚖️", protein: 2.0, fat: 1.0, color: "border-primary/50 bg-primary/5" },
    { id: "bulk", label: "Build Muscle", desc: "Bulk — maximize muscle growth with a calorie surplus", icon: "💪", protein: 1.8, fat: 1.0, color: "border-green-500/50 bg-green-500/5" },
  ] : [
    { id: "cut", label: "Yağ Yak", desc: "Definasyon — kalori açığı ile yağı eritirken kas koru", icon: "🔥", protein: 2.4, fat: 0.8, color: "border-red-500/50 bg-red-500/5" },
    { id: "maintain", label: "Formu Koru", desc: "Idame — mevcut vücudu koruyarak sağlıklı beslen", icon: "⚖️", protein: 2.0, fat: 1.0, color: "border-primary/50 bg-primary/5" },
    { id: "bulk", label: "Kas Kazan", desc: "Bulk — kalori fazlası ile maksimum kas büyümesi", icon: "💪", protein: 1.8, fat: 1.0, color: "border-green-500/50 bg-green-500/5" },
  ]
  const [calories, setCalories] = useState("")
  const [weight, setWeight] = useState("")
  const [goal, setGoal] = useState("")
  const [result, setResult] = useState<{ protein: number; carb: number; fat: number; pPct: number; cPct: number; fPct: number } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const selectedGoal = goals.find(g => g.id === goal)

  const calculate = () => {
    const cal = parseFloat(calories), w = parseFloat(weight)
    if (cal > 0 && w > 0 && selectedGoal) {
      const protein = Math.round(w * selectedGoal.protein)
      const fat = Math.round(w * selectedGoal.fat)
      const proteinCal = protein * 4
      const fatCal = fat * 9
      const carbCal = Math.max(0, cal - proteinCal - fatCal)
      const carb = Math.round(carbCal / 4)
      const pPct = Math.round((proteinCal / cal) * 100)
      const fPct = Math.round((fatCal / cal) * 100)
      const cPct = 100 - pPct - fPct
      setResult({ protein, carb, fat, pPct, cPct, fPct })
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)
    }
  }

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="Makro Hesaplayıcı | Protein Karbonhidrat Yağ Oranları"
        description="Hedefine göre günlük protein, karbonhidrat ve yağ miktarlarını hesapla. Cut, bulk ve idame fazları için optimize edilmiş makro dağılımı."
        canonical="/araclar/makro"
      />
      <Navbar />

      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/6 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Makro Hesaplayıcı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <PieChart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                Makro <span className="text-primary">Hesaplayıcı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                Amacına göre protein, karbonhidrat ve yağ dağılımını hesapla. Kalorini aklında körce değil, bilinçli harca.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Çıktı", val: "3 Makro" },
              { label: "Yöntem", val: "Ağırlık Bazlı" },
              { label: "Hedef", val: "Cut / İdame / Bulk" },
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

            {/* Form */}
            <div className="lg:col-span-3 space-y-5">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                <h2 className="font-display text-lg uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/8">Bilgilerini Gir</h2>

                {/* Günlük Kalori */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">1</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Günlük Kalori Hedefin</label>
                  </div>
                  <div className="relative">
                    <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="2200" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-sm">kcal</span>
                  </div>
                  <p className="text-white/30 font-sans text-xs mt-2 ml-10">Kalori ihtiyacını bilmiyorsan önce Kalori & TDEE aracını kullan</p>
                </div>

                {/* Kilo */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">2</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Vücut Ağırlığın</label>
                  </div>
                  <div className="relative">
                    <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="80" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-sm">kg</span>
                  </div>
                </div>

                {/* Hedef */}
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">3</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Hedefin</label>
                  </div>
                  <div className="space-y-2.5">
                    {goals.map((g) => (
                      <button key={g.id} onClick={() => setGoal(g.id)}
                        className={`w-full flex items-center gap-4 p-4 border-2 text-left transition-all duration-200 ${goal === g.id ? g.color + " border-2" : "bg-black border-white/10 hover:border-white/30"}`}>
                        <span className="text-2xl">{g.icon}</span>
                        <div className="flex-1">
                          <div className={`font-display text-sm uppercase tracking-widest ${goal === g.id ? "text-white" : "text-white/70"}`}>{g.label}</div>
                          <div className="text-white/35 font-sans text-xs mt-0.5">{g.desc}</div>
                        </div>
                        {goal === g.id && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={calculate} disabled={!calories || !weight || !goal}
                  className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3">
                  Makrolarımı Hesapla <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#0D0D0D] border border-primary/20 p-5 flex gap-3">
                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-white/50 font-sans text-xs leading-relaxed">
                  Protein değerleri vücut ağırlığı başına hesaplanır. Yüksek protein alımı kas korumak ve tokluk hissi için kritik öneme sahiptir. Yağ değeri hormon sağlığı için minimum seviyede tutulmuştur.
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

                    {/* Pie-style visual header */}
                    <div className="bg-[#0D0D0D] border-2 border-primary/50 p-6 text-center shadow-[0_0_30px_rgba(245,197,24,0.08)]">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-5">Günlük Makro Dağılımın</div>

                      {/* Visual bar */}
                      <div className="flex h-5 overflow-hidden mb-4 gap-0.5">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.pPct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                          className="bg-blue-500 h-full rounded-l-sm" title={`Protein ${result.pPct}%`} />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.cPct}%` }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                          className="bg-primary h-full" title={`Karbonhidrat ${result.cPct}%`} />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.fPct}%` }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          className="bg-red-400 h-full rounded-r-sm" title={`Yağ ${result.fPct}%`} />
                      </div>

                      <div className="flex justify-between text-xs font-sans text-white/40 mb-6">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 inline-block rounded-sm" /> Protein {result.pPct}%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary inline-block rounded-sm" /> Karb {result.cPct}%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 inline-block rounded-sm" /> Yağ {result.fPct}%</span>
                      </div>

                      <div className="text-white/30 font-display tracking-widest uppercase text-[10px] mb-1">Toplam Kalori</div>
                      <div className="font-display text-4xl font-bold text-primary">{calories}</div>
                      <div className="text-white/30 font-sans text-xs">kcal / gün</div>
                    </div>

                    {/* Macro cards */}
                    {[
                      { icon: <Beef className="w-5 h-5" />, label: "Protein", val: result.protein, unit: "g", cal: result.protein * 4, color: "border-blue-500/40 text-blue-400", barColor: "bg-blue-500" },
                      { icon: <Wheat className="w-5 h-5" />, label: "Karbonhidrat", val: result.carb, unit: "g", cal: result.carb * 4, color: "border-primary/40 text-primary", barColor: "bg-primary" },
                      { icon: <Droplets className="w-5 h-5" />, label: "Yağ", val: result.fat, unit: "g", cal: result.fat * 9, color: "border-red-400/40 text-red-400", barColor: "bg-red-400" },
                    ].map((macro) => (
                      <div key={macro.label} className={`bg-[#0D0D0D] border ${macro.color.split(" ")[0]} p-4 flex items-center gap-4`}>
                        <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white/5 ${macro.color.split(" ")[1]}`}>
                          {macro.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-display text-xs uppercase tracking-widest mb-1 ${macro.color.split(" ")[1]}`}>{macro.label}</div>
                          <div className="h-1 bg-white/8 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className={`h-full ${macro.barColor}`} />
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-display text-2xl text-white font-bold">{macro.val}<span className="text-sm text-white/40 ml-0.5">g</span></div>
                          <div className="text-white/30 font-sans text-[10px]">{macro.cal} kcal</div>
                        </div>
                      </div>
                    ))}

                    <button onClick={() => setResult(null)} className="w-full py-3 border border-white/15 text-white/50 font-display text-xs uppercase tracking-widest hover:border-white/40 transition-all">
                      Yeniden Hesapla
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/4 flex items-center justify-center mb-6">
                      <PieChart className="w-10 h-10 text-white/15" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-3">Makro Dağılımı</div>
                    <p className="text-white/20 font-sans text-sm max-w-xs leading-relaxed">
                      Kalori, kilo ve hedefini girerek protein / karb / yağ dağılımını göreceksin.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    <span className="text-primary">{result.protein}g Protein</span> — Bunu Yemek Planına Çevir
                  </h3>
                  <p className="text-white/55 font-sans text-sm">Makrolarını takip etmek zor mu? Kişisel beslenme planıyla bu sayıları öğüne bölelim.</p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    Beslenme Planı Al <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

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
