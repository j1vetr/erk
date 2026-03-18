import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Activity, Dumbbell } from "lucide-react"
import { ForgeButton } from "@/components/ui/forge-button"

export function Tools() {
  const [activeTab, setActiveTab] = useState<"bmi" | "tdee" | "1rm">("1rm")

  // --- BMI State ---
  const [bmiHeight, setBmiHeight] = useState("")
  const [bmiWeight, setBmiWeight] = useState("")
  const [bmiResult, setBmiResult] = useState<string | null>(null)
  
  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault()
    const h = parseFloat(bmiHeight) / 100
    const w = parseFloat(bmiWeight)
    if (h > 0 && w > 0) {
      const bmi = (w / (h * h)).toFixed(1)
      let category = ""
      if (Number(bmi) < 18.5) category = "Underweight"
      else if (Number(bmi) < 25) category = "Normal Weight"
      else if (Number(bmi) < 30) category = "Overweight"
      else category = "Obese"
      setBmiResult(`Your BMI is ${bmi} - ${category}`)
    }
  }

  // --- 1RM State ---
  const [rmWeight, setRmWeight] = useState("")
  const [rmReps, setRmReps] = useState("")
  const [rmResult, setRmResult] = useState<string | null>(null)

  const calculate1RM = (e: React.FormEvent) => {
    e.preventDefault()
    const w = parseFloat(rmWeight)
    const r = parseFloat(rmReps)
    if (w > 0 && r > 0) {
      // Epley Formula
      const max = Math.round(w * (1 + r / 30))
      setRmResult(`Estimated 1 Rep Max: ${max} kg/lbs`)
    }
  }

  // --- TDEE State ---
  const [tAge, setTAge] = useState("")
  const [tWeight, setTWeight] = useState("")
  const [tHeight, setTHeight] = useState("")
  const [tGender, setTGender] = useState("male")
  const [tActivity, setTActivity] = useState("1.2") // Sedentary default
  const [tResult, setTResult] = useState<string | null>(null)

  const calculateTDEE = (e: React.FormEvent) => {
    e.preventDefault()
    const w = parseFloat(tWeight)
    const h = parseFloat(tHeight)
    const a = parseFloat(tAge)
    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a)
      bmr += (tGender === "male") ? 5 : -161
      const tdee = Math.round(bmr * parseFloat(tActivity))
      setTResult(`Maintenance Calories: ${tdee} kcal/day`)
    }
  }

  const InputClass = "w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-sans"

  return (
    <section id="tools" className="py-24 bg-background border-y border-white/5 relative overflow-hidden">
      {/* Decorative fire glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-primary font-display uppercase tracking-widest mb-2">The Arsenal</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6">Iron Forged <span className="text-white">Calculators</span></h3>
          <p className="text-gray-400 max-w-2xl mx-auto">Precision matters. Use these tools to calculate your baselines before we build the program.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveTab("1rm")}
            className={`px-6 py-3 font-display uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all ${activeTab === '1rm' ? 'bg-primary text-white' : 'metal-panel text-gray-400 hover:text-white hover:border-primary/50'}`}
          >
            <Dumbbell className="w-4 h-4" /> 1 Rep Max
          </button>
          <button 
            onClick={() => setActiveTab("tdee")}
            className={`px-6 py-3 font-display uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all ${activeTab === 'tdee' ? 'bg-primary text-white' : 'metal-panel text-gray-400 hover:text-white hover:border-primary/50'}`}
          >
            <Activity className="w-4 h-4" /> TDEE Calories
          </button>
          <button 
            onClick={() => setActiveTab("bmi")}
            className={`px-6 py-3 font-display uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all ${activeTab === 'bmi' ? 'bg-primary text-white' : 'metal-panel text-gray-400 hover:text-white hover:border-primary/50'}`}
          >
            <Calculator className="w-4 h-4" /> BMI
          </button>
        </div>

        {/* Calculator Panels */}
        <div className="metal-panel border border-white/10 p-6 md:p-10 max-w-3xl mx-auto relative overflow-hidden">
          
          {/* 1RM Calculator */}
          {activeTab === "1rm" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h4 className="text-2xl font-display uppercase text-white mb-6">Calculate 1 Rep Max</h4>
              <form onSubmit={calculate1RM} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Weight Lifted</label>
                    <input type="number" step="0.1" required value={rmWeight} onChange={(e)=>setRmWeight(e.target.value)} placeholder="e.g. 100" className={InputClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Repetitions</label>
                    <input type="number" required value={rmReps} onChange={(e)=>setRmReps(e.target.value)} placeholder="e.g. 8" className={InputClass} />
                  </div>
                </div>
                <ForgeButton type="submit" className="w-full">Calculate Strength</ForgeButton>
              </form>
              {rmResult && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/30 text-primary text-center font-display text-2xl uppercase tracking-wider rounded-sm animate-in fade-in zoom-in">
                  {rmResult}
                </div>
              )}
            </motion.div>
          )}

          {/* TDEE Calculator */}
          {activeTab === "tdee" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h4 className="text-2xl font-display uppercase text-white mb-6">Calculate Daily Calories (TDEE)</h4>
              <form onSubmit={calculateTDEE} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Age</label>
                    <input type="number" required value={tAge} onChange={(e)=>setTAge(e.target.value)} className={InputClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Weight (kg)</label>
                    <input type="number" step="0.1" required value={tWeight} onChange={(e)=>setTWeight(e.target.value)} className={InputClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Height (cm)</label>
                    <input type="number" required value={tHeight} onChange={(e)=>setTHeight(e.target.value)} className={InputClass} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Gender</label>
                    <select value={tGender} onChange={(e)=>setTGender(e.target.value)} className={InputClass}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Activity Level</label>
                    <select value={tActivity} onChange={(e)=>setTActivity(e.target.value)} className={InputClass}>
                      <option value="1.2">Sedentary (Little/No Exercise)</option>
                      <option value="1.375">Lightly Active (1-3 days/week)</option>
                      <option value="1.55">Moderately Active (3-5 days/week)</option>
                      <option value="1.725">Very Active (6-7 days/week)</option>
                      <option value="1.9">Extra Active (Hard physical job)</option>
                    </select>
                  </div>
                </div>

                <ForgeButton type="submit" className="w-full">Calculate Calories</ForgeButton>
              </form>
              {tResult && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/30 text-primary text-center font-display text-2xl uppercase tracking-wider rounded-sm animate-in fade-in zoom-in">
                  {tResult}
                </div>
              )}
            </motion.div>
          )}

          {/* BMI Calculator */}
          {activeTab === "bmi" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h4 className="text-2xl font-display uppercase text-white mb-6">Calculate Body Mass Index</h4>
              <form onSubmit={calculateBMI} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Height (cm)</label>
                    <input type="number" required value={bmiHeight} onChange={(e)=>setBmiHeight(e.target.value)} placeholder="e.g. 180" className={InputClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Weight (kg)</label>
                    <input type="number" step="0.1" required value={bmiWeight} onChange={(e)=>setBmiWeight(e.target.value)} placeholder="e.g. 85" className={InputClass} />
                  </div>
                </div>
                <ForgeButton type="submit" className="w-full">Calculate BMI</ForgeButton>
              </form>
              {bmiResult && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/30 text-primary text-center font-display text-xl uppercase tracking-wider rounded-sm animate-in fade-in zoom-in">
                  {bmiResult}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
