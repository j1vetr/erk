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
      icon: <Calculator className="w-12 h-12" />,
      path: "/araclar/bmi",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Günlük Kalori (TDEE)",
      desc: "Amacına ulaşmak için günlük alman gereken kalori ve makro miktarını bul.",
      icon: <Activity className="w-12 h-12" />,
      path: "/araclar/kalori",
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "1RM Maksimum",
      desc: "Farklı tekrarlardaki ağırlıklarına göre tahmini 1 tekrar maksimumunu öğren.",
      icon: <Dumbbell className="w-12 h-12" />,
      path: "/araclar/1rm",
      color: "from-primary to-orange-500"
    },
    {
      title: "Vücut Yağ Oranı",
      desc: "Donanma formülü ile yaklaşık vücut yağ oranını ve yağsız vücut kütleni hesapla.",
      icon: <Percent className="w-12 h-12" />,
      path: "/araclar/vucut-analizi",
      color: "from-purple-500 to-indigo-400"
    }
  ]

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl w-full relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-bold uppercase text-white mb-6"
            >
              FORGE <span className="text-primary">ARAÇLARI</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 font-sans max-w-2xl mx-auto"
            >
              Planlamanın temeli veridir. Hedeflerine giden yolda ihtiyaç duyduğun tüm hesaplamaları buradan yapabilirsin.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, idx) => (
              <Link key={idx} href={tool.path}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  whileHover={{ y: -10 }}
                  className="block group relative bg-[#111] border border-white/10 p-10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {/* Hover background effect */}
                  <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${tool.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="text-white group-hover:text-primary transition-colors mb-6">
                    {tool.icon}
                  </div>
                  
                  <h3 className="font-display text-3xl uppercase text-white mb-4 tracking-wider">{tool.title}</h3>
                  <p className="text-gray-400 font-sans text-lg">{tool.desc}</p>
                  
                  <div className="mt-8 font-display text-primary tracking-widest text-sm flex items-center gap-2">
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
