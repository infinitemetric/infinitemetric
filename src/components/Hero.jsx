import { motion } from 'framer-motion'
import { FiArrowRight, FiActivity, FiGlobe, FiShield } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden w-full bg-slate-50">
      {/* Cinematic Background Infrastructure */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#FFFFFF_0%,transparent_70%)] opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#EFF6FF_0%,transparent_50%)] opacity-100" />
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} 
        />
        {/* Floating Abstract Element */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-royal/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-20 lg:pt-0 pb-12">
        {/* Left Column: Command Center */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-electric/10 border border-electric/20 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-electric text-[10px] font-black uppercase tracking-[0.3em]">System Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-black text-5xl sm:text-7xl xl:text-8xl text-slate-900 leading-[0.95] tracking-tight mb-8"
          >
            Infinite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-600">
              Metric Limited.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-500 text-base sm:text-lg lg:text-xl max-w-xl mb-12 leading-relaxed font-medium"
          >
            Premium, UK-wide delivery solutions for your business. Reliable, tracked, and professional services you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#booking"
              className="w-full sm:w-auto px-10 py-4 bg-accent text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Book Now <FiArrowRight />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-10 py-4 border-2 border-slate-200 bg-white text-slate-900 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Right Column: Mission Card Display */}
        <div className="hidden lg:block relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Logistics Image Container */}
            <div className="relative rounded-[48px] overflow-hidden border border-slate-200 shadow-[0_40px_100px_rgba(0,0,0,0.1)] aspect-[4/5] sm:aspect-auto sm:h-[600px] bg-white">
              <img 
                src="/premium_logistics_hub_light_1774460682763.png" 
                alt="Logistics Solutions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-60" />
            </div>

          </motion.div>
        </div>
      </div>

      {/* Modern Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
