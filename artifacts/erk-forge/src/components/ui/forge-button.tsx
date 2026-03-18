import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface ForgeButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export const ForgeButton = React.forwardRef<HTMLButtonElement, ForgeButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:shadow-[0_0_25px_rgba(255,69,0,0.6)] border border-orange-500/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/10",
      outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "bg-transparent text-foreground hover:bg-white/5",
    }

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-display uppercase tracking-wider font-bold rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </motion.button>
    )
  }
)
ForgeButton.displayName = "ForgeButton"
