import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Dumbbell, ChevronRight, ArrowRight, Info, CheckCircle2, Zap } from "lucide-react"
import { Link } from "wouter"

const otherTools = [
  { name: "BMI Hesaplayıcı", desc: "Boy-kilo oranını öğren", href: "/araclar/bmi", icon: "📏" },
  { name: "Kalori & TDEE", desc: "Günlük kalori ihtiyacın", href: "/araclar/kalori", icon: "🔥" },
  { name: "Vücut Yağ Oranı", desc: "Yağ & kas kütleni öğren", href: "/araclar/vucut-analizi", icon: "📊" },
]

const exercises = [
  { id: "bench", label: "Bench Press", icon: "🏋️" },
  { id: "squat", label: "Squat", icon: "🦵" },
  { id: "deadlift", label: "Deadlift", icon: "⚡" },
  { id: "ohp", label: "Overhead Press", icon: "🤲" },
  { id: "other", label: "Diğer Hareket", icon: "💪" },
]

export default function OneRMPage() {
  const [exercise, setExercise] = useState("")
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    const w = parseFloat(weight), r = parseInt(reps)
    if (w > 0 && r > 0 && r <= 30) {
      setResult(Math.round(w * (1 + r / 30)))
    }
  }

  const percentages = result ? [
    { pct: 100, val: result, reps: "1 Tekrar", zone: "Maksimum Güç", color: "text-red-400", barColor: "bg-red-500" },
    { pct: 95, val: Math.round(result * 0.95), reps: "2–3 Tekrar", zone: "Güç", color: "text-orange-400", barColor: "bg-orange-500" },
    { pct: 90, val: Math.round(result * 0.90), reps: "4 Tekrar", zone: "Güç", color: "text-orange-400", barColor: "bg-orange-500" },
    { pct: 85, val: Math.round(result * 0.85), reps: "6 Tekrar", zone: "Güç / Hipertrofi", color: "text-yellow-400", barColor: "bg-yellow-500" },
    { pct: 80, val: Math.round(result * 0.80), reps: "8 Tekrar", zone: "Hipertrofi", color: "text-primary", barColor: "bg-primary" },
    { pct: 75, val: Math.round(result * 0.75), reps: "10 Tekrar", zone: "Hipertrofi", color: "text-primary", barColor: "bg-primary" },
    { pct: 70, val: Math.round(result * 0.70), reps: "12 Tekrar", zone: "Hipertrofi", color: "text-green-400", barColor: "bg-green-500" },
    { pct: 60, val: Math.round(result * 0.60), reps: "15–20 Tekrar", zone: "Dayanıklılık", color: "text-blue-400", barColor: "bg-blue-500" },
  ] : []

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* ── Dramatic Header ── */}
      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">1RM Hesaplayıcı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Dumbbell className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                1RM <span className="text-primary">Hesaplayıcı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                Maksimum tek tekrar gücünü hesapla. Antrenman ağırlıklarını bilimsel yüzdelerle planla.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Formül", val: "Epley Yöntemi" },
              { label: "Limit", val: "Maks 30 tekrar" },
              { label: "Çıktı", val: "8 Yüzde Zonu" },
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
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                <h2 className="font-display text-lg uppercase tracking-widest text-white mb-2">Egzersiz & Değerler</h2>
                <p className="text-white/40 font-sans text-sm mb-6">Güvenli tekrar sayısı ile kaldırdığın ağırlığı gir.</p>

                {/* Exercise selector */}
                <div className="mb-6">
                  <label className="block text-primary font-display text-xs tracking-widest uppercase mb-3">Hareket (Opsiyonel)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {exercises.map((ex) => (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => setExercise(ex.id === exercise ? "" : ex.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 border text-sm font-display uppercase tracking-wider transition-all ${
                          exercise === ex.id ? "bg-primary/20 border-primary text-primary" : "bg-black border-white/10 text-white/50 hover:border-white/30"
                        }`}
                      >
                        <span>{ex.icon}</span>
                        <span className="text-xs">{ex.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={calculate} className="space-y-5">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">1</div>
                      <label className="font-display text-white uppercase tracking-widest text-sm">Kaldırılan Ağırlık</label>
                    </div>
                    <div className="relative">
                      <input type="number" step="0.5" required value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="100" className={inputClass} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display text-lg">kg</span>
                    </div>
                    <p className="text-white/30 font-sans text-xs mt-2 ml-10">Kontrolü tamamen kaybetmeden tamamladığın ağırlık</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">2</div>
                      <label className="font-display text-white uppercase tracking-widest text-sm">Tekrar Sayısı</label>
                    </div>
                    <div className="relative">
                      <input type="number" min="1" max="30" required value={reps} onChange={(e) => setReps(e.target.value)} placeholder="8" className={inputClass} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display text-lg">rep</span>
                    </div>
                    <p className="text-white/30 font-sans text-xs mt-2 ml-10">En iyi sonuç için 1–10 tekrar arası ideal</p>
                  </div>
                  <button type="submit" className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3">
                    Gücümü Hesapla <Zap className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Info box */}
              <div className="bg-[#0D0D0D] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-display text-xs uppercase tracking-widest text-white/50">Nasıl Kullanılır?</span>
                </div>
                <p className="text-white/40 font-sans text-xs leading-relaxed">
                  Antrenman periyotlamasında %80–85 ağırlık (8–6 tekrar) hipertrofi için ideal zona karşılık gelir. Güç gelişimi için %90+ ile çalış.
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    {/* Main 1RM */}
                    <div className="bg-[#0D0D0D] border-2 border-primary p-7 text-center shadow-[0_0_30px_rgba(245,197,24,0.12)]">
                      <div className="text-primary font-display tracking-[0.3em] uppercase text-xs mb-3">Tahmini 1RM</div>
                      <div className="text-8xl font-display font-bold text-white tracking-wider leading-none mb-2">
                        {result}
                      </div>
                      <div className="text-primary font-display text-xl uppercase tracking-widest">KG</div>
                      {exercise && (
                        <div className="mt-3 text-white/30 font-sans text-sm">
                          {exercises.find(e => e.id === exercise)?.icon} {exercises.find(e => e.id === exercise)?.label}
                        </div>
                      )}
                    </div>

                    {/* Percentage table */}
                    <div className="bg-[#0D0D0D] border border-white/10 p-5">
                      <h3 className="font-display text-sm text-white uppercase tracking-widest mb-4 pb-3 border-b border-white/8">Antrenman Yüzdeleri</h3>
                      <div className="space-y-2">
                        {percentages.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group"
                          >
                            <div className="flex items-center gap-3 mb-1">
                              <div className={`w-10 font-display text-sm ${item.color} flex-shrink-0`}>{item.pct}%</div>
                              <div className="flex-1 font-sans text-white/50 text-xs">{item.zone} — {item.reps}</div>
                              <div className={`font-display text-lg ${item.color} font-bold`}>{item.val} <span className="text-xs text-white/40">kg</span></div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 flex-shrink-0" />
                              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.pct}%` }}
                                  transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                                  className={`h-full rounded-full ${item.barColor}`}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/4 flex items-center justify-center mb-6">
                      <Dumbbell className="w-10 h-10 text-white/15" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-3">Güç Hesabı</div>
                    <p className="text-white/20 font-sans text-sm max-w-xs leading-relaxed">
                      Ağırlık ve tekrar sayını girdiğinde 8 farklı antrenman zonunu göreceksin.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Post-result CTA */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    1RM Değerin <span className="text-primary">{result} kg</span> — Bunu Kır
                  </h3>
                  <p className="text-white/55 font-sans text-sm">Periyotlamalı bir güç programıyla 12 haftada %15–25 artış hedefleyelim.</p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    Program Oluştur <ArrowRight className="w-4 h-4" />
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
