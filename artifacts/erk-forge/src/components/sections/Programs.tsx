import { motion } from "framer-motion"
import { ForgeButton } from "@/components/ui/forge-button"
import { Check } from "lucide-react"

export function Programs() {
  const plans = [
    {
      name: "Starter Anvil",
      price: "$99",
      period: "/month",
      desc: "For those ready to step into the fire.",
      features: ["Customized Training Plan", "Basic Macro Guidelines", "Monthly Check-ins", "Video Form Review", "Email Support"],
      highlight: false
    },
    {
      name: "Pro Forge",
      price: "$199",
      period: "/month",
      desc: "Comprehensive coaching for serious athletes.",
      features: ["Advanced Periodization", "Custom Meal Plans", "Weekly Check-ins", "Unlimited Form Review", "Direct WhatsApp Access", "Supplement Protocols"],
      highlight: true
    },
    {
      name: "Elite Iron",
      price: "$349",
      period: "/month",
      desc: "Complete lifestyle and physique mastery.",
      features: ["Everything in Pro Forge", "Daily Adjustments", "Contest Prep Peak Week", "Live 1-on-1 Sessions (1x/mo)", "Bloodwork Analysis Guidance", "Priority 24/7 Access"],
      highlight: false
    }
  ]

  return (
    <section id="programs" className="py-24 relative bg-[#0a0a0a]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display uppercase tracking-widest mb-2"
          >
            Coaching Tiers
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold uppercase"
          >
            Choose Your <span className="forge-text-gradient">Weapon</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-8 metal-panel transition-all duration-300 ${
                plan.highlight 
                  ? "border-primary/50 transform md:-translate-y-4 forge-shadow" 
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white font-display uppercase tracking-widest text-xs py-1 px-4 rounded-sm shadow-[0_0_10px_rgba(255,69,0,0.5)]">
                  Most Popular
                </div>
              )}
              
              <h4 className="font-display text-2xl font-bold uppercase mb-2">{plan.name}</h4>
              <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 font-sans">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <ForgeButton 
                variant={plan.highlight ? "primary" : "outline"} 
                className="w-full mt-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Apply Now
              </ForgeButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
