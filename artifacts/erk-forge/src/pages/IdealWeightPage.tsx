import { useState, useRef } from "react"
import { SEO } from "@/hooks/useSEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Scale, ChevronRight, ArrowRight, Info, CheckCircle2, Target } from "lucide-react"
import { Link } from "wouter"
import { useLanguage } from "@/i18n/LanguageContext"

export default function IdealWeightPage() {
  const { t, lang } = useLanguage()
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("erkek")
  const [frame, setFrame] = useState("orta")
  const [result, setResult] = useState<{
    devine: number; robinson: number; miller: number; hamwi: number; avg: number; current?: number; diff?: number
  } | null>(null)
  const [currentWeight, setCurrentWeight] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)

  const calculate = () => {
    const h = parseFloat(height)
    if (h <= 0) return
    const hInches = h / 2.54
    const excessInches = Math.max(0, hInches - 60)
    const frameAdj = frame === "ince" ? -2.5 : frame === "genis" ? 2.5 : 0

    const isMale = gender === "erkek"
    const devine = Math.round((isMale ? 50 + 2.3 * excessInches : 45.5 + 2.3 * excessInches) + frameAdj)
    const robinson = Math.round((isMale ? 52 + 1.9 * excessInches : 49 + 1.7 * excessInches) + frameAdj)
    const miller = Math.round((isMale ? 56.2 + 1.41 * excessInches : 53.1 + 1.36 * excessInches) + frameAdj)
    const hamwi = Math.round((isMale ? 48 + 2.7 * excessInches : 45.4 + 2.27 * excessInches) + frameAdj)
    const avg = Math.round((devine + robinson + miller + hamwi) / 4)

    const cw = parseFloat(currentWeight)
    const res: typeof result = { devine, robinson, miller, hamwi, avg }
    if (cw > 0) {
      res.current = cw
      res.diff = Math.round((cw - avg) * 10) / 10
    }
    setResult(res)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)
  }

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-2xl font-display text-center outline-none transition-all placeholder:text-white/20"

  const frames = [
    { id: "ince", label: "İnce Kemik", icon: "🦴" },
    { id: "orta", label: "Orta Kemik", icon: "⚖️" },
    { id: "genis", label: "Geniş Kemik", icon: "💪" },
  ]

  const formulas = result ? [
    { label: "Devine Formülü", val: result.devine, desc: "Tıbbi standart — en yaygın kullanılan" },
    { label: "Robinson Formülü", val: result.robinson, desc: "Boy oranı bazlı hesaplama" },
    { label: "Miller Formülü", val: result.miller, desc: "Daha düşük kilo aralığı öngörür" },
    { label: "Hamwi Formülü", val: result.hamwi, desc: "Klinik diyet danışmanlığında kullanılır" },
  ] : []

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="İdeal Kilo Hesaplayıcı | Sağlıklı Kilo Aralığın"
        description="Boyuna ve cinsiyetine göre ideal kilonu öğren. Devine, Robinson, Miller ve Hamwi formülleriyle bilimsel ideal kilo hesaplama."
        canonical="/araclar/ideal-kilo"
      />
      <Navbar />

      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 via-primary/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">İdeal Kilo Hesaplayıcı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                İdeal Kilo <span className="text-primary">Hesaplayıcı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                4 farklı bilimsel formülle boyuna ve kemik yapına özel ideal kilo aralığını öğren. Hedefini sayıya döküp planla.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Formüller", val: "4 Farklı" },
              { label: "Değişken", val: "Boy + Kemik Yapı" },
              { label: "Cinsiyet", val: "Erkek / Kadın" },
            ].map((pill) => (
              <div key={pill.label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-white/50 font-sans">{pill.label}:</span>
                <span className="text-white font-sans font-medium">{pill.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Form */}
            <div className="lg:col-span-3 space-y-5">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                <h2 className="font-display text-lg uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/8">Bilgilerini Gir</h2>

                {/* Cinsiyet */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">1</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Cinsiyet</label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["erkek", "kadin"].map((g) => (
                      <button key={g} onClick={() => setGender(g)}
                        className={`py-3.5 border-2 font-display text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${gender === g ? "bg-primary/15 border-primary text-primary" : "bg-black border-white/15 text-white/50 hover:border-white/40"}`}>
                        <span>{g === "erkek" ? "👨" : "👩"}</span>
                        {g === "erkek" ? "Erkek" : "Kadın"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Boy */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">2</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Boyun</label>
                  </div>
                  <div className="relative">
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="180" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-lg">cm</span>
                  </div>
                </div>

                {/* Kemik yapısı */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-display text-sm font-bold">3</div>
                    <label className="font-display text-white uppercase tracking-widest text-sm">Kemik Yapın</label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {frames.map((f) => (
                      <button key={f.id} onClick={() => setFrame(f.id)}
                        className={`py-4 border-2 font-display text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-2 ${frame === f.id ? "bg-primary/15 border-primary text-primary" : "bg-black border-white/15 text-white/50 hover:border-white/40"}`}>
                        <span className="text-xl">{f.icon}</span>
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-white/30 font-sans text-xs mt-2 ml-0">Emin değilsen bileğinin çevresine bak: E: &lt;16cm=ince, 16–18=orta, &gt;18=geniş</p>
                </div>

                {/* Mevcut kilo (opsiyonel) */}
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-white/15 text-white/50 flex items-center justify-center font-display text-sm font-bold">4</div>
                    <label className="font-display text-white/60 uppercase tracking-widest text-sm">Şu Anki Kilonu <span className="text-white/30 normal-case font-sans text-xs">(opsiyonel)</span></label>
                  </div>
                  <div className="relative">
                    <input type="number" step="0.1" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} placeholder="85" className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-display text-lg">kg</span>
                  </div>
                  <p className="text-white/30 font-sans text-xs mt-2">Girersen hedefe olan farkı da göreceksin</p>
                </div>

                <button onClick={calculate} disabled={!height}
                  className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3">
                  İdeal Kiloma Bak <Scale className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

                    {/* Main card */}
                    <div className="bg-[#0D0D0D] border-2 border-primary/50 p-7 text-center shadow-[0_0_30px_rgba(245,197,24,0.08)]">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">Ortalama İdeal Kilonu</div>
                      <div className="text-8xl font-display font-bold text-primary leading-none mb-1">{result.avg}</div>
                      <div className="text-white/40 font-display text-lg uppercase tracking-widest mb-4">KG</div>

                      {result.diff !== undefined && result.current !== undefined && (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 border font-display text-sm uppercase tracking-wider ${
                          result.diff > 0 ? "border-red-500/40 bg-red-500/8 text-red-400" :
                          result.diff < 0 ? "border-blue-500/40 bg-blue-500/8 text-blue-400" :
                          "border-green-500/40 bg-green-500/8 text-green-400"
                        }`}>
                          {result.diff === 0 ? "İdeal Kilodasın!" :
                           result.diff > 0 ? `${Math.abs(result.diff)} kg fazlan var` :
                           `${Math.abs(result.diff)} kg eksik`}
                        </div>
                      )}
                    </div>

                    {/* Formulas */}
                    <div className="bg-[#0D0D0D] border border-white/10 p-5">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-4 pb-3 border-b border-white/8">Formül Bazlı Sonuçlar</div>
                      <div className="space-y-3">
                        {formulas.map((f, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                            className="flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="text-white/70 font-display text-xs uppercase tracking-wider truncate">{f.label}</div>
                              <div className="text-white/30 font-sans text-[10px] truncate">{f.desc}</div>
                            </div>
                            <div className={`font-display text-xl font-bold flex-shrink-0 ${f.val === result.avg ? "text-primary" : "text-white/60"}`}>
                              {f.val} <span className="text-xs text-white/30">kg</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/8 border border-primary/25 p-4 flex gap-3">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-white/55 font-sans text-xs leading-relaxed">
                        Bu değerler referans noktasıdır. Kas kütlesi yüksek sporcular için ideal kilo daha yüksek olabilir. Yağ oranı her zaman daha güvenilir bir ölçüttür.
                      </p>
                    </div>

                    <button onClick={() => setResult(null)} className="w-full py-3 border border-white/15 text-white/50 font-display text-xs uppercase tracking-widest hover:border-white/40 transition-all">
                      Yeniden Hesapla
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/4 flex items-center justify-center mb-6">
                      <Scale className="w-10 h-10 text-white/15" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-3">4 Formül</div>
                    <p className="text-white/20 font-sans text-sm max-w-xs leading-relaxed">
                      Boy ve kemik yapını girince 4 farklı formülle ideal kilonu hesaplayacağım.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    Hedef <span className="text-primary">{result.avg} kg</span> — Oraya Ulaş
                  </h3>
                  <p className="text-white/55 font-sans text-sm">Kişisel koçlukla hedefe giden yolu adım adım planlayalım.</p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    Plan Oluştur <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-14">
            <div className="text-white/30 font-display uppercase tracking-widest text-xs mb-5">Diğer Araçlar</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <div className="bg-[#0D0D0D] border border-white/8 hover:border-primary/40 p-5 transition-all duration-300 group cursor-pointer">
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="font-display text-white uppercase tracking-wider text-sm group-hover:text-primary transition-colors mb-1">{tool.name}</div>
                    <div className="text-white/35 font-sans text-xs">{tool.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
