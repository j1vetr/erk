import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ToolsSidebar } from "@/components/layout/ToolsSidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Activity } from "lucide-react"

export default function CaloriePage() {
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("erkek")
  const [activity, setActivity] = useState("1.2")
  const [result, setResult] = useState<{ tdee: number, bmr: number, cut: number, bulk: number } | null>(null)

  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age)
    if (w > 0 && h > 0 && a > 0) {
      let bmr = (10 * w) + (6.25 * h) - (5 * a)
      bmr += (gender === "erkek") ? 5 : -161
      const tdee = Math.round(bmr * parseFloat(activity))
      setResult({ bmr: Math.round(bmr), tdee, cut: tdee - 500, bulk: tdee + 300 })
    }
  }

  const InputClass = "w-full bg-[#0A0A0A] border border-white/20 px-3 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
  const LabelClass = "block text-gray-400 font-display uppercase tracking-widest text-xs mb-1.5"

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8">
          <ToolsSidebar />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-7 h-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-display font-bold uppercase text-white">
                GÜNLÜK KALORİ <span className="text-gray-600">(TDEE)</span>
              </h1>
            </div>

            <div className="bg-[#111] border border-white/10 p-6 shadow-2xl">
              <p className="text-gray-400 font-sans mb-6 text-sm leading-relaxed">
                Toplam Günlük Enerji Harcaması (TDEE), mevcut kilonu korumak için gün içinde harcadığın toplam kaloridir.
              </p>

              <form onSubmit={calculate} className="space-y-5 mb-8 border-b border-white/10 pb-8">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={LabelClass}>Yaş</label>
                    <input type="number" required value={age} onChange={(e)=>setAge(e.target.value)} className={InputClass} />
                  </div>
                  <div>
                    <label className={LabelClass}>Kilo (kg)</label>
                    <input type="number" step="0.1" required value={weight} onChange={(e)=>setWeight(e.target.value)} className={InputClass} />
                  </div>
                  <div>
                    <label className={LabelClass}>Boy (cm)</label>
                    <input type="number" required value={height} onChange={(e)=>setHeight(e.target.value)} className={InputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className={LabelClass}>Cinsiyet</label>
                    <div className="flex gap-3">
                      <label className={`flex-1 py-2.5 border cursor-pointer text-center font-display tracking-widest uppercase transition-colors text-sm ${gender === 'erkek' ? 'bg-primary/20 border-primary text-primary' : 'bg-[#0A0A0A] border-white/20 text-gray-400 hover:border-white/50'}`}>
                        <input type="radio" name="gender" value="erkek" checked={gender === 'erkek'} onChange={() => setGender('erkek')} className="hidden" />
                        Erkek
                      </label>
                      <label className={`flex-1 py-2.5 border cursor-pointer text-center font-display tracking-widest uppercase transition-colors text-sm ${gender === 'kadin' ? 'bg-primary/20 border-primary text-primary' : 'bg-[#0A0A0A] border-white/20 text-gray-400 hover:border-white/50'}`}>
                        <input type="radio" name="gender" value="kadin" checked={gender === 'kadin'} onChange={() => setGender('kadin')} className="hidden" />
                        Kadın
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className={LabelClass}>Aktivite Seviyesi</label>
                    <select value={activity} onChange={(e)=>setActivity(e.target.value)} className={InputClass}>
                      <option value="1.2">Hareketsiz (Masa başı iş, egzersiz yok)</option>
                      <option value="1.375">Hafif Aktif (Haftada 1-3 gün)</option>
                      <option value="1.55">Orta Aktif (Haftada 3-5 gün)</option>
                      <option value="1.725">Çok Aktif (Haftada 6-7 gün)</option>
                      <option value="1.9">Aşırı Aktif (Fiziksel ağır iş + spor)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary text-black py-3 font-display text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors shadow-[0_0_15px_rgba(245,197,24,0.25)]">
                  KALORİ İHTİYACIMI HESAPLA
                </button>
              </form>

              <AnimatePresence>
                {result && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-[#050505] border border-red-500/50 p-5 text-center flex flex-col justify-center">
                      <div className="text-red-500 font-display tracking-widest uppercase mb-3 text-xs">DEFİNASYON<br/><span className="text-[10px] text-gray-500">YAĞ YAKIMI</span></div>
                      <div className="text-4xl font-bold font-display text-white mb-1">{result.cut}</div>
                      <div className="text-xs text-gray-500 font-sans">Kalori / Gün</div>
                    </div>
                    <div className="bg-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(245,197,24,0.15)] p-5 text-center lg:scale-105 z-10 flex flex-col justify-center">
                      <div className="text-primary font-display tracking-widest uppercase mb-3 text-sm">KORUMA<br/><span className="text-[10px] text-gray-400">MEVCUT KİLO</span></div>
                      <div className="text-5xl font-bold font-display text-white mb-1">{result.tdee}</div>
                      <div className="text-xs text-gray-400 font-sans">Kalori / Gün</div>
                      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500 font-sans">BMR: <span className="text-white">{result.bmr} kcal</span></div>
                    </div>
                    <div className="bg-[#050505] border border-green-500/50 p-5 text-center flex flex-col justify-center">
                      <div className="text-green-500 font-display tracking-widest uppercase mb-3 text-xs">BULK<br/><span className="text-[10px] text-gray-500">KAS KAZANIMI</span></div>
                      <div className="text-4xl font-bold font-display text-white mb-1">{result.bulk}</div>
                      <div className="text-xs text-gray-500 font-sans">Kalori / Gün</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
