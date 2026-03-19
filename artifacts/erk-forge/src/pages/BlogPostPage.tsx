import { useEffect } from "react"
import { useParams, Link } from "wouter"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Tag, ArrowRight, BookOpen } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { blogPosts, getBlogPost, type BlogSection } from "@/data/blogPosts"
import { SEO } from "@/hooks/useSEO"

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "paragraph":
      return (
        <p className="text-white/70 font-sans text-base leading-relaxed mb-6">
          {section.text}
        </p>
      )
    case "heading":
      return (
        <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mt-10 mb-5 pb-3 border-b border-white/8">
          {section.text}
        </h2>
      )
    case "subheading":
      return (
        <h3 className="font-display text-xl text-primary uppercase tracking-wider mt-7 mb-4">
          {section.text}
        </h3>
      )
    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-primary bg-primary/6 py-5 pr-5">
          <p className="text-white/80 font-sans text-base italic leading-relaxed">{section.text}</p>
        </blockquote>
      )
    case "list":
      return (
        <ul className="mb-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/65 font-sans text-sm leading-relaxed">
              <span className="w-5 h-5 bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )
    case "callout":
      return (
        <div className="my-7 bg-primary/10 border border-primary/35 p-6 flex gap-4">
          <div className="w-1 flex-shrink-0 bg-primary rounded-full" />
          <p className="text-white/80 font-sans text-sm leading-relaxed">{section.text}</p>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPost(slug || "")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-5 pt-28">
          <BookOpen className="w-16 h-16 text-white/15" />
          <h1 className="font-display text-3xl uppercase text-white">Yazı Bulunamadı</h1>
          <Link href="/blog">
            <button className="bg-primary text-black font-display uppercase tracking-widest px-6 py-3 hover:bg-white transition-all">
              Tüm Yazılara Dön
            </button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SEO
        title={`${post.title} | Erk Forge Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={post.image}
      />
      <Navbar />

      {/* ── Hero Image ── */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden mt-24">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-primary font-sans text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Tüm Yazılar
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`font-display tracking-widest text-xs px-3 py-1.5 ${post.categoryColor}`}>
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-white/40 font-sans text-xs">
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-white uppercase leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">

            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Excerpt / lead */}
              <p className="text-white/55 font-sans text-lg leading-relaxed mb-8 pb-8 border-b border-white/8 italic">
                {post.excerpt}
              </p>

              {/* Sections */}
              <div>
                {post.content.map((section, idx) => (
                  <RenderSection key={idx} section={section} />
                ))}
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-white/8 flex flex-wrap gap-2 items-center">
                <Tag className="w-4 h-4 text-white/30" />
                {post.tags.map((tag) => (
                  <span key={tag} className="font-display text-xs uppercase tracking-widest bg-white/6 border border-white/10 px-3 py-1.5 text-white/50">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Post CTA */}
              <div className="mt-10 bg-gradient-to-r from-primary/15 via-primary/8 to-transparent border border-primary/30 p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <div className="text-primary font-display uppercase tracking-widest text-xs mb-2">Kişisel Program</div>
                  <h3 className="font-display text-xl text-white uppercase mb-1">Okuduklarını Sahaya Taşı</h3>
                  <p className="text-white/45 font-sans text-sm">Sana özel bir antrenman ve beslenme planı oluşturalım.</p>
                </div>
                <Link href="/#contact">
                  <button className="flex-shrink-0 bg-primary text-black font-display uppercase tracking-widest px-6 py-3 hover:bg-white transition-all text-sm flex items-center gap-2 whitespace-nowrap">
                    Ücretsiz Danışma <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="sticky top-28 space-y-6">
              {/* Tools promo */}
              <div className="bg-[#0D0D0D] border border-white/10 p-6">
                <div className="text-primary font-display text-xs uppercase tracking-widest mb-3">Fitness Araçları</div>
                <p className="text-white/50 font-sans text-sm mb-4 leading-relaxed">
                  BMI, kalori, 1RM hesaplama ve vücut yağ analizi için ücretsiz araçlarımızı dene.
                </p>
                <Link href="/araclar">
                  <button className="w-full bg-white/6 border border-white/15 hover:border-primary/50 text-white font-display text-xs uppercase tracking-widest py-3 transition-all flex items-center justify-center gap-2">
                    Araçlara Git <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

              {/* Related posts */}
              <div className="bg-[#0D0D0D] border border-white/10 p-6">
                <div className="text-white/40 font-display text-xs uppercase tracking-widest mb-5">Diğer Yazılar</div>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <div className="group flex gap-3 cursor-pointer">
                        <img src={related.image} alt={related.title} className="w-16 h-14 object-cover flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" decoding="async" />
                        <div className="flex-1">
                          <span className={`font-display text-[9px] tracking-widest px-2 py-0.5 ${related.categoryColor} mb-1.5 inline-block`}>
                            {related.category}
                          </span>
                          <h4 className="font-display text-xs text-white/70 uppercase leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
