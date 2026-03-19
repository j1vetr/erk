import { useState, useRef } from "react"
import { SEO } from "@/hooks/useSEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Droplets, ChevronRight, ArrowRight, Info, CheckCircle2, Thermometer, Sun } from "lucide-react"
import { Link } from "wouter"
import { useLanguage } from "@/i18n/LanguageContext"

export default function WaterPage() {
  const { t, lang } = useLanguage()

  const otherTools = [
    { name: t.toolsHub.tools[1].title, desc: t.toolsHub.tools[1].desc, href: "/araclar/kalori", icon: "🔥" },
    { name: t.toolsHub.tools[2].title, desc: t.toolsHub.tools[2].desc, href: "/araclar/makro", icon: "🥩" },
    { name: t.toolsHub.tools[0].title, desc: t.toolsHub.tools[0].desc, href: "/araclar/bmi", icon: "📏" },
  ]

  const activityLevels = lang === "en" ? [
    { id: "sedanter", label: "Sedentary", desc: "Desk job, no exercise", icon: "🪑", mul: 1.0 },
    { id: "hafif", label: "Lightly Active", desc: "Exercise 1–3 days/week", icon: "🚶", mul: 1.15 },
    { id: "orta", label: "Moderately Active", desc: "Exercise 3–5 days/week", icon: "🏃", mul: 1.3 },
    { id: "cok", label: "Very Active", desc: "Intense training 6–7 days/week", icon: "⚡", mul: 1.5 },
  ] : [
    { id: "sedanter", label: "Hareketsiz", desc: "Masa başı, egzersiz yok", icon: "🪑", mul: 1.0 },
    { id: "hafif", label: "Hafif Aktif", desc: "Haftada 1–3 gün egzersiz", icon: "🚶", mul: 1.15 },
    { id: "orta", label: "Orta Aktif", desc: "Haftada 3–5 gün egzersiz", icon: "🏃", mul: 1.3 },
    { id: "cok", label: "Çok Aktif", desc: "Haftada 6–7 gün yoğun antrenman", icon: "⚡", mul: 1.5 },
  ]

  const climates = lang === "en" ? [
    { id: "serin", label: "Cool / Indoors", icon: "❄️", add: 0 },
    { id: "ilimli", label: "Temperate", icon: "🌤️", add: 0.3 },
    { id: "sicak", label: "Hot / Humid", icon: "☀️", add: 0.7 },
  ] : [
    { id: "serin", label: "Serin / İç Ortam", icon: "❄️", add: 0 },
    { id: "ilimli", label: "Ilıman", icon: "🌤️", add: 0.3 },
    { id: "sicak", label: "Sıcak / Nemli", icon: "☀️", add: 0.7 },
  ]
  const [weight, setWeight] = useState("")
  const [activity, setActivity] = useState("")
  const [climate, setClimate] = useState("ilimli")
  const [result, setResult] = useState<{ base: number; total: number; glasses: number; sport: number } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const calculate = () => {
    const w = parseFloat(weight)
    const act = activityLevels.find(a => a.id === activity)
    const cli = climates.find(c => c.id === climate)
    if (w > 0 && act && cli) {
      const base = w * 0.033
      const sportAdd = act.mul > 1.0 ? (act.mul - 1.0) * 0.5 : 0
      const total = Math.round((base + sportAdd + cli.add) * 10) / 10
      const glasses = Math.round(total / 0.25)
      setResult({ base: Math.round(base * 10) / 10, total, glasses, sport: Math.round(sportAdd * 10) / 10 })
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)
    }
  }

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="Su İhtiyacı Hesaplayıcı | Günlük Su Tüketim Miktarı"
        description="Kilona, aktivite seviyene ve iklime göre günlük su ihtiyacını hesapla. Dehidrasyon belirtilerini ve su tüketim taktiklerini öğren."
        canonical="/araclar/su-ihtiyaci"
      />
      <Navbar />

      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/6 via-blue-500/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Su İhtiyacı Hesaplayıcı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Droplets className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                Su İhtiyacı <span className="text-primary">Hesaplayıcı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                Kilona, aktivite seviyene ve iklim koşullarına göre günlük su ihtiyacını hesapla. Dehidrasyon performansını %20 düşürür.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Yöntem", val: "Kilo Bazlı" },
              { label: "Değişkenler", val: "Aktivite + İklim" },
              { label: "Çıktı", val: "Litre + Bardak" },
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

                {/* Kilo */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">1</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Vücut Ağırlığın</label>
                  </div>
                  <div className="relative">
                    <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="80" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-lg">kg</span>
                  </div>
                </div>

                {/* Aktivite */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">2</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Aktivite Seviyesi</label>
                  </div>
                  <div className="space-y-2">
                    {activityLevels.map((lvl) => (
                      <button key={lvl.id} onClick={() => setActivity(lvl.id)}
                        className={`w-full flex items-center gap-4 p-3.5 border text-left transition-all duration-200 ${activity === lvl.id ? "bg-primary/15 border-primary" : "bg-black border-white/10 hover:border-white/30"}`}>
                        <span className="text-xl">{lvl.icon}</span>
                        <div className="flex-1">
                          <div className={`font-display text-sm uppercase tracking-widest ${activity === lvl.id ? "text-primary" : "text-white/80"}`}>{lvl.label}</div>
                          <div className="text-white/35 font-sans text-xs">{lvl.desc}</div>
                        </div>
                        {activity === lvl.id && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* İklim */}
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">3</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">İklim / Ortam</label>
                    <Thermometer className="w-4 h-4 text-primary/60 ml-auto" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {climates.map((c) => (
                      <button key={c.id} onClick={() => setClimate(c.id)}
                        className={`py-4 border-2 font-display text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-2 ${climate === c.id ? "bg-primary/15 border-primary text-primary" : "bg-black border-white/15 text-white/50 hover:border-white/40"}`}>
                        <span className="text-xl">{c.icon}</span>
                        <span className="text-center leading-tight">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={calculate} disabled={!weight || !activity}
                  className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3">
                  Su İhtiyacımı Hesapla <Droplets className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

                    {/* Main */}
                    <div className="bg-[#0D0D0D] border-2 border-cyan-500/50 p-7 text-center shadow-[0_0_30px_rgba(6,182,212,0.08)]">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-4">Günlük Su İhtiyacın</div>

                      {/* Animated fill */}
                      <div className="relative w-28 h-36 mx-auto mb-5">
                        <div className="absolute inset-0 border-2 border-cyan-500/40 rounded-b-2xl overflow-hidden">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.min(100, (result.total / 5) * 100)}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500/60 to-blue-500/30"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div>
                              <div className="font-display text-4xl font-bold text-white leading-none">{result.total}</div>
                              <div className="text-cyan-400/80 font-display text-sm uppercase tracking-wider">Litre</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-white/50 font-sans text-sm">≈ <span className="text-white font-bold text-xl">{result.glasses}</span> bardak su / gün</div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-[#0D0D0D] border border-white/10 p-5 space-y-3">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">Detay</div>
                      {[
                        { label: "Temel İhtiyaç", val: `${result.base} L`, icon: "💧", desc: "Kilo bazlı minimum" },
                        { label: "Egzersiz Eklemesi", val: result.sport > 0 ? `+${result.sport} L` : "—", icon: "⚡", desc: "Antrenman terleme kaybı" },
                        { label: "İklim Eklemesi", val: climate === "serin" ? "—" : climate === "ilimli" ? "+0.3 L" : "+0.7 L", icon: "🌡️", desc: "Sıcaklık / nem etkisi" },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-lg">{row.icon}</span>
                          <div className="flex-1">
                            <div className="text-white/70 font-display text-xs uppercase tracking-wider">{row.label}</div>
                            <div className="text-white/30 font-sans text-[10px]">{row.desc}</div>
                          </div>
                          <div className="font-display text-base text-white/80 font-bold">{row.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-primary/8 border border-primary/25 p-4 flex gap-3">
                      <Sun className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-white/55 font-sans text-xs leading-relaxed">
                        Bu değer minimum hedeftir. Antrenmanlarda terleyen, sıcak iklimlerde yaşayan veya kafein tüketen kişiler için daha yüksek olabilir.
                      </p>
                    </div>

                    <button onClick={() => setResult(null)} className="w-full py-3 border border-white/15 text-white/50 font-display text-xs uppercase tracking-widest hover:border-white/40 transition-all">
                      Yeniden Hesapla
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/4 flex items-center justify-center mb-6">
                      <Droplets className="w-10 h-10 text-white/15" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-3">Su Takibi</div>
                    <p className="text-white/20 font-sans text-sm max-w-xs leading-relaxed">
                      Bilgilerini girince litre ve bardak cinsinden günlük su ihtiyacın çıkacak.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    Günde <span className="text-primary">{result.total} Litre</span> — Ve Beslenme?
                  </h3>
                  <p className="text-white/55 font-sans text-sm">Su takibi beslenme planının parçası. Tüm tabloyu birlikte oluşturalım.</p>
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
