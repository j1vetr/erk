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
      
      let category = ""
      let color = ""
      let text = ""
      
      if (bmiValue < 18.5) {
        category = "Zayıf"
        color = "text-blue-500"
        text = "Kilo alman gerekiyor. Kas kütlesi eklemek için kalori fazlası oluşturmalısın."
      } else if (bmiValue < 25) {
        category = "Normal"
        color = "text-green-500"
        text = "Kilon boyuna göre normal seviyede. Hedefin kas geliştirmek ise temiz bir bulk planı yapabilirsin."
      } else if (bmiValue < 30) {
        category = "Fazla Kilolu"
        color = "text-yellow-500"
        text = "Hafif bir kalori açığı ve ağırlık antrenmanlarıyla yağ oranını düşürmelisin."
      } else {
        category = "Obez"
        color = "text-red-500"
        text = "Acilen sıkı bir beslenme programı ve düzenli egzersiz rutini oluşturman gerekiyor."
      }
      
      setResult({ bmi, category, color, text })
    }
  }

  const InputClass = "w-full bg-[#0A0A0A] border-b-2 border-white/20 px-4 py-4 text-white text-2xl font-display focus:outline-none focus:border-primary transition-colors text-center"

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10 z-10">
          
          <ToolsSidebar />

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10">
              <Calculator className="w-12 h-12 text-primary" />
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-white">
                BMI <span className="text-gray-600">HESAPLAYICI</span>
              </h1>
            </div>

            <div className="bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                
                {/* Form */}
                <div>
                  <p className="text-gray-400 font-sans mb-8 leading-relaxed text-lg">
                    Vücut Kitle İndeksi (BMI), boy ve kilo oranına göre genel durumunu değerlendiren temel bir ölçüttür. Gelişimini takip etmek için bir başlangıç noktasıdır.
                  </p>
                  
                  <form onSubmit={calculate} className="space-y-8">
                    <div>
                      <label className="block text-center text-primary font-display text-xl tracking-widest mb-2 uppercase">Boyun (cm)</label>
                      <input 
                        type="number" 
                        required 
                        value={height} 
                        onChange={(e)=>setHeight(e.target.value)} 
                        placeholder="180" 
                        className={InputClass} 
                      />
                    </div>
                    <div>
                      <label className="block text-center text-primary font-display text-xl tracking-widest mb-2 uppercase">Kilon (kg)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        required 
                        value={weight} 
                        onChange={(e)=>setWeight(e.target.value)} 
                        placeholder="85" 
                        className={InputClass} 
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-primary text-black py-5 font-display text-2xl uppercase tracking-widest font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(245,197,24,0.3)]"
                    >
                      SONUCU GÖR
                    </button>
                  </form>
                </div>

                {/* Result */}
                <div className="flex flex-col justify-center border-t xl:border-t-0 xl:border-l border-white/10 pt-10 xl:pt-0 xl:pl-12">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <div className="text-gray-400 font-display tracking-widest uppercase mb-2">SENİN BMI DEĞERİN</div>
                        <div className={`text-8xl md:text-9xl font-display font-bold ${result.color} mb-4 drop-shadow-[0_0_15px_rgba(currentColor,0.5)]`}>
                          {result.bmi}
                        </div>
                        <div className={`text-3xl font-display uppercase tracking-wider mb-6 ${result.color}`}>
                          DURUM: {result.category}
                        </div>
                        <p className="text-gray-300 font-sans text-lg border-t border-white/10 pt-6">
                          {result.text}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-600 flex flex-col items-center justify-center h-full min-h-[300px]"
                      >
                        <Calculator className="w-24 h-24 mb-6 opacity-20" />
                        <p className="font-display text-3xl uppercase tracking-widest">Sonucunu görmek için<br/>değerlerini gir.</p>
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
