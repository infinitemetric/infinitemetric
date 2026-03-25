import { motion } from 'framer-motion'
import { FiArrowRight, FiActivity, FiGlobe, FiShield } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden w-full bg-[#0A0F2C]">
      {/* Cinematic Background Infrastructure */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1A3CFF_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#4F8EF7_0%,transparent_50%)] opacity-10" />
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px'
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-48 lg:pt-32 pb-24">
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
            className="font-heading font-black text-5xl sm:text-7xl xl:text-8xl text-white leading-[0.95] tracking-tight mb-8"
          >
            Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-blue-400 to-blue-200">
              Logistics.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-base sm:text-lg lg:text-xl max-w-xl mb-12 leading-relaxed"
          >
            Engineered for the modern enterprise. We provide high-velocity, UK-wide courier solutions with absolute data transparency.
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
              className="w-full sm:w-auto px-10 py-4 border-2 border-white/60 bg-white/5 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-electric hover:border-electric transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
            >
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Right Column: Mission Card Display */}
        <div className="hidden lg:block relative">
          <motion.div
            initial={{ opacity: 0, rotateY: 20, x: 50 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            {/* Main Visual Card */}
            <div className="relative glass-card rounded-[48px] p-10 border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-royal/20 via-transparent to-transparent pointer-events-none" />
               
               <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                     <FiGlobe className="text-electric text-xl" />
                   </div>
                   <div>
                     <p className="text-white font-black text-xs uppercase tracking-widest">Route Matrix</p>
                     <p className="text-white/30 text-[10px] font-bold">Global Status: Optimal</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-royal font-black text-xs uppercase tracking-widest">Active</p>
                   <p className="text-white/20 text-[9px] font-black uppercase">UK Network</p>
                 </div>
               </div>

               {/* Simulated Data Points - Numbers removed */}
               <div className="space-y-6 mb-12">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                     <div className="flex-1">
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${30 + i * 20}%` }}
                           transition={{ duration: 2, delay: i * 0.3 }}
                           className="h-full bg-royal" 
                         />
                       </div>
                     </div>
                     <span className="text-[10px] font-black text-white/40 uppercase">En Route</span>
                   </div>
                 ))}
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 rounded-3xl bg-royal/10 border border-royal/20">
                   <FiActivity className="text-royal mb-3 text-lg" />
                   <p className="text-white font-black text-xs uppercase mb-1">Response</p>
                   <p className="text-white/40 text-[10px] font-bold">Direct Call Team</p>
                 </div>
                 <div className="p-1 px-6 pb-6 rounded-3xl bg-electric/10 border border-electric/20 flex flex-col items-center sm:items-start justify-end">
                   <FiShield className="text-electric mb-3 text-lg mt-5" />
                   <p className="text-white font-black text-xs uppercase mb-1">Insurance</p>
                   <p className="text-white/40 text-[10px] font-bold">Comprehensive</p>
                 </div>
               </div>
            </div>

            {/* Float Floating Icons */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -left-10 w-24 h-24 glass rounded-3xl border-white/10 flex items-center justify-center"
            >
              <HiCheckCircle className="text-emerald-500 text-3xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modern Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05081a] to-transparent pointer-events-none" />
    </section>
  )
}
