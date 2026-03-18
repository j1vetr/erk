import { Link, useLocation } from "wouter"
import { Calculator, Activity, Dumbbell, Percent, Grid } from "lucide-react"

export function ToolsSidebar() {
  const [location] = useLocation()
  
  const tools = [
    { name: "Araçlar Merkezi", path: "/araclar", icon: <Grid className="w-4 h-4" /> },
    { name: "BMI Hesaplayıcı", path: "/araclar/bmi", icon: <Calculator className="w-4 h-4" /> },
    { name: "Kalori (TDEE)", path: "/araclar/kalori", icon: <Activity className="w-4 h-4" /> },
    { name: "1RM Maksimum", path: "/araclar/1rm", icon: <Dumbbell className="w-4 h-4" /> },
    { name: "Vücut Analizi", path: "/araclar/vucut-analizi", icon: <Percent className="w-4 h-4" /> },
  ]

  return (
    <div className="w-full lg:w-52 shrink-0 mb-6 lg:mb-0">
      <div className="bg-[#111] border border-white/10 p-4 sticky top-24 shadow-xl">
        <h3 className="font-display text-sm text-white tracking-widest uppercase mb-4 border-b border-white/10 pb-3">Hızlı Erişim</h3>
        <div className="flex flex-col gap-1">
          {tools.map(tool => {
            const isActive = location === tool.path
            return (
              <Link key={tool.path} href={tool.path} className={`flex items-center gap-3 px-3 py-2.5 font-display tracking-wider uppercase transition-colors text-xs ${
                isActive ? 'bg-primary text-black shadow-[0_0_10px_rgba(245,197,24,0.25)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
