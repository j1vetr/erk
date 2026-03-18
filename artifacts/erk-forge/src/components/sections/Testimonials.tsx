import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function Testimonials() {
  const reviews = [
    {
      name: "Marcus V.",
      quote: "Erk completely destroyed my excuses. I came in wanting to lose 10lbs, I left with 15lbs of pure muscle and an unshakable mindset. The Elite Iron program is no joke.",
      role: "Elite Program Client"
    },
    {
      name: "Sarah J.",
      quote: "I thought I knew how to train hard until I met Erk. He reprogrammed my entire approach to intensity and recovery. I'm lifting numbers I never thought possible.",
      role: "Pro Forge Client"
    },
    {
      name: "David L.",
      quote: "The nutrition strategy alone was worth the investment. No fluff, no trending diets, just science-backed fueling that turned me into a machine.",
      role: "Starter Anvil Client"
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-primary font-display uppercase tracking-widest mb-2">Forged By Fire</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold uppercase text-white">Words of the <span className="text-gray-500">Iron Clan</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="metal-panel p-8 relative border border-white/5 hover:border-primary/30 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
              <p className="text-gray-400 italic mb-8 relative z-10 font-sans leading-relaxed">
                "{review.quote}"
              </p>
              <div className="border-t border-white/10 pt-6 mt-auto">
                <h5 className="font-display font-bold text-white text-xl tracking-wide uppercase">{review.name}</h5>
                <span className="text-primary text-sm font-display tracking-widest uppercase">{review.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
