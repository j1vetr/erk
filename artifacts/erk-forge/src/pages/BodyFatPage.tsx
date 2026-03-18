import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ToolsSidebar } from "@/components/layout/ToolsSidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Percent } from "lucide-react"

export default function BodyFatPage() {
  const [gender, setGender] = useState("erkek")
  const [height, setHeight] = useState("")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hipVal, setHipVal] = useState("")
  
  const [result, setResult] = useState<number | null>(null)

  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    const h = parseFloat(height)
    const n = parseFloat(neck)
    const w = parseFloat(waist)
    
    if (h > 0 && n > 0 && w > 0) {
      let bf = 0
      if (gender === "erkek") {
        // ABD Donanması Formülü (Erkek)
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
      } else {
        // Kadın
        const hp = parseFloat(hipVal)
        if (hp > 0) {
          bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
        }
      }
      
      if (!isNaN(bf)) {
        setResult(Math.max(1, Math.min(60, bf))) // Makul sınırlar
      }
    }
  }

  const InputClass = "w-full bg-[#050505] border border-white/20 p-4 text-white font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-xl"
  const LabelClass = "block text-gray-400 font-display uppercase tracking-widest text-base mb-2"

  const getCategory = (bf: number, gender: string) => {
    if (gender === 'erkek') {
      if (bf < 6) return { cat: "Esansiyel Yağ (Çok Düşük)", color: "text-blue-500" }
      if (bf < 14) return { cat: "Atletik (Definasyon)", color: "text-primary" }
      if (bf < 18) return { cat: "Fit / Sağlıklı", color: "text-green-500" }
      if (bf < 25) return { cat: "Kabul Edilebilir", color: "text-yellow-500" }
      return { cat: "Obezite", color: "text-red-500" }
    } else {
      if (bf < 14) return { cat: "Esansiyel Yağ (Çok Düşük)", color: "text-blue-500" }
      if (bf < 21) return { cat: "Atletik (Definasyon)", color: "text-primary" }
      if (bf < 25) return { cat: "Fit / Sağlıklı", color: "text-green-500" }
      if (bf < 32) return { cat: "Kabul Edilebilir", color: "text-yellow-500" }
      return { cat: "Obezite", color: "text-red-500" }
    }
  }

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10 z-10">
          
          <ToolsSidebar />

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <Percent className="w-12 h-12 text-primary" />
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-white">
                VÜCUT YAĞ <span className="text-gray-600">ORANI</span>
              </h1>
            </div>
            
            <p className="text-gray-400 font-sans mb-10 text-lg leading-relaxed max-w-4xl">
              Kilonu değil, yağ oranını takip et. ABD Donanması vücut yağı ölçüm formülü ile mezura kullanarak yaklaşık yağ oranını hesapla. Gelişimini takip etmenin en iyi yollarından biridir.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl">
              
              <form onSubmit={calculate} className="space-y-8">
                
                <div className="flex gap-4 mb-8">
                  <button 
                    type="button"
                    onClick={() => setGender('erkek')} 
                    className={`flex-1 py-4 font-display uppercase tracking-widest text-2xl border transition-colors ${gender === 'erkek' ? 'bg-primary text-black border-primary' : 'bg-[#050505] text-gray-500 border-white/20 hover:border-white/50'}`}
                  >
                    Erkek
                  </button>
                  <button 
                    type="button"
                    onClick={() => setGender('kadin')} 
                    className={`flex-1 py-4 font-display uppercase tracking-widest text-2xl border transition-colors ${gender === 'kadin' ? 'bg-primary text-black border-primary' : 'bg-[#050505] text-gray-500 border-white/20 hover:border-white/50'}`}
                  >
                    Kadın
                  </button>
                </div>

                <div>
                  <label className={LabelClass}>Boyun (cm)</label>
                  <input type="number" step="0.5" required value={height} onChange={(e)=>setHeight(e.target.value)} className={InputClass} placeholder="Örn: 180" />
                </div>
                
                <div>
                  <label className={LabelClass}>Boyun Çevresi (cm)</label>
                  <input type="number" step="0.1" required value={neck} onChange={(e)=>setNeck(e.target.value)} className={InputClass} placeholder="Adem elmasının altından" />
                </div>

                <div>
                  <label className={LabelClass}>Bel Çevresi (cm)</label>
                  <input type="number" step="0.1" required value={waist} onChange={(e)=>setWaist(e.target.value)} className={InputClass} placeholder="Göbek deliği hizasından" />
                </div>

                {gender === 'kadin' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                    <label className={LabelClass}>Kalça Çevresi (cm)</label>
                    <input type="number" step="0.1" required value={hipVal} onChange={(e)=>setHipVal(e.target.value)} className={InputClass} placeholder="En geniş yerinden" />
                  </motion.div>
                )}

                <button type="submit" className="w-full bg-primary text-black py-5 font-display text-3xl uppercase tracking-widest font-bold hover:bg-white transition-colors mt-8 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                  YAĞ ORANINI HESAPLA
                </button>
              </form>

              <div className="flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
                <AnimatePresence mode="wait">
                  {result !== null ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center w-full bg-[#050505] p-10 border border-white/5"
                    >
                      <div className="text-gray-400 font-display tracking-[0.2em] uppercase mb-8 text-xl">VÜCUT YAĞ ORANIN</div>
                      
                      <div className="relative inline-block mb-10">
                        <svg className="w-64 h-64 transform -rotate-90">
                          <circle cx="128" cy="128" r="100" fill="none" stroke="#222" strokeWidth="16" />
                          <circle 
                            cx="128" cy="128" r="100" 
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="16" 
                            strokeDasharray="628" 
                            strokeDashoffset={628 - (628 * result) / 100}
                            className="transition-all duration-1500 ease-out drop-shadow-[0_0_15px_rgba(245,197,24,0.5)]"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="font-display text-6xl font-bold text-white">%{result.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className={`mt-4 text-3xl font-display uppercase tracking-widest ${getCategory(result, gender).color}`}>
                        {getCategory(result, gender).cat}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" className="text-center text-gray-600 flex flex-col items-center justify-center h-full">
                      <Percent className="w-32 h-32 mb-8 opacity-20" />
                      <p className="font-display text-3xl uppercase tracking-widest leading-relaxed">Ölçümlerini gir ve<br/>sonucunu gör</p>
                    </motion.div>
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
