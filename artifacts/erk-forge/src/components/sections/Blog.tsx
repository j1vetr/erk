import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import { Link } from "wouter"
import { blogPosts } from "@/data/blogPosts"

export function Blog() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="py-20 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-display uppercase tracking-[0.3em] mb-3 text-xs flex items-center justify-center md:justify-start gap-2"
            >
              <BookOpen className="w-4 h-4" /> DEMİR KÜTÜPHANESİ
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold uppercase text-white"
            >
              BİLGİ <span className="text-primary">GÜÇTÜR</span>
            </motion.h3>
          </div>

          <Link href="/blog">
            <button className="text-primary font-display tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-primary/30 hover:border-white text-sm mx-auto md:mx-0">
              Tüm Yazıları Gör <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group cursor-pointer flex flex-col bg-[#0D0D0D] border border-white/8 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className={`font-display tracking-widest text-xs px-3 py-1 ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-white/30 font-sans text-xs mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-white/15 rounded-full" />
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>

                  <h4 className="font-display text-xl text-white uppercase leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-white/40 font-sans text-sm mb-5 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-primary/70 font-display tracking-widest text-xs group-hover:text-primary group-hover:gap-3 transition-all duration-300">
                    OKUMAYA DEVAM ET <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
