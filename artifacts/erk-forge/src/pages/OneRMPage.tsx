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
    const w = parseFloat(weight)
    const r = parseInt(reps)
    
    if (w > 0 && r > 0 && r <= 30) {
      // Epley formülü
      const max = Math.round(w * (1 + r / 30))
      setResult(max)
    }
  }

  const InputClass = "w-full bg-[#050505] border-2 border-white/20 px-6 py-6 text-white text-4xl font-display focus:outline-none focus:border-primary transition-colors text-center"

  // 1RM'nin yüzdeleri
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

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10 z-10">
          
          <ToolsSidebar />

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10">
              <Dumbbell className="w-12 h-12 text-primary" />
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-white">
                1RM <span className="text-gray-600">HESAPLAYICI</span>
              </h1>
            </div>
            
            <p className="text-gray-400 font-sans mb-10 text-lg leading-relaxed max-w-4xl">
              Antrenman programlamasını doğru yapmak için maksimum gücünü bilmen gerekir. Belirli bir ağırlıkla çıkarabildiğin tekrar sayısını girerek 1 Tekrar Maksimum (1RM) değerini tahmin et.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#111] border border-white/10 p-8 shadow-2xl">
              
              {/* Form Side */}
              <div className="flex flex-col">
                <form onSubmit={calculate} className="space-y-8 flex-1">
                  <div>
                    <label className="block text-center text-primary font-display text-2xl tracking-widest mb-4 uppercase">Kaldırılan Ağırlık (kg)</label>
                    <input type="number" step="0.5" required value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="100" className={InputClass} />
                  </div>
                  <div>
                    <label className="block text-center text-primary font-display text-2xl tracking-widest mb-4 uppercase">Tekrar Sayısı (1-30)</label>
                    <input type="number" min="1" max="30" required value={reps} onChange={(e)=>setReps(e.target.value)} placeholder="8" className={InputClass} />
                  </div>
                  <button type="submit" className="w-full bg-primary text-black py-6 font-display text-3xl uppercase tracking-widest font-bold hover:bg-white transition-colors mt-auto shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    GÜCÜNÜ HESAPLA
                  </button>
                </form>
              </div>

              {/* Results Side */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="bg-primary/10 border-2 border-primary p-8 text-center mb-8 shadow-[0_0_20px_rgba(245,197,24,0.15)]">
                        <div className="text-primary font-display tracking-[0.2em] uppercase text-lg mb-2">TAHMİNİ 1 TEKRAR MAKSİMUM</div>
                        <div className="text-8xl md:text-9xl font-display font-bold text-white tracking-wider drop-shadow-lg">
                          {result} <span className="text-4xl text-primary">KG</span>
                        </div>
                      </div>

                      <h3 className="font-display text-3xl text-white mb-6 tracking-widest border-b border-white/10 pb-4">ANTRENMAN YÜZDELERİ</h3>
                      
                      <div className="space-y-3">
                        {percentages.map((item, idx) => (
                          <div key={idx} className="flex items-center bg-[#050505] border border-white/5 p-5 hover:border-primary/50 transition-colors group">
                            <div className="w-20 font-display text-3xl text-primary group-hover:text-white transition-colors">{item.pct}%</div>
                            <div className="flex-1 font-sans text-gray-400 text-base ml-4">{item.target}</div>
                            <div className="font-display text-4xl text-white group-hover:text-primary transition-colors">{item.val} kg</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 p-12 text-gray-600 bg-[#050505]">
                      <Dumbbell className="w-32 h-32 mb-8 opacity-20" />
                      <p className="font-display text-3xl uppercase tracking-widest text-center leading-relaxed">SONUCU GÖRMEK İÇİN<br/>AĞIRLIK VE TEKRAR GİR</p>
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
