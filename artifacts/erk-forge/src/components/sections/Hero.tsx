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

    // Embers / sparks
    interface Ember {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      brightness: number
    }

    const embers: Ember[] = []

    const spawnEmber = () => {
      const x = Math.random() * canvas.width
      const y = canvas.height + 5
      embers.push({
        x,
        y,
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

      // Dark forge atmosphere — subtle radial glow at bottom center
      const grd = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.85, 0,
        canvas.width / 2, canvas.height * 0.85, canvas.width * 0.65
      )
      grd.addColorStop(0, "rgba(80, 50, 0, 0.18)")
      grd.addColorStop(0.5, "rgba(40, 25, 0, 0.10)")
      grd.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawn embers at varying rates
      if (frame % 3 === 0) spawnEmber()
      if (frame % 7 === 0) spawnEmber()

      // Draw embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]
        e.x += e.vx + Math.sin(e.life * 0.05) * 0.3
        e.y += e.vy
        e.vy *= 0.998
        e.life++

        if (e.life >= e.maxLife || e.y < -10) {
          embers.splice(i, 1)
          continue
        }

        const t = e.life / e.maxLife
        const alpha = e.brightness * (t < 0.15 ? t / 0.15 : 1 - ((t - 0.15) / 0.85))

        // Ember glow
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 3.5)
        glow.addColorStop(0, `rgba(255, 200, 40, ${alpha * 0.9})`)
        glow.addColorStop(0.4, `rgba(240, 140, 10, ${alpha * 0.4})`)
        glow.addColorStop(1, `rgba(200, 60, 0, 0)`)
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Bright core
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 230, 120, ${alpha})`
        ctx.fill()
      }

      // Grid lines — subtle industrial texture
      ctx.save()
      ctx.strokeStyle = "rgba(245, 197, 24, 0.04)"
      ctx.lineWidth = 1
      const gridSize = 80
      for (let gx = 0; gx < canvas.width; gx += gridSize) {
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, canvas.height)
        ctx.stroke()
      }
      for (let gy = 0; gy < canvas.height; gy += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(canvas.width, gy)
        ctx.stroke()
      }
      ctx.restore()

      // Diagonal streak lines (fast sparks)
      if (frame % 40 === 0 && embers.length > 5) {
        const re = embers[Math.floor(Math.random() * Math.min(5, embers.length))]
        ctx.save()
        ctx.strokeStyle = `rgba(255, 220, 80, 0.6)`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(re.x, re.y)
        ctx.lineTo(re.x + re.vx * 8, re.y + re.vy * 8)
        ctx.stroke()
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
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
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeProgress * end))
        if (progress < 1) animationFrame = window.requestAnimationFrame(step)
      }

      animationFrame = window.requestAnimationFrame(step)
      return () => window.cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return (
      <div className="flex flex-col items-center">
        <span className="font-display text-3xl md:text-4xl text-white font-bold">{count}+</span>
        <span className="text-primary font-display tracking-widest text-xs uppercase mt-1">{label}</span>
      </div>
    )
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Forge background canvas */}
      <ForgeBackground />

      {/* Deep gradient overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent" />
        {/* Bottom fade to page */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
        {/* Center dimmer so text stays readable */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 flex flex-col items-center text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-5 drop-shadow-2xl"
        >
          DEMİRİ <br />
          <span className="text-primary">FORGE ET</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-base md:text-lg text-gray-300 mb-10 font-sans font-light"
        >
          Bahane yok. Kestirme yok. Sadece ağır demir, saf disiplin ve ustaca bir plan.
          Fiziğini Erk Forge Koçluğu rehberliğinde baştan yarat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-3.5 bg-primary text-black font-display text-base tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(245,197,24,0.4)]"
          >
            Hemen Başla
          </button>
          <button
            onClick={() => scrollTo("programs")}
            className="px-8 py-3.5 bg-black/50 border border-white/20 text-white font-display text-base tracking-widest uppercase hover:border-primary hover:text-primary backdrop-blur-sm transition-all duration-300"
          >
            Programları İncele
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-4 md:gap-16 w-full max-w-2xl border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-primary/50 mb-2" />
            <Counter end={500} duration={2000} label="Mutlu Müşteri" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Trophy className="w-8 h-8 text-primary/50 mb-2" />
            <Counter end={8} duration={2000} label="Yıl Deneyim" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Target className="w-8 h-8 text-primary/50 mb-2" />
            <Counter end={97} duration={2000} label="% Başarı Oranı" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => scrollTo("about")}
      >
        <span className="font-display uppercase text-sm tracking-[0.3em]">AŞAĞI İN</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}
