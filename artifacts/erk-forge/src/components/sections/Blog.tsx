import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"

export function Blog() {
  const posts = [
    {
      title: "Hipertrofi İçin Optimal Set Sayısı Nedir?",
      category: "ANTRENMAN",
      excerpt: "Kas gelişimi için gereksiz yere saatlerce çalışmana gerek yok. Bilimin ışığında haftalık set sayılarını optimize etmenin yolları.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      date: "12 Ekim 2023"
    },
    {
      title: "Definasyon Döneminde Güç Kaybını Önlemek",
      category: "BESLENME",
      excerpt: "Yağ yakarken kas kütleni ve gücünü nasıl korursun? Makro dağılımı ve antrenman şiddeti ayarlamaları.",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
      date: "28 Eylül 2023"
    },
    {
      title: "Motivasyon Yalanı: Disiplin İnşa Etmek",
      category: "MENTAL",
      excerpt: "Motivasyon gelir ve geçer, ancak disiplin seni hedefe ulaştırır. Mental dayanıklılık nasıl geliştirilir?",
      image: "https://images.unsplash.com/photo-1526506114620-1a73cd8faed7?q=80&w=1470&auto=format&fit=crop",
      date: "05 Eylül 2023"
    }
  ]

  return (
    <section id="blog" className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-display uppercase tracking-[0.3em] mb-4 text-sm flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" /> DEMİR KÜTÜPHANESİ
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold uppercase text-white"
            >
              BİLGİ <span className="text-gray-600">GÜÇTÜR</span>
            </motion.h3>
          </div>
          
          <button className="text-primary font-display tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-primary/30 hover:border-white">
            Tüm Yazıları Gör <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale-[0.8] group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 z-20 bg-primary text-black px-3 py-1 font-display tracking-widest text-sm font-bold">
                  {post.category}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <span className="text-gray-500 text-sm mb-3 block">{post.date}</span>
                <h4 className="font-display text-2xl text-white uppercase leading-tight mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-400 font-sans mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 text-white font-display tracking-widest text-sm group-hover:text-primary transition-colors">
                  OKUMAYA DEVAM ET <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
