import { Link } from "wouter"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center">
        <div className="font-display text-[10rem] font-bold leading-none text-white/5 select-none mb-0">404</div>
        <div className="-mt-10 mb-6">
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white mb-3">
            Sayfa <span className="text-primary">Bulunamadı</span>
          </h1>
          <p className="text-white/40 font-sans text-base max-w-sm mx-auto">
            Aradığın sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          </p>
        </div>
        <Link href="/">
          <button className="inline-flex items-center gap-2 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(245,197,24,0.25)]">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  )
}
