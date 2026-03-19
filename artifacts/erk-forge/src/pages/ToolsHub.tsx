import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { Calculator, Activity, Dumbbell, Percent, PieChart, Target, Droplets, Heart } from "lucide-react"
import { Link } from "wouter"
import { SEO } from "@/hooks/useSEO"
import { useLanguage } from "@/i18n/LanguageContext"

const toolPaths = [
  { path: "/araclar/bmi", icon: <Calculator className="w-8 h-8" />, color: "from-blue-500 to-cyan-400" },
  { path: "/araclar/kalori", icon: <Activity className="w-8 h-8" />, color: "from-green-500 to-emerald-400" },
  { path: "/araclar/1rm", icon: <Dumbbell className="w-8 h-8" />, color: "from-primary to-orange-500" },
  { path: "/araclar/vucut-analizi", icon: <Percent className="w-8 h-8" />, color: "from-purple-500 to-indigo-400" },
  { path: "/araclar/makro", icon: <PieChart className="w-8 h-8" />, color: "from-green-400 to-lime-400" },
  { path: "/araclar/ideal-kilo", icon: <Target className="w-8 h-8" />, color: "from-blue-400 to-sky-400" },
  { path: "/araclar/su-ihtiyaci", icon: <Droplets className="w-8 h-8" />, color: "from-cyan-400 to-blue-500" },
  { path: "/araclar/nabiz-bolgesi", icon: <Heart className="w-8 h-8" />, color: "from-red-500 to-orange-400" },
]

export default function ToolsHub() {
  const { t, lang } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col">
      <Navbar />

      <SEO
        title={t.seo.toolsHubTitle}
        description={t.seo.toolsHubDesc}
        canonical="/araclar"
      />
      <div className="flex-1 flex flex-col items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl w-full relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary font-display text-xs uppercase tracking-[0.25em]">
                {lang === "en" ? "8 Tools" : "8 Araç"}
              </span>
              <div className="h-px w-10 bg-primary/60" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-display font-bold uppercase text-white mb-4 leading-none"
            >
              {t.toolsHub.heading1} <span className="text-primary">{t.toolsHub.heading2}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-sm text-white/40 font-sans max-w-xl mx-auto leading-relaxed"
            >
              {t.toolsHub.sub}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {t.toolsHub.tools.map((tool, idx) => (
              <Link key={idx} href={toolPaths[idx].path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 + 0.15 }}
                  whileHover={{ y: -4 }}
                  className="block group relative bg-[#0D0D0D] border border-white/10 p-6 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className={`absolute -right-10 -top-10 w-36 h-36 bg-gradient-to-br ${toolPaths[idx].color} blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="text-white/60 group-hover:text-primary transition-colors">
                      {toolPaths[idx].icon}
                    </div>
                    <span className="text-[10px] font-display uppercase tracking-widest text-white/25 border border-white/12 px-2.5 py-1">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl uppercase text-white mb-2 tracking-wider group-hover:text-white transition-colors">{tool.title}</h3>
                  <p className="text-white/40 font-sans text-sm leading-relaxed mb-5">{tool.desc}</p>

                  <div className="font-display text-primary tracking-widest text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t.shared.calculate.toUpperCase()} <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center gap-5 justify-between"
          >
            <div>
              <div className="font-display text-primary uppercase tracking-widest text-xs mb-1.5">{t.toolsHub.cta}</div>
              <p className="text-white/60 font-sans text-sm">{t.toolsHub.ctaDesc}</p>
            </div>
            <Link href="/#contact">
              <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-6 py-3 hover:bg-white transition-all duration-300 text-sm whitespace-nowrap shadow-[0_0_20px_rgba(245,197,24,0.2)]">
                {t.toolsHub.ctaBtn} →
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
