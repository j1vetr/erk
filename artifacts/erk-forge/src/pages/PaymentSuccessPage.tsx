import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, MessageCircle, Home, Clock, Shield, ChevronRight } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { Link } from "wouter"

const WHATSAPP_NUMBER = "905488441999"

export default function PaymentSuccessPage() {
  const { lang } = useLanguage()
  const [txId, setTxId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tx = params.get("tx")
    if (tx) setTxId(tx)
    document.title = lang === "en" ? "Payment Received — Erk Forge Coaching" : "Ödeme Alındı — Erk Forge Coaching"
  }, [lang])

  const tr = lang !== "en"

  const steps = tr
    ? [
        { icon: "01", title: "Program Hazırlanıyor", desc: "8 haftalık antrenman ve beslenme programın 48 saat içinde hazır olacak." },
        { icon: "02", title: "WhatsApp İletişimi", desc: "Kayıtlı numaran üzerinden kısa sürede seninle iletişime geçeceğim." },
        { icon: "03", title: "Başlangıç Anketi", desc: "Hedeflerini, yaşam tarzını ve geçmişini daha iyi anlamak için kısa bir anket dolduracaksın." },
        { icon: "04", title: "Dönüşüm Başlar", desc: "Programın elinizde, süreç başlıyor. Haftalık check-in'lerle takip devam eder." },
      ]
    : [
        { icon: "01", title: "Program Being Prepared", desc: "Your 8-week training and nutrition program will be ready within 48 hours." },
        { icon: "02", title: "WhatsApp Contact", desc: "I'll reach out to you shortly via your registered number." },
        { icon: "03", title: "Intake Questionnaire", desc: "You'll fill out a short form so I can understand your goals, lifestyle and background." },
        { icon: "04", title: "Transformation Begins", desc: "Program in hand, the process starts. Weekly check-ins keep your progress on track." },
      ]

  const whatsappMsg = tr
    ? `Merhaba, 8 haftalık koçluk programı için ödeme yaptım. İşlem ID: ${txId ?? "—"}`
    : `Hi, I've completed payment for the 8-week coaching program. Transaction ID: ${txId ?? "—"}`

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">

          {/* Success badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-primary/40"
              />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary/60" />
              <span className="font-display text-primary text-[10px] tracking-[0.45em] uppercase">
                {tr ? "Ödeme Onaylandı" : "Payment Confirmed"}
              </span>
              <div className="w-8 h-px bg-primary/60" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight mb-4">
              {tr ? (
                <><span className="text-white">Ödemeniz</span> <span className="text-primary">Alındı!</span></>
              ) : (
                <><span className="text-white">Payment</span> <span className="text-primary">Received!</span></>
              )}
            </h1>
            <p className="text-gray-400 font-sans text-base leading-relaxed max-w-lg mx-auto">
              {tr
                ? "Teşekkürler! 8 haftalık koçluk programın için ödemen başarıyla tamamlandı. Kısa süre içinde WhatsApp üzerinden seninle iletişime geçeceğim."
                : "Thank you! Your payment for the 8-week coaching program has been successfully completed. I'll reach out to you shortly via WhatsApp."}
            </p>
          </motion.div>

          {/* Package summary card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary/5 border border-primary/20 p-5 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/40 font-display text-[10px] tracking-widest uppercase mb-1">
                  {tr ? "Seçilen Paket" : "Selected Package"}
                </div>
                <div className="text-white font-display text-lg uppercase tracking-wider">
                  {tr ? "8 Haftalık Koçluk Programı" : "8-Week Coaching Program"}
                </div>
                {txId && (
                  <div className="text-white/30 font-sans text-xs mt-1">
                    {tr ? "İşlem No:" : "Transaction ID:"} <span className="font-mono text-white/50">{txId}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-primary font-display text-3xl font-bold">€135</div>
                <div className="flex items-center gap-1 text-green-500/70 text-xs font-sans mt-1">
                  <Shield className="w-3 h-3" />
                  {tr ? "Ödendi" : "Paid"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="font-display text-[10px] text-white/30 tracking-[0.4em] uppercase mb-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              {tr ? "Bundan Sonra Ne Olacak?" : "What Happens Next?"}
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="flex items-start gap-4 bg-white/3 border border-white/8 p-4"
                >
                  <div className="font-display text-primary text-xs tracking-widest font-bold w-6 shrink-0 mt-0.5">
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-display text-white text-sm uppercase tracking-wider mb-0.5">{step.title}</div>
                    <div className="text-white/45 font-sans text-xs leading-relaxed">{step.desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 shrink-0 mt-1 ml-auto" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Response time note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-white/35 font-sans text-xs mb-8"
          >
            <Clock className="w-3.5 h-3.5 text-primary/60 shrink-0" />
            {tr
              ? "Ortalama yanıt süresi: 2–4 saat (08:00–22:00 arasında)"
              : "Average response time: 2–4 hours (between 08:00–22:00)"}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#1ebe5c] text-black font-display text-sm tracking-[0.2em] uppercase font-bold transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              {tr ? "WhatsApp'tan Yaz" : "Message on WhatsApp"}
            </a>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-white/15 text-white/60 font-display text-sm tracking-[0.2em] uppercase hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              {tr ? "Ana Sayfaya Dön" : "Back to Home"}
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Bottom brand strip */}
      <div className="border-t border-white/5 py-6 text-center">
        <div className="font-display text-white/20 text-xs tracking-[0.4em] uppercase">
          Erk Forge Coaching
        </div>
      </div>

    </div>
  )
}
