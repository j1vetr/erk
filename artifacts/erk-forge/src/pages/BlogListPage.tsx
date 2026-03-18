import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, ChevronRight } from "lucide-react"
import { Link } from "wouter"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { blogPosts } from "@/data/blogPosts"

const categories = ["TÜMÜ", "ANTRENMAN", "BESLENME", "MENTAL"]

export default function BlogListPage() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* ── Header ── */}
      <div className="relative pt-28 pb-14 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 font-sans text-sm mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Blog</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/15 border border-primary/30 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none">
                Demir <span className="text-primary">Kütüphanesi</span>
              </h1>
            </div>
          </div>
          <p className="text-white/50 font-sans text-base max-w-xl ml-16">
            Bilimsel temelli antrenman, beslenme ve mental güç üzerine derinlemesine yazılar.
          </p>
        </div>
      </div>

      <div className="flex-1 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Featured Post */}
          <Link href={`/blog/${featured.slug}`}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer mb-14 grid lg:grid-cols-2 gap-0 overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-5 left-5">
                  <span className={`font-display tracking-widest text-xs px-3 py-1.5 ${featured.categoryColor}`}>
                    {featured.category}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 bg-primary/90 text-black font-display text-xs px-3 py-1 tracking-widest">
                  ÖZEL YAYI
                </div>
              </div>

              <div className="bg-[#0D0D0D] p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-white/35 font-sans text-xs mb-5">
                    <span>{featured.date}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-white uppercase leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-white/55 font-sans leading-relaxed mb-6">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 text-primary font-display tracking-widest text-sm border-b border-primary/30 pb-2 w-fit group-hover:gap-4 transition-all duration-300">
                  OKUMAYA DEVAM ET <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          </Link>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((post, idx) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer bg-[#0D0D0D] border border-white/8 hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`font-display tracking-widest text-[10px] px-2.5 py-1 ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-white/30 font-sans text-xs mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg text-white uppercase leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/40 font-sans text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-primary/70 font-display text-xs tracking-widest group-hover:text-primary transition-colors group-hover:gap-3 duration-300">
                      OKU <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary/15 via-primary/8 to-transparent border border-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Kişisel Koçluk</div>
              <h3 className="font-display text-2xl text-white uppercase mb-2">Bilgiyi Aksiyona Çevir</h3>
              <p className="text-white/50 font-sans text-sm">Okuduklarını senin için özel bir programa dönüştürelim.</p>
            </div>
            <Link href="/#contact">
              <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-7 py-3.5 hover:bg-white transition-all duration-300 text-sm flex items-center gap-2">
                Hemen Başlayalım <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
