import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ForgeButton } from "@/components/ui/forge-button"
import { useToast } from "@/hooks/use-toast"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short, elaborate your goals"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    
    toast({
      title: "Transmission Sent",
      description: "Your message has entered the forge. We will reach out shortly.",
      variant: "default",
      className: "bg-black border-primary text-white font-display",
    })
    reset()
  }

  const InputClass = "w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-sans"

  return (
    <section id="contact" className="py-24 bg-background relative border-t border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-display uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary block"></span> Take Action
            </h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold uppercase text-white mb-6">
              Step Into <br/> The <span className="forge-text-gradient">Fire</span>
            </h3>
            <p className="text-gray-400 mb-10 text-lg">
              Ready to stop making excuses? Fill out the form to apply for coaching. Spots are extremely limited as I only work with those dedicated to the iron.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors cursor-pointer">
                <div className="bg-white/5 p-3 rounded-sm border border-white/10">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-display uppercase tracking-widest">Email</div>
                  <div className="font-sans">info@erkforgecoaching.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="bg-white/5 p-3 rounded-sm border border-white/10">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-display uppercase tracking-widest">Location</div>
                  <div className="font-sans">Global / Online Coaching</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="metal-panel p-8 border border-white/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Your Name</label>
                <input 
                  type="text" 
                  {...register("name")} 
                  className={InputClass} 
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-primary text-sm mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  {...register("email")} 
                  className={InputClass} 
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-primary text-sm mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase font-display tracking-widest">Current Goals / Message</label>
                <textarea 
                  {...register("message")} 
                  rows={5}
                  className={InputClass} 
                  placeholder="Tell me where you are and where you want to be..."
                />
                {errors.message && <span className="text-primary text-sm mt-1 block">{errors.message.message}</span>}
              </div>

              <ForgeButton type="submit" className="w-full" isLoading={isSubmitting}>
                Submit Application
              </ForgeButton>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
