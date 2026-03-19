import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Home, Clock, Shield, ChevronRight } from "lucide-react"
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
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
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
