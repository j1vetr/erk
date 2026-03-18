import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Users, Target, Trophy } from "lucide-react"

function ForgeBackground() {
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

    const spawnEmber = () => {
      embers.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 5,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(1.5 + Math.random() * 3),
        size: 0.8 + Math.random() * 2.5,
        life: 0,
        maxLife: 80 + Math.random() * 120,
        brightness: 0.7 + Math.random() * 0.3,
      })
    }

    let frame = 0
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Bottom forge glow
      const grd = ctx.createRadialGradient(
        canvas.width * 0.65, canvas.height * 0.9, 0,
        canvas.width * 0.65, canvas.height * 0.9, canvas.width * 0.5
      )
      grd.addColorStop(0, "rgba(80, 50, 0, 0.22)")
      grd.addColorStop(0.5, "rgba(40, 25, 0, 0.10)")
      grd.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (frame % 3 === 0) spawnEmber()
      if (frame % 7 === 0) spawnEmber()

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]
        e.x += e.vx + Math.sin(e.life * 0.05) * 0.3
        e.y += e.vy
        e.vy *= 0.998
        e.life++
        if (e.life >= e.maxLife || e.y < -10) { embers.splice(i, 1); continue }
        const t = e.life / e.maxLife
        const alpha = e.brightness * (t < 0.15 ? t / 0.15 : 1 - ((t - 0.15) / 0.85))
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 3.5)
        glow.addColorStop(0, `rgba(255,200,40,${alpha * 0.9})`)
        glow.addColorStop(0.4, `rgba(240,140,10,${alpha * 0.4})`)
        glow.addColorStop(1, `rgba(200,60,0,0)`)
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,230,120,${alpha})`; ctx.fill()
      }

      // Grid
      ctx.save()
      ctx.strokeStyle = "rgba(245,197,24,0.035)"
      ctx.lineWidth = 1
      for (let gx = 0; gx < canvas.width; gx += 80) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke()
      }
      for (let gy = 0; gy < canvas.height; gy += 80) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke()
      }
      ctx.restore()

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
}

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const Counter = ({ end, duration, label }: { end: number; duration: number; label: string }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      let startTime: number
      let animationFrame: number
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * end))
        if (progress < 1) animationFrame = window.requestAnimationFrame(step)
      }
      animationFrame = window.requestAnimationFrame(step)
      return () => window.cancelAnimationFrame(animationFrame)
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

      {/* AI-generated background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      <ForgeBackground />

      {/* Overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
        {/* Darken so text stays readable but background shows through */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Layout: text left, photo right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16
                      flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-0 min-h-screen">

        {/* LEFT — Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pb-24 order-2 lg:order-1">

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.88] mb-6 drop-shadow-2xl"
          >
            DEMİRİ <br />
            <span className="text-primary">FORGE ET</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-md text-sm md:text-base text-gray-400 mb-8 font-sans font-light leading-relaxed"
          >
            Bahane yok. Kestirme yok. Sadece ağır demir, saf disiplin ve ustaca bir plan.
            Fiziğini Erk Forge Koçluğu rehberliğinde baştan yarat.
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

        {/* RIGHT — Coach Photo */}
        <div className="relative flex-shrink-0 flex items-end justify-center order-1 lg:order-2
                        w-full lg:w-auto h-[55vw] sm:h-[45vw] lg:h-screen max-h-[750px]">

          {/* Yellow glow behind figure */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full"
            style={{
              background: "radial-gradient(ellipse at bottom, rgba(245,197,24,0.22) 0%, rgba(245,197,24,0.07) 50%, transparent 75%)",
              filter: "blur(30px)",
            }}
          />

          {/* Vertical accent line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="absolute left-4 top-[10%] bottom-[5%] w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent origin-top hidden lg:block"
          />

          {/* Coach image — floating animation */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "brightness(0.3)" }}
            animate={{ opacity: 1, x: 0, filter: "brightness(1)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="relative h-full flex items-end"
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}images/coach-hero.png`}
              alt="Erk Forge Koç"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="h-full w-auto object-contain object-bottom select-none"
              style={{ filter: "drop-shadow(0 0 40px rgba(245,197,24,0.15))" }}
              draggable={false}
            />
          </motion.div>

          {/* Bottom ground glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(245,197,24,0.25) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
        </div>
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
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
