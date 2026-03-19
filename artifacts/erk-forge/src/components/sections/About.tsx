import { motion, useInView } from "framer-motion"
import { Target, Zap, Shield, TrendingUp } from "lucide-react"
import { useRef } from "react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: "7+", label: "Yıl Deneyim" },
  ]

  const pillars = [
    { icon: <Target className="w-4 h-4" />, title: "Kişisel Strateji", desc: "Metabolizman ve yaşam tarzına özel protokol." },
    { icon: <Zap className="w-4 h-4" />, title: "Bilimsel Temel", desc: "Kanıta dayalı antrenman ve beslenme." },
    { icon: <Shield className="w-4 h-4" />, title: "Sürekli Takip", desc: "Haftalık check-in, form analizi, revizyon." },
    { icon: <TrendingUp className="w-4 h-4" />, title: "Mental Dönüşüm", desc: "Kasların kadar iradenin de çeliği." },
  ]

  return (
    <section id="about" className="bg-black relative overflow-hidden border-t border-white/5" ref={ref}>

      {/* Arka plan watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[22vw] font-bold text-white/[0.025] uppercase leading-none tracking-tighter">
          ERK
        </span>
      </div>

      {/* Köşe ışık efekti */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-14"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-10 h-px bg-primary" />
          <span className="font-display text-primary text-xs tracking-[0.45em] uppercase">Hakkımda</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

          {/* ── Fotoğraf sütunu (5 kolon) ── */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Köşe çerçeve */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/40 z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/40 z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />

            {/* Fotoğraf */}
            <div className="overflow-hidden relative">
              <img
                src={`${import.meta.env.BASE_URL}images/coach-portrait.webp`}
                alt="Erk Forge Koç"
                className="w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: "3/4", filter: "contrast(1.08) brightness(0.92)" }}
              />
              {/* Fotoğraf üstü gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Sertifika badge */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 bg-black/85 border-l-2 border-primary p-4 backdrop-blur-sm z-30"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="text-primary font-display text-[10px] tracking-[0.35em] uppercase mb-1">ISSA Sertifikalı</div>
              <div className="text-white font-display text-base tracking-widest uppercase">Master Trainer</div>
            </motion.div>
          </motion.div>

          {/* ── İçerik sütunu (7 kolon) ── */}
          <motion.div
            className="lg:col-span-7 lg:pl-16"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Manifesto başlık */}
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold uppercase leading-[1.2] mb-8 tracking-tight">
              KİŞİSEL KOÇLUKLA<br />
              <span className="text-primary">GERÇEK BİR</span><br />
              DÖNÜŞÜM.
            </h2>

            {/* Body text */}
            <div className="border-l-2 border-primary/40 pl-5 mb-10 space-y-3 max-w-xl">
              <p className="text-white/80 text-sm leading-relaxed font-sans">
                Benim adım Erk. Felsefem çok basit: zayıf metal kırılır, güçlü demir dayanır. Sıradanlıktan sıkılmış, sınırlarını zorlamaya hazır bireyleri alıyor; fiziksel ve mental zirvelerine ulaştırıyorum.
              </p>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                Bu 30 günlük geçici bir çözüm değil — antrenman yapma, beslenme ve düşünme biçiminin baştan aşağı yeniden inşası.
              </p>
            </div>

            {/* Stat sayaçları */}
            <div className="flex gap-8 mb-10 border-t border-b border-white/10 py-7">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.12 }}
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary leading-none mb-1.5">
                    {s.value}
                  </div>
                  <div className="text-white/55 text-[10px] font-display tracking-[0.3em] uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Neden ben — 4 sütun ikon grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 group"
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.1 }}
                >
                  <div className="w-7 h-7 border border-primary/50 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-colors duration-200">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-white font-display text-xs tracking-wider uppercase mb-0.5">{p.title}</div>
                    <div className="text-white/60 text-xs font-sans leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
