import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ToolsSidebar } from "@/components/layout/ToolsSidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Dumbbell } from "lucide-react"

export default function OneRMPage() {
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
    { pct: 100, val: result, target: "Maksimum Güç (1 Rep Max)" },
    { pct: 95, val: Math.round(result * 0.95), target: "2 Tekrar (Güç)" },
    { pct: 90, val: Math.round(result * 0.90), target: "4 Tekrar (Güç)" },
    { pct: 85, val: Math.round(result * 0.85), target: "6 Tekrar (Hipertrofi/Güç)" },
    { pct: 80, val: Math.round(result * 0.80), target: "8 Tekrar (Hipertrofi)" },
    { pct: 75, val: Math.round(result * 0.75), target: "10 Tekrar (Hipertrofi)" },
    { pct: 70, val: Math.round(result * 0.70), target: "12 Tekrar (Hipertrofi)" },
    { pct: 60, val: Math.round(result * 0.60), target: "Dayanıklılık / Isınma" }
  ] : []

  const InputClass = "w-full bg-[#050505] border-2 border-white/20 px-4 py-3 text-white text-2xl font-display focus:outline-none focus:border-primary transition-colors text-center"

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8">
          <ToolsSidebar />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="w-7 h-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-display font-bold uppercase text-white">
                1RM <span className="text-gray-600">HESAPLAYICI</span>
              </h1>
            </div>
            <p className="text-gray-400 font-sans mb-6 text-sm leading-relaxed max-w-3xl">
              Belirli bir ağırlıkla çıkarabildiğin tekrar sayısını girerek 1 Tekrar Maksimum (1RM) değerini tahmin et.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#111] border border-white/10 p-6 shadow-2xl">
              <div className="flex flex-col">
                <form onSubmit={calculate} className="space-y-5 flex-1">
                  <div>
                    <label className="block text-center text-primary font-display text-xs tracking-widest mb-2 uppercase">Kaldırılan Ağırlık (kg)</label>
                    <input type="number" step="0.5" required value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="100" className={InputClass} />
                  </div>
                  <div>
                    <label className="block text-center text-primary font-display text-xs tracking-widest mb-2 uppercase">Tekrar Sayısı (1-30)</label>
                    <input type="number" min="1" max="30" required value={reps} onChange={(e)=>setReps(e.target.value)} placeholder="8" className={InputClass} />
                  </div>
                  <button type="submit" className="w-full bg-primary text-black py-3 font-display text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors shadow-[0_0_15px_rgba(245,197,24,0.25)]">
                    GÜCÜNÜ HESAPLA
                  </button>
                </form>
              </div>

              <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-primary/10 border-2 border-primary p-5 text-center mb-5 shadow-[0_0_15px_rgba(245,197,24,0.12)]">
                        <div className="text-primary font-display tracking-[0.2em] uppercase text-xs mb-1">TAHMİNİ 1RM</div>
                        <div className="text-6xl font-display font-bold text-white tracking-wider">
                          {result} <span className="text-2xl text-primary">KG</span>
                        </div>
                      </div>
                      <h3 className="font-display text-sm text-white mb-3 tracking-widest border-b border-white/10 pb-2 uppercase">Antrenman Yüzdeleri</h3>
                      <div className="space-y-1.5">
                        {percentages.map((item, idx) => (
                          <div key={idx} className="flex items-center bg-[#050505] border border-white/5 px-3 py-2 hover:border-primary/50 transition-colors group">
                            <div className="w-12 font-display text-base text-primary group-hover:text-white transition-colors">{item.pct}%</div>
                            <div className="flex-1 font-sans text-gray-400 text-xs ml-3">{item.target}</div>
                            <div className="font-display text-lg text-white group-hover:text-primary transition-colors">{item.val} kg</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 p-8 text-gray-600 bg-[#050505]">
                      <Dumbbell className="w-14 h-14 mb-4 opacity-20" />
                      <p className="font-display text-base uppercase tracking-widest text-center leading-relaxed">Ağırlık ve tekrar<br/>girerek başla</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
