import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ToolsSidebar } from "@/components/layout/ToolsSidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator } from "lucide-react"

export default function BMIPage() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<{bmi: string, category: string, color: string, text: string} | null>(null)

  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h)
      const bmi = bmiValue.toFixed(1)
      let category = "", color = "", text = ""
      if (bmiValue < 18.5) {
        category = "Zayıf"; color = "text-blue-500"
        text = "Kilo alman gerekiyor. Kas kütlesi eklemek için kalori fazlası oluşturmalısın."
      } else if (bmiValue < 25) {
        category = "Normal"; color = "text-green-500"
        text = "Kilon boyuna göre normal seviyede. Hedefin kas geliştirmek ise temiz bir bulk planı yapabilirsin."
      } else if (bmiValue < 30) {
        category = "Fazla Kilolu"; color = "text-yellow-500"
        text = "Hafif bir kalori açığı ve ağırlık antrenmanlarıyla yağ oranını düşürmelisin."
      } else {
        category = "Obez"; color = "text-red-500"
        text = "Acilen sıkı bir beslenme programı ve düzenli egzersiz rutini oluşturman gerekiyor."
      }
      setResult({ bmi, category, color, text })
    }
  }

  const InputClass = "w-full bg-[#0A0A0A] border-b-2 border-white/20 px-3 py-3 text-white text-lg font-display focus:outline-none focus:border-primary transition-colors text-center"

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8">
          <ToolsSidebar />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-7 h-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-display font-bold uppercase text-white">
                BMI <span className="text-gray-600">HESAPLAYICI</span>
              </h1>
            </div>

            <div className="bg-[#111] border border-white/10 p-6 shadow-2xl">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 font-sans mb-6 leading-relaxed text-sm">
                    Vücut Kitle İndeksi (BMI), boy ve kilo oranına göre genel durumunu değerlendiren temel bir ölçüttür.
                  </p>
                  <form onSubmit={calculate} className="space-y-5">
                    <div>
                      <label className="block text-center text-primary font-display text-xs tracking-widest mb-2 uppercase">Boyun (cm)</label>
                      <input type="number" required value={height} onChange={(e)=>setHeight(e.target.value)} placeholder="180" className={InputClass} />
                    </div>
                    <div>
                      <label className="block text-center text-primary font-display text-xs tracking-widest mb-2 uppercase">Kilon (kg)</label>
                      <input type="number" step="0.1" required value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="85" className={InputClass} />
                    </div>
                    <button type="submit" className="w-full bg-primary text-black py-3 font-display text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors shadow-[0_0_15px_rgba(245,197,24,0.25)]">
                      SONUCU GÖR
                    </button>
                  </form>
                </div>

                <div className="flex flex-col justify-center border-t xl:border-t-0 xl:border-l border-white/10 pt-8 xl:pt-0 xl:pl-8">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                        <div className="text-gray-400 font-display tracking-widest uppercase mb-2 text-xs">SENİN BMI DEĞERİN</div>
                        <div className={`text-7xl font-display font-bold ${result.color} mb-3`}>{result.bmi}</div>
                        <div className={`text-xl font-display uppercase tracking-wider mb-4 ${result.color}`}>DURUM: {result.category}</div>
                        <p className="text-gray-300 font-sans text-sm border-t border-white/10 pt-4">{result.text}</p>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600 flex flex-col items-center justify-center min-h-[200px]">
                        <Calculator className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-display text-base uppercase tracking-widest">Sonucunu görmek için<br/>değerlerini gir.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
