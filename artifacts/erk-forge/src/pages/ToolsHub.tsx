import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { Calculator, Activity, Dumbbell, Percent } from "lucide-react"
import { Link } from "wouter"

export default function ToolsHub() {
  const tools = [
    {
      title: "BMI Hesaplayıcı",
      desc: "Vücut Kitle İndeksini hesapla ve genel sağlık durumun hakkında fikir edin.",
      icon: <Calculator className="w-8 h-8" />,
      path: "/araclar/bmi",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Günlük Kalori (TDEE)",
      desc: "Amacına ulaşmak için günlük alman gereken kalori ve makro miktarını bul.",
      icon: <Activity className="w-8 h-8" />,
      path: "/araclar/kalori",
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "1RM Maksimum",
      desc: "Farklı tekrarlardaki ağırlıklarına göre tahmini 1 tekrar maksimumunu öğren.",
      icon: <Dumbbell className="w-8 h-8" />,
      path: "/araclar/1rm",
      color: "from-primary to-orange-500"
    },
    {
      title: "Vücut Yağ Oranı",
      desc: "Donanma formülü ile yaklaşık vücut yağ oranını ve yağsız vücut kütleni hesapla.",
      icon: <Percent className="w-8 h-8" />,
      path: "/araclar/vucut-analizi",
      color: "from-purple-500 to-indigo-400"
    }
  ]

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl w-full relative z-10">
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-3"
            >
              FORGE <span className="text-primary">ARAÇLARI</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-400 font-sans max-w-xl mx-auto"
            >
              Planlamanın temeli veridir. Hedeflerine giden yolda ihtiyaç duyduğun tüm hesaplamaları buradan yapabilirsin.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <Link key={idx} href={tool.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.15 }}
                  whileHover={{ y: -4 }}
                  className="block group relative bg-[#111] border border-white/10 p-6 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className={`absolute -right-10 -top-10 w-28 h-28 bg-gradient-to-br ${tool.color} blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className="text-white group-hover:text-primary transition-colors mb-4">
                    {tool.icon}
                  </div>
                  
                  <h3 className="font-display text-xl uppercase text-white mb-2 tracking-wider">{tool.title}</h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">{tool.desc}</p>
                  
                  <div className="mt-5 font-display text-primary tracking-widest text-xs flex items-center gap-2">
                    HESAPLA <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
