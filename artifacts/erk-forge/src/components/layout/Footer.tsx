import { Dumbbell, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl tracking-widest uppercase text-white">
              Erk <span className="text-primary">Forge</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-sans">
          <p>&copy; {new Date().getFullYear()} Erk Forge Coaching. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
