import { useState, useRef } from "react"
import { SEO } from "@/hooks/useSEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ChevronRight, ArrowRight, Info, CheckCircle2, Zap } from "lucide-react"
import { Link } from "wouter"

const otherTools = [
  { name: "1RM Hesaplayıcı", desc: "Maksimum kaldırma gücün", href: "/araclar/1rm", icon: "🏋️" },
  { name: "Kalori & TDEE", desc: "Günlük kalori ihtiyacın", href: "/araclar/kalori", icon: "🔥" },
  { name: "Su İhtiyacı", desc: "Günlük su miktarın", href: "/araclar/su-ihtiyaci", icon: "💧" },
]

const zones = [
  { id: 1, label: "Toparlanma", pctMin: 50, pctMax: 60, color: "bg-blue-500", textColor: "text-blue-400", border: "border-blue-500/40", desc: "Aktif dinlenme ve hafif egzersiz. Yağ yakımı başlar, kardiyovasküler sistem güçlenir.", goal: "Isınma / Soğuma" },
  { id: 2, label: "Yağ Yakımı", pctMin: 60, pctMax: 70, color: "bg-green-500", textColor: "text-green-400", border: "border-green-500/40", desc: "En verimli yağ yakım bölgesi. Uzun süreli kardiyoda temel hedef bu bölgedir.", goal: "Tanımlama / Kondisyon" },
  { id: 3, label: "Aerobik", pctMin: 70, pctMax: 80, color: "bg-primary", textColor: "text-primary", border: "border-primary/50", desc: "Kardiyovasküler kapasiteyi artırır. Enerji tüketimi yüksektir. Dayanıklılık gelişir.", goal: "Genel Kondisyon" },
  { id: 4, label: "Anaerobik", pctMin: 80, pctMax: 90, color: "bg-orange-500", textColor: "text-orange-400", border: "border-orange-500/40", desc: "Laktat eşiği üzerinde çalışma. Performans ve güç gelişimi için kritik bölge.", goal: "Güç / Hız Geliştirme" },
  { id: 5, label: "Maksimum", pctMin: 90, pctMax: 100, color: "bg-red-500", textColor: "text-red-400", border: "border-red-500/40", desc: "Kısa süreli, yüksek yoğunluklu çalışma. Yalnızca deneyimli sporcular için.", goal: "Elit Performans" },
]

export default function HeartRatePage() {
  const [age, setAge] = useState("")
  const [restingHR, setRestingHR] = useState("")
  const [method, setMethod] = useState("karvonen")
  const [result, setResult] = useState<{ mhr: number; rhr: number | null; zones: { label: string; min: number; max: number; color: string; textColor: string; border: string; desc: string; goal: string; pctMin: number; pctMax: number }[] } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const calculate = () => {
    const a = parseInt(age)
    if (a <= 0 || a > 100) return

    const mhr = 220 - a
    const rhr = restingHR ? parseInt(restingHR) : null

    const calcZones = zones.map(z => {
      let min: number, max: number
      if (method === "karvonen" && rhr) {
        const hrr = mhr - rhr
        min = Math.round(rhr + hrr * (z.pctMin / 100))
        max = Math.round(rhr + hrr * (z.pctMax / 100))
      } else {
        min = Math.round(mhr * (z.pctMin / 100))
        max = Math.round(mhr * (z.pctMax / 100))
      }
      return { ...z, min, max }
    })

    setResult({ mhr, rhr, zones: calcZones })
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)
  }

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="Nabız Bölgesi Hesaplayıcı | Kalp Atış Hızı Bölgeleri"
        description="Yaşına göre maksimum kalp atış hızını ve antrenman nabız bölgelerini hesapla. Yağ yakma, kardiyo ve zirve bölgelerinde doğru antrenman yap."
        canonical="/araclar/nabiz-bolgesi"
      />
      <Navbar />

      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/6 via-orange-500/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Nabız Bölgesi Hesaplayıcı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                Nabız Bölgesi <span className="text-primary">Hesaplayıcı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                5 kardiyovasküler eğitim bölgeni hesapla. Doğru nabız bölgesinde çalışarak yağ yak, kondisyon geliştir veya performans pik yap.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Formüller", val: "Karvonen / MHR" },
              { label: "Bölge Sayısı", val: "5 Zon" },
              { label: "Çıktı", val: "BPM Aralıkları" },
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
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                <h2 className="font-display text-lg uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/8">Bilgilerini Gir</h2>

                {/* Yaş */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">1</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Yaşın</label>
                  </div>
                  <div className="relative">
                    <input type="number" min="10" max="100" value={age} onChange={(e) => setAge(e.target.value)} placeholder="28" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display">yıl</span>
                  </div>
                </div>

                {/* Dinlenim Nabzı */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-white/15 text-white/50 flex items-center justify-center font-display text-sm font-bold">2</div>
                    <label className="font-display text-white/60 uppercase tracking-widest text-sm">Dinlenim Nabzı <span className="text-white/30 normal-case font-sans text-xs">(opsiyonel)</span></label>
                  </div>
                  <div className="relative">
                    <input type="number" min="30" max="100" value={restingHR} onChange={(e) => setRestingHR(e.target.value)} placeholder="60" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-sm">bpm</span>
                  </div>
                  <p className="text-white/30 font-sans text-xs mt-2">Sabah uyanır uyanmaz, yatakta ölçülen nabız</p>
                </div>

                {/* Yöntem */}
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">3</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Hesaplama Yöntemi</label>
                  </div>
                  <div className="space-y-2">
                    <button onClick={() => setMethod("karvonen")}
                      className={`w-full flex items-start gap-3 p-3.5 border text-left transition-all ${method === "karvonen" ? "bg-primary/15 border-primary" : "bg-black border-white/10 hover:border-white/30"}`}>
                      <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${method === "karvonen" ? "text-primary" : "text-white/40"}`} />
                      <div>
                        <div className={`font-display text-xs uppercase tracking-widest ${method === "karvonen" ? "text-primary" : "text-white/70"}`}>Karvonen (Önerilen)</div>
                        <div className="text-white/30 font-sans text-xs mt-0.5">Dinlenim nabzı kullanır — daha kişisel ve hassas</div>
                      </div>
                    </button>
                    <button onClick={() => setMethod("mhr")}
                      className={`w-full flex items-start gap-3 p-3.5 border text-left transition-all ${method === "mhr" ? "bg-primary/15 border-primary" : "bg-black border-white/10 hover:border-white/30"}`}>
                      <Heart className={`w-4 h-4 mt-0.5 flex-shrink-0 ${method === "mhr" ? "text-primary" : "text-white/40"}`} />
                      <div>
                        <div className={`font-display text-xs uppercase tracking-widest ${method === "mhr" ? "text-primary" : "text-white/70"}`}>Maksimum Nabız %</div>
                        <div className="text-white/30 font-sans text-xs mt-0.5">Yalnızca yaş kullanılır — kolay ve hızlı</div>
                      </div>
                    </button>
                  </div>
                </div>

                <button onClick={calculate} disabled={!age}
                  className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3">
                  Bölgeleri Hesapla <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#0D0D0D] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-display text-xs uppercase tracking-widest text-white/50">Karvonen Nedir?</span>
                </div>
                <p className="text-white/40 font-sans text-xs leading-relaxed">
                  Karvonen formülü dinlenim nabzını da hesaba katar: <span className="text-white/60">Hedef Nabız = Dinlenim Nabzı + (MHN − Dinlenim Nabzı) × Yüzde</span>. Bu, standart yüzde bazlı yönteme göre çok daha bireysel sonuç verir.
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-3" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">

                    {/* MHR header */}
                    <div className="bg-[#0D0D0D] border-2 border-red-500/40 p-5 flex items-center justify-between">
                      <div>
                        <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-1">Maksimum Nabzın</div>
                        <div className="font-display text-5xl font-bold text-red-400">{result.mhr} <span className="text-xl text-white/40">bpm</span></div>
                      </div>
                      {result.rhr && (
                        <div className="text-right">
                          <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-1">Dinlenim Nabzın</div>
                          <div className="font-display text-3xl font-bold text-white/70">{result.rhr} <span className="text-sm text-white/30">bpm</span></div>
                        </div>
                      )}
                    </div>

                    {/* Zone cards */}
                    <div className="space-y-2">
                      {result.zones.map((zone, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className={`bg-[#0D0D0D] border ${zone.border} p-4`}
                        >
                          <div className="flex items-center gap-4 mb-2">
                            <div className={`w-2 h-10 rounded-sm flex-shrink-0 ${zone.color}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`font-display text-sm uppercase tracking-widest ${zone.textColor}`}>
                                  Zon {zone.id} — {zone.label}
                                </span>
                                <span className={`font-display text-xl font-bold ${zone.textColor} flex-shrink-0`}>
                                  {zone.min}–{zone.max} <span className="text-xs text-white/30">bpm</span>
                                </span>
                              </div>
                              <div className="h-1.5 bg-white/5 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${zone.pctMax}%` }}
                                  transition={{ delay: idx * 0.08 + 0.2, duration: 0.5 }}
                                  className={`h-full ${zone.color} opacity-70`}
                                />
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0 w-16">
                              <div className="text-white/25 font-sans text-[10px]">{zone.pctMin}–{zone.pctMax}%</div>
                            </div>
                          </div>
                          <div className="pl-6 flex items-start justify-between gap-3">
                            <p className="text-white/40 font-sans text-xs leading-relaxed flex-1">{zone.desc}</p>
                            <div className={`flex-shrink-0 text-[9px] font-display uppercase tracking-wider px-2 py-1 border ${zone.border} ${zone.textColor}`}>
                              {zone.goal}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/4 flex items-center justify-center mb-6">
                      <Heart className="w-10 h-10 text-white/15" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-3">5 Nabız Bölgesi</div>
                    <p className="text-white/20 font-sans text-sm max-w-xs leading-relaxed">
                      Yaşını girince 5 farklı kardiyovasküler eğitim bölgeni ve hedef nabız aralıklarını göreceksin.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    Maks. Nabzın <span className="text-primary">{result.mhr} bpm</span> — Bunu Programla Kullan
                  </h3>
                  <p className="text-white/55 font-sans text-sm">Kardiyonu antrenman programına entegre edelim. Doğru bölgede çalışmak sonucu ikiye katlar.</p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    Program Al <ArrowRight className="w-4 h-4" />
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
