import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Percent, ChevronRight, ArrowRight, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { SEO } from "@/hooks/useSEO"
import { Link } from "wouter"

const otherTools = [
  { name: "BMI Hesaplayıcı", desc: "Boy-kilo oranını öğren", href: "/araclar/bmi", icon: "📏" },
  { name: "Kalori & TDEE", desc: "Günlük kalori ihtiyacın", href: "/araclar/kalori", icon: "🔥" },
  { name: "1RM Hesaplayıcı", desc: "Maksimum kaldırma gücün", href: "/araclar/1rm", icon: "🏋️" },
]

const measureGuide = [
  { label: "Boyun Çevresi", hint: "Adem elmasının hemen altından, yere paralel", icon: "📐" },
  { label: "Bel Çevresi", hint: "Göbek deliği hizasından, nefes verince ölç", icon: "📏" },
  { label: "Kalça Çevresi", hint: "(Sadece Kadınlar) En geniş yerinden, ayaklar kapalı", icon: "📊" },
]

const getCategory = (bf: number, gender: string) => {
  if (gender === "erkek") {
    if (bf < 6) return { cat: "Esansiyel Yağ", color: "text-blue-400", bgColor: "border-blue-500/40", ideal: false, detail: "Bu aralık uzun süre sürdürülemez. Spor dünyasında yalnızca yarışma dönemlerinde görülür." }
    if (bf < 14) return { cat: "Atletik — Define", color: "text-primary", bgColor: "border-primary/50", ideal: true, detail: "Erkekler için olası en iyi vücut kompozisyonu. Kaslar belirgin, damarlanma başlamış." }
    if (bf < 18) return { cat: "Fit / Sağlıklı", color: "text-green-400", bgColor: "border-green-500/40", ideal: true, detail: "Kas hatları görünür, karın kasları belirginleşmeye başlar. Çoğu erkek için hedef aralık." }
    if (bf < 25) return { cat: "Kabul Edilebilir", color: "text-yellow-400", bgColor: "border-yellow-500/40", ideal: false, detail: "Sağlık riski düşük ama görsel olarak yağ belirgin. Definasyon çalışması fayda sağlar." }
    return { cat: "Obezite", color: "text-red-400", bgColor: "border-red-500/40", ideal: false, detail: "Sağlık riskleri artmış. Yapılandırılmış beslenme ve egzersiz programı başlatılmalı." }
  } else {
    if (bf < 14) return { cat: "Esansiyel Yağ", color: "text-blue-400", bgColor: "border-blue-500/40", ideal: false, detail: "Kadınlar için tehlikeli düşük aralık. Hormonal sorunlara yol açabilir." }
    if (bf < 21) return { cat: "Atletik — Define", color: "text-primary", bgColor: "border-primary/50", ideal: true, detail: "Kadın atletler için ideal aralık. Güçlü görünüm ve sağlıklı hormon dengesi." }
    if (bf < 25) return { cat: "Fit / Sağlıklı", color: "text-green-400", bgColor: "border-green-500/40", ideal: true, detail: "Sağlıklı ve sürdürülebilir aralık. Çoğu kadın için ideal hedef bölge." }
    if (bf < 32) return { cat: "Kabul Edilebilir", color: "text-yellow-400", bgColor: "border-yellow-500/40", ideal: false, detail: "Genel sağlık riskleri düşük fakat ideal aralığın üstünde." }
    return { cat: "Obezite", color: "text-red-400", bgColor: "border-red-500/40", ideal: false, detail: "Sağlık riskleri yüksek. Profesyonel destek ile başlamak önerilir." }
  }
}

export default function BodyFatPage() {
  const [gender, setGender] = useState("erkek")
  const [height, setHeight] = useState("")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hipVal, setHipVal] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [showGuide, setShowGuide] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    const h = parseFloat(height), n = parseFloat(neck), w = parseFloat(waist)
    if (h > 0 && n > 0 && w > 0) {
      let bf = 0
      if (gender === "erkek") {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
      } else {
        const hp = parseFloat(hipVal)
        if (hp > 0) bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
      }
      if (!isNaN(bf)) {
        setResult(Math.max(1, Math.min(60, bf)))
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120)
      }
    }
  }

  const inputClass = "w-full bg-black border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary/30 px-5 py-4 text-white text-xl font-display text-center outline-none transition-all placeholder:text-white/20"
  const labelClass = "block text-primary font-display text-xs tracking-widest uppercase mb-2"

  const cat = result !== null ? getCategory(result, gender) : null

  const idealRanges: Record<string, [number, number]> = {
    erkek: [6, 18],
    kadin: [14, 25],
  }
  const [idealMin, idealMax] = idealRanges[gender]
  const bfPosition = result !== null ? Math.min(100, Math.max(0, ((result - 2) / 48) * 100)) : 0

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title="Vücut Yağ Oranı Hesaplayıcı | Yağsız Kütle Analizi"
        description="ABD Donanması formülüyle vücut yağ oranını ve yağsız vücut kütleni hesapla. Hangi kategoride olduğunu ve ideal hedefini öğren."
        canonical="/araclar/vucut-analizi"
      />
      <Navbar />

      {/* ── Dramatic Header ── */}
      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/7 via-blue-500/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/araclar" className="hover:text-primary transition-colors">Araçlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Vücut Yağ Oranı</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Percent className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none mb-3">
                Vücut Yağ <span className="text-primary">Oranı</span>
              </h1>
              <p className="text-white/55 font-sans text-base max-w-xl leading-relaxed">
                ABD Donanması formülüyle sadece bir mezura kullanarak vücut yağ oranını hesapla. Teraziden çok daha anlamlı bir ölçüt.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { label: "Formül", val: "US Navy Method" },
              { label: "Araç", val: "Sadece Mezura" },
              { label: "Doğruluk", val: "±3% Sapma" },
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

      {/* ── Main Content ── */}
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Form */}
            <div className="lg:col-span-3 space-y-5">
              <div className="bg-[#0D0D0D] border border-white/10 p-7">
                {/* Cinsiyet */}
                <div className="mb-6">
                  <label className={labelClass}>Cinsiyet</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["erkek", "kadin"].map((g) => (
                      <button key={g} type="button" onClick={() => setGender(g)}
                        className={`py-3.5 border-2 font-display text-sm uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                          gender === g ? "bg-primary/15 border-primary text-primary" : "bg-black border-white/15 text-white/50 hover:border-white/40"
                        }`}>
                        <span>{g === "erkek" ? "👨" : "👩"}</span>
                        {g === "erkek" ? "Erkek" : "Kadın"}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={calculate} className="space-y-5">
                  {/* Boy */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center font-display text-xs font-bold flex-shrink-0">1</div>
                      <label className="font-display text-white uppercase tracking-widest text-xs">Boy (cm)</label>
                    </div>
                    <div className="relative">
                      <input type="number" step="0.5" required value={height} onChange={(e) => setHeight(e.target.value)} placeholder="180" className={inputClass} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">cm</span>
                    </div>
                  </div>

                  {/* Boyun */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center font-display text-xs font-bold flex-shrink-0">2</div>
                      <label className="font-display text-white uppercase tracking-widest text-xs">Boyun Çevresi (cm)</label>
                    </div>
                    <div className="relative">
                      <input type="number" step="0.1" required value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="38" className={inputClass} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">cm</span>
                    </div>
                    <p className="text-white/30 font-sans text-xs mt-1.5 ml-9">Adem elmasının hemen altından, yere paralel</p>
                  </div>

                  {/* Bel */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center font-display text-xs font-bold flex-shrink-0">3</div>
                      <label className="font-display text-white uppercase tracking-widest text-xs">Bel Çevresi (cm)</label>
                    </div>
                    <div className="relative">
                      <input type="number" step="0.1" required value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="85" className={inputClass} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">cm</span>
                    </div>
                    <p className="text-white/30 font-sans text-xs mt-1.5 ml-9">Göbek deliği hizasından, nefes verince ölç</p>
                  </div>

                  {/* Kalça (kadın) */}
                  <AnimatePresence>
                    {gender === "kadin" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center font-display text-xs font-bold flex-shrink-0">4</div>
                          <label className="font-display text-white uppercase tracking-widest text-xs">Kalça Çevresi (cm)</label>
                        </div>
                        <div className="relative">
                          <input type="number" step="0.1" required value={hipVal} onChange={(e) => setHipVal(e.target.value)} placeholder="95" className={inputClass} />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-display">cm</span>
                        </div>
                        <p className="text-white/30 font-sans text-xs mt-1.5 ml-9">Kalçanın en geniş yerinden, ayaklar kapalı</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" className="w-full bg-primary text-black py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(245,197,24,0.25)] flex items-center justify-center gap-3">
                    Yağ Oranımı Hesapla <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Ölçüm kılavuzu */}
              <div className="bg-[#0D0D0D] border border-white/8 p-5">
                <button onClick={() => setShowGuide(!showGuide)} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary/60" />
                    <span className="font-display text-xs uppercase tracking-widest text-white/50">Doğru Ölçüm Nasıl Yapılır?</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-white/30 transition-transform ${showGuide ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {showGuide && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3">
                      {measureGuide.map((g) => (
                        <div key={g.label} className="flex gap-3">
                          <span className="text-lg">{g.icon}</span>
                          <div>
                            <div className="text-white/70 font-display text-xs uppercase tracking-wider mb-0.5">{g.label}</div>
                            <div className="text-white/35 font-sans text-xs">{g.hint}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2" ref={resultRef}>
              <AnimatePresence mode="wait">
                {result !== null && cat ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    {/* Dial + main result */}
                    <div className={`bg-[#0D0D0D] border-2 ${cat.bgColor} p-7 text-center`}>
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-5">Vücut Yağ Oranın</div>

                      {/* SVG Gauge */}
                      <div className="relative inline-flex items-center justify-center mb-5">
                        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a1a" strokeWidth="8" />
                          <motion.circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="251"
                            initial={{ strokeDashoffset: 251 }}
                            animate={{ strokeDashoffset: 251 - (251 * Math.min(result, 50)) / 50 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            style={{ filter: "drop-shadow(0 0 6px rgba(245,197,24,0.6))" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-4xl font-bold text-white leading-none">%{result.toFixed(1)}</span>
                          <span className="text-white/30 font-sans text-xs mt-1">yağ oranı</span>
                        </div>
                      </div>

                      <div className={`font-display text-xl uppercase tracking-widest mb-2 ${cat.color}`}>{cat.cat}</div>
                      {cat.ideal && (
                        <div className="flex items-center justify-center gap-1.5 text-green-400/70 font-sans text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Hedef aralık içinde
                        </div>
                      )}
                    </div>

                    {/* Scale bar */}
                    <div className="bg-[#0D0D0D] border border-white/8 p-5">
                      <div className="text-white/35 font-display text-xs uppercase tracking-widest mb-3">Ölçek</div>
                      <div className="relative h-3 rounded-full overflow-hidden mb-2" style={{
                        background: "linear-gradient(to right, #3b82f6 0%, #f5c518 30%, #22c55e 55%, #eab308 75%, #ef4444 100%)"
                      }}>
                        <motion.div
                          initial={{ left: "0%" }}
                          animate={{ left: `${bfPosition}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        />
                      </div>
                      <div className="flex justify-between text-white/20 font-sans text-[10px]">
                        <span>Esansiyel</span><span>Atletik</span><span>Fit</span><span>Obez</span>
                      </div>
                    </div>

                    {/* Detail */}
                    <div className="bg-[#0D0D0D] border border-white/8 p-5">
                      <div className="text-white/40 font-display tracking-widest uppercase text-xs mb-3">Koç Yorumu</div>
                      <p className="text-white/70 font-sans text-sm leading-relaxed">{cat.detail}</p>
                      <div className="mt-3 pt-3 border-t border-white/8 text-white/35 font-sans text-xs">
                        {gender === "erkek" ? "Erkekler için" : "Kadınlar için"} ideal aralık: <span className="text-white/70">%{idealMin}–{idealMax}</span>
                      </div>
                    </div>

                    <button onClick={() => setResult(null)} className="w-full py-3 border border-white/15 text-white/50 font-display text-xs uppercase tracking-widest hover:border-white/40 transition-all">
                      Yeniden Hesapla
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0D0D0D] border border-white/8 min-h-[380px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/4 flex items-center justify-center mb-6">
                      <Percent className="w-10 h-10 text-white/15" />
                    </div>
                    <div className="font-display text-white/25 uppercase tracking-widest text-sm mb-3">Ölçüm Sonucu</div>
                    <p className="text-white/20 font-sans text-sm max-w-xs leading-relaxed">
                      Ölçümlerini girdikten sonra dairesel göstergede yağ oranın görünecek.
                    </p>
                    <div className="mt-5 flex items-center gap-2 bg-primary/8 border border-primary/20 px-4 py-2.5">
                      <Info className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-white/40 font-sans text-xs text-left">BMI'dan çok daha güvenilir bir ölçüt</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Post-result CTA */}
          <AnimatePresence>
            {result !== null && cat && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-10 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Sonraki Adım</div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2">
                    Yağ Oranın <span className="text-primary">%{result.toFixed(1)}</span>{cat.ideal ? " — İdeal Seviyeyi Koru" : " — Hedef Aralığa Gel"}
                  </h3>
                  <p className="text-white/55 font-sans text-sm">
                    {cat.ideal ? "Mevcut formu korumak ve kas kütlesi eklemek için kişisel plan oluşturalım." : `Hedef aralık %${idealMin}–${idealMax}. Oraya ulaşmak için somut bir plan yapalım.`}
                  </p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,197,24,0.3)]">
                    Ücretsiz Danışma Al <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other tools */}
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
