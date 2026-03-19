import { Instagram, Youtube, Twitter, MapPin, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div>
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Erk Forge Coaching"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 font-sans leading-relaxed">{t.footer.brand}</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/erk_ozkunt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-colors">
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
            <h4 className="font-display text-2xl text-white mb-6 tracking-wide">{t.footer.quickLinks}</h4>
            <ul className="space-y-3 font-sans text-gray-400">
              <li><a href="#about" className="hover:text-primary transition-colors">{t.footer.links.about}</a></li>
              <li><a href="#programs" className="hover:text-primary transition-colors">{t.footer.links.programs}</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">{t.footer.links.blog}</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display text-2xl text-white mb-6 tracking-wide">{t.footer.tools}</h4>
            <ul className="space-y-3 font-sans text-gray-400">
              {t.footer.toolLinks.map((tool) => (
                <li key={tool.href}><a href={tool.href} className="hover:text-primary transition-colors">{tool.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-2xl text-white mb-6 tracking-wide">{t.footer.contact}</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t.contact.locationValue}<br/>{t.footer.locationNote}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@erkforgecoaching.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+90 548 844 19 99</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-sans">
          <p>&copy; {new Date().getFullYear()} Erk Forge Coaching. {t.footer.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
