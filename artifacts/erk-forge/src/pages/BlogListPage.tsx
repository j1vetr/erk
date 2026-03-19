import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, ChevronRight } from "lucide-react"
import { Link } from "wouter"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { blogPosts } from "@/data/blogPosts"
import { SEO } from "@/hooks/useSEO"
import { useLanguage } from "@/i18n/LanguageContext"

export default function BlogListPage() {
  const { t, lang } = useLanguage()
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  const postTitle = (p: typeof featured) => lang === "en" ? (p.titleEn || p.title) : p.title
  const postExcerpt = (p: typeof featured) => lang === "en" ? (p.excerptEn || p.excerpt) : p.excerpt
  const postCategory = (p: typeof featured) => lang === "en" ? (p.categoryEn || p.category) : p.category

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title={t.seo.blogTitle}
        description={t.seo.blogDesc}
        canonical="/blog"
      />
      <Navbar />

      <div className="relative pt-24 pb-10 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/7 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/35 font-sans text-xs mb-5">
            <Link href="/" className="hover:text-primary transition-colors">
              {lang === "en" ? "Home" : "Ana Sayfa"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/60">Blog</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">
              {lang === "en" ? "IRON" : "DEMİR"} <span className="text-primary">{lang === "en" ? "LIBRARY" : "KÜTÜPHANESİ"}</span>
            </h1>
          </div>
          <p className="text-white/40 font-sans text-sm ml-8">
            {t.blogPage.sub}
          </p>
        </div>
      </div>

      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <Link href={`/blog/${featured.slug}`}>
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer mb-8 grid lg:grid-cols-[5fr_6fr] gap-0 overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative h-56 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={postTitle(featured)}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`font-display tracking-widest text-[10px] px-2.5 py-1 ${featured.categoryColor}`}>
                    {postCategory(featured)}
                  </span>
                  <span className="font-display tracking-widest text-[10px] px-2.5 py-1 bg-primary/80 text-black">
                    {t.blog.featuredLabel}
                  </span>
                </div>
              </div>

              <div className="bg-[#0D0D0D] p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-white/30 font-sans text-xs mb-4">
                    <span>{featured.date}</span>
                    <span className="w-1 h-1 bg-white/15 rounded-full" />
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-white uppercase leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                    {postTitle(featured)}
                  </h2>
                  <p className="text-white/50 font-sans text-sm leading-relaxed mb-5 line-clamp-3">{postExcerpt(featured)}</p>
                </div>
                <div className="flex items-center gap-2 text-primary font-display tracking-widest text-xs border-b border-primary/30 pb-1.5 w-fit group-hover:gap-3 transition-all duration-300">
                  {t.blog.readMore} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map((post, idx) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="group cursor-pointer bg-[#0D0D0D] border border-white/8 hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden h-full"
                >
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={postTitle(post)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`font-display tracking-widest text-[9px] px-2 py-0.5 ${post.categoryColor}`}>
                        {postCategory(post)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-white/25 font-sans text-[11px] mb-2">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {post.readTime}</span>
                    </div>
                    <h3 className="font-display text-sm text-white uppercase leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3 flex-1">
                      {postTitle(post)}
                    </h3>
                    <div className="flex items-center gap-1 text-primary/60 font-display text-[10px] tracking-widest group-hover:text-primary group-hover:gap-2 transition-all duration-300 mt-2">
                      {lang === "en" ? "READ" : "OKU"} <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-primary/12 via-primary/6 to-transparent border border-primary/25 p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <div className="text-primary font-display uppercase tracking-widest text-[10px] mb-1">
                {lang === "en" ? "Personal Coaching" : "Kişisel Koçluk"}
              </div>
              <h3 className="font-display text-lg text-white uppercase mb-1">
                {lang === "en" ? "Turn Knowledge Into Action" : "Bilgiyi Aksiyona Çevir"}
              </h3>
              <p className="text-white/45 font-sans text-xs">
                {lang === "en"
                  ? "Let us turn what you've read into a custom program for you."
                  : "Okuduklarını senin için özel bir programa dönüştürelim."}
              </p>
            </div>
            <Link href="/#contact">
              <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-6 py-3 hover:bg-white transition-all duration-300 text-xs flex items-center gap-2 whitespace-nowrap">
                {lang === "en" ? "Get Started" : "Hemen Başlayalım"} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
