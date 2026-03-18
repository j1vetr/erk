import { Link, useLocation } from "wouter"
import { Calculator, Activity, Dumbbell, Percent, Grid } from "lucide-react"

export function ToolsSidebar() {
  const [location] = useLocation()
  
  const tools = [
    { name: "Araçlar Merkezi", path: "/araclar", icon: <Grid className="w-5 h-5" /> },
    { name: "BMI Hesaplayıcı", path: "/araclar/bmi", icon: <Calculator className="w-5 h-5" /> },
    { name: "Kalori (TDEE)", path: "/araclar/kalori", icon: <Activity className="w-5 h-5" /> },
    { name: "1RM Maksimum", path: "/araclar/1rm", icon: <Dumbbell className="w-5 h-5" /> },
    { name: "Vücut Analizi", path: "/araclar/vucut-analizi", icon: <Percent className="w-5 h-5" /> },
  ]

  return (
    <div className="w-full lg:w-72 shrink-0 mb-8 lg:mb-0">
      <div className="bg-[#111] border border-white/10 p-6 sticky top-32 shadow-xl">
        <h3 className="font-display text-2xl text-white tracking-widest uppercase mb-6 border-b border-white/10 pb-4">Hızlı Erişim</h3>
        <div className="flex flex-col gap-2">
          {tools.map(tool => {
            const isActive = location === tool.path
            return (
              <Link key={tool.path} href={tool.path} className={`flex items-center gap-4 p-4 font-display tracking-widest uppercase transition-colors text-lg ${
                isActive ? 'bg-primary text-black shadow-[0_0_15px_rgba(245,197,24,0.3)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}>
                {tool.icon}
                {tool.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
