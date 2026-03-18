import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Users, Target, Trophy } from "lucide-react"

function EmberOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    interface Ember {
      x: number; y: number; vx: number; vy: number
      size: number; life: number; maxLife: number; brightness: number
    }
    const embers: Ember[] = []
    const spawn = () => embers.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 5,
      vx: (Math.random() - 0.5) * 1.0,
      vy: -(1.2 + Math.random() * 2.5),
      size: 0.6 + Math.random() * 2.0,
      life: 0,
      maxLife: 90 + Math.random() * 130,
      brightness: 0.6 + Math.random() * 0.4,
    })

    let frame = 0
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (frame % 4 === 0) spawn()
      if (frame % 9 === 0) spawn()

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]
        e.x += e.vx + Math.sin(e.life * 0.05) * 0.25
        e.y += e.vy; e.vy *= 0.999; e.life++
        if (e.life >= e.maxLife || e.y < -10) { embers.splice(i, 1); continue }
        const t = e.life / e.maxLife
        const alpha = e.brightness * (t < 0.15 ? t / 0.15 : 1 - ((t - 0.15) / 0.85))
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4)
        g.addColorStop(0, `rgba(255,210,50,${alpha * 0.85})`)
        g.addColorStop(0.45, `rgba(240,130,10,${alpha * 0.35})`)
        g.addColorStop(1, "rgba(180,50,0,0)")
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,235,130,${alpha})`; ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />
}

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const Counter = ({ end, duration, label }: { end: number; duration: number; label: string }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      let startTime: number; let af: number
      const step = (ts: number) => {
        if (!startTime) startTime = ts
        const p = Math.min((ts - startTime) / duration, 1)
        setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end))
        if (p < 1) af = requestAnimationFrame(step)
      }
      af = requestAnimationFrame(step)
      return () => cancelAnimationFrame(af)
    }, [end, duration])
    return (
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl md:text-3xl text-white font-bold">{count}+</span>
        <span className="text-primary font-display tracking-widest text-[10px] uppercase mt-1">{label}</span>
      </div>
    )
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-black">

      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={`${import.meta.env.BASE_URL}videos/hero-bg.mp4`} type="video/mp4" />
        </video>
      </div>

      {/* ── Coach Photo — above overlays, pinned to bottom-right ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 right-0 z-[6] hidden lg:flex items-end justify-end pointer-events-none"
        style={{ width: "40%", height: "100%" }}
      >
        {/* Glow behind figure */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at bottom, rgba(245,197,24,0.22) 0%, rgba(245,197,24,0.06) 55%, transparent 80%)",
            filter: "blur(40px)",
          }}
        />

        {/* Coach photo — ince kontur + dönen ışık orbu */}
        <div className="relative w-full max-w-[500px]">
          {/* Fotoğraf: ince statik altın kontur */}
          <img
            src={`${import.meta.env.BASE_URL}images/coach-hero.png`}
            alt="Erk Forge Koç"
            className="relative w-full h-auto object-contain object-bottom select-none block"
            style={{
              filter: [
                "brightness(1.06)",
                "contrast(1.08)",
                "drop-shadow(0 0 1px #F5C518)",
                "drop-shadow(0 0 3px rgba(245,197,24,0.55))",
              ].join(" "),
            }}
            draggable={false}
          />

        </div>

        {/* Ground glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(245,197,24,0.35) 0%, transparent 70%)",
            filter: "blur(14px)",
          }}
        />
      </motion.div>

      {/* ── Ember particle overlay ── */}
      <EmberOverlay />

      {/* ── Dark overlays ── */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 min-h-screen flex flex-col justify-center lg:justify-end lg:pb-24">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.88] mb-6 drop-shadow-2xl max-w-2xl"
        >
          DEMİRDEN <br />
          <span className="text-primary">YOĞRUL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="max-w-md text-sm md:text-base text-gray-300 mb-8 font-sans font-light leading-relaxed"
        >
          Mazeret yok, kestirme yok. Ağır demir, saf irade ve profesyonel rehberlik.
          Bedenini sıfırdan yeniden inşa etmek için ilk adımı at.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-3.5 bg-primary text-black font-display text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(245,197,24,0.4)]"
          >
            Hemen Başla
          </button>
          <button
            onClick={() => scrollTo("programs")}
            className="px-8 py-3.5 bg-black/50 border border-white/20 text-white font-display text-sm tracking-widest uppercase hover:border-primary hover:text-primary backdrop-blur-sm transition-all duration-300"
          >
            Programları İncele
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-3 gap-6 md:gap-10 w-full max-w-sm border-t border-white/10 pt-6"
        >
          <div className="flex flex-col items-center gap-1">
            <Users className="w-5 h-5 text-primary/60 mb-1" />
            <Counter end={500} duration={2000} label="Mutlu Müşteri" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Trophy className="w-5 h-5 text-primary/60 mb-1" />
            <Counter end={8} duration={2000} label="Yıl Deneyim" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Target className="w-5 h-5 text-primary/60 mb-1" />
            <Counter end={97} duration={2000} label="% Başarı Oranı" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => scrollTo("about")}
      >
        <span className="font-display uppercase text-xs tracking-[0.3em] hidden sm:block">AŞAĞI İN</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
