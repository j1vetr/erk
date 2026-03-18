import { Flame, Instagram, Youtube, Twitter, MapPin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-primary" />
              <span className="font-display text-3xl tracking-widest text-white">
                ERK <span className="text-primary">FORGE</span>
              </span>
            </div>
            <p className="text-gray-400 font-sans leading-relaxed">
              Bahane yok. Kestirme yok. Sadece ağır demir, saf disiplin ve ustaca bir plan. 
              Fiziğini ve zihnini en üst seviyeye taşı.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-2xl text-white mb-6 tracking-wide">Hızlı Bağlantılar</h4>
            <ul className="space-y-3 font-sans text-gray-400">
              <li><a href="#about" className="hover:text-primary transition-colors">Hakkımda</a></li>
              <li><a href="#programs" className="hover:text-primary transition-colors">Koçluk Programları</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Başarı Hikayeleri</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Blog & İpuçları</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display text-2xl text-white mb-6 tracking-wide">Araçlar</h4>
            <ul className="space-y-3 font-sans text-gray-400">
              <li><a href="/araclar/bmi" className="hover:text-primary transition-colors">BMI Hesaplayıcı</a></li>
              <li><a href="/araclar/kalori" className="hover:text-primary transition-colors">Günlük Kalori & TDEE</a></li>
              <li><a href="/araclar/1rm" className="hover:text-primary transition-colors">1RM Hesaplayıcı</a></li>
              <li><a href="/araclar/vucut-analizi" className="hover:text-primary transition-colors">Vücut Yağ Oranı</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-2xl text-white mb-6 tracking-wide">İletişim</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>İstanbul, Türkiye<br/>(Online Global Hizmet)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@erkforgecoaching.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+90 555 123 45 67</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-sans">
          <p>&copy; {new Date().getFullYear()} Erk Forge Coaching. Tüm Hakları Saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
