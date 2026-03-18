import { motion } from "framer-motion"
import { Target, Flame, Shield } from "lucide-react"

export function About() {
  const features = [
    { icon: <Flame className="w-6 h-6 text-primary" />, title: "Relentless Intensity", desc: "Training protocols designed to push boundaries and force adaptation." },
    { icon: <Target className="w-6 h-6 text-primary" />, title: "Precision Nutrition", desc: "Calculated fueling strategies that build muscle and torch fat." },
    { icon: <Shield className="w-6 h-6 text-primary" />, title: "Bulletproof Mindset", desc: "Building mental resilience to match your physical strength." },
  ]

  return (
    <section id="about" className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent blur-2xl z-0 rounded-full" />
            <div className="relative z-10 border border-white/10 metal-panel p-2 rounded-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={`${import.meta.env.BASE_URL}images/coach-portrait.png`} 
                alt="Coach Erk" 
                className="w-full h-auto object-cover grayscale-[0.2] contrast-[1.2]"
              />
            </div>
            
            {/* Floating stats badge */}
            <div className="absolute -bottom-6 -right-6 metal-panel p-4 z-20 border-l-4 border-l-primary flex items-center gap-4">
              <div className="text-4xl font-display font-bold text-white">10<span className="text-primary">+</span></div>
              <div className="text-xs font-display uppercase text-gray-400 tracking-wider">Years<br/>Forging<br/>Iron</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-display uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary block"></span> The Master Smith
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              I DON'T BUILD PROGRAMS. <br/>
              I BUILD <span className="text-white">WEAPONS.</span>
            </h3>
            
            <div className="space-y-6 text-gray-400 text-lg mb-10">
              <p>
                Welcome to the forge. My name is Erk, and my philosophy is simple: weak metal breaks, strong iron endures. I take people who are tired of mediocrity and hammer them into their absolute peak physical and mental condition.
              </p>
              <p>
                This isn't a 30-day quick fix. This is a complete overhaul of how you train, eat, and think. If you're looking for comfortable, look elsewhere. If you're looking for results, you've found your coach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="metal-panel p-5 border border-white/5 hover:border-primary/50 transition-colors group">
                  <div className="bg-black/50 w-12 h-12 flex items-center justify-center rounded-sm mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h4 className="font-display text-white uppercase tracking-wide mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
