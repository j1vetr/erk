import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

const PHONE = "905488441999"
const MESSAGE = encodeURIComponent("Merhaba, koçluk programları hakkında bilgi almak istiyorum.")
const WA_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`

export function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2">

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 bg-[#111] border border-white/12 shadow-2xl px-4 py-2.5 max-w-[220px]"
          >
            <p className="font-sans text-xs text-white/80 leading-snug">
              Sorularını WhatsApp'tan yaz, hemen dönelim.
            </p>
            <button
              onClick={() => setTooltip(false)}
              className="shrink-0 text-white/30 hover:text-white/70 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] flex items-center justify-center"
        style={{ background: "#25D366" }}
      >
        {/* Resmi WhatsApp SVG Logosu */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="30"
          height="30"
          fill="white"
        >
          <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.92 6.88 2.54 9.77L4 44l10.46-2.51A19.89 19.89 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.12 0-6.05-.84-8.58-2.32l-.6-.36-6.2 1.49 1.54-5.97-.4-.62A15.92 15.92 0 0 1 8 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.77-11.8c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.02-.74-3.84-2.36-1.42-1.26-2.38-2.82-2.66-3.3-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82h-.92c-.32 0-.84.12-1.28.6s-1.68 1.64-1.68 4 1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
        </svg>

        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full animate-ping opacity-20" style={{ background: "#25D366" }} />
      </motion.a>
    </div>
  )
}
