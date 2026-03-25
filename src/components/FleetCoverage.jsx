import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'
import { FaMotorcycle, FaTruckLoading, FaTruckMoving, FaCarSide } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'

const vehicles = [
  { name: 'Motorcycle', icon: <FaMotorcycle className="text-4xl" />, desc: 'Same-day urgent docs', capacity: 'Up to 5kg', color: 'from-blue-400 to-electric' },
  { name: 'Car', icon: <FaCarSide className="text-4xl" />, desc: 'Small parcels & boxes', capacity: 'Up to 20kg', color: 'from-electric to-royal' },
  { name: 'Small Van', icon: <FaTruckLoading className="text-4xl" />, desc: 'Parcels & small items', capacity: 'Up to 200kg', color: 'from-royal to-navy-light' },
]

export default function FleetCoverage() {
  return (
    <section id="coverage" className="py-12 sm:py-16 bg-navy relative overflow-visible w-full">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-royal)_0%,_transparent_70%)] opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
          >
            <span className="inline-block px-4 py-1.5 bg-electric/10 text-electric rounded-full text-[10px] sm:text-xs font-black mb-4 tracking-[0.2em] uppercase">
              Fleet & Coverage
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-4 sm:mb-6 leading-tight">
              Powerful Fleet.<br className="lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-blue-300">
                UK-Wide
              </span>{' '}
              Delivery.
            </h2>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              From small parcels to large cargo, we have the right vehicle for every delivery across the UK.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden sm:flex items-center justify-center lg:justify-start gap-4 p-4 sm:p-6 glass rounded-2xl border border-white/5 w-max mx-auto lg:mx-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-electric/20 flex items-center justify-center">
              <HiCheckCircle className="text-xl sm:text-2xl text-electric" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-xs sm:text-sm">24/7 Monitoring</p>
              <p className="text-white/30 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">Real-time GPS Active</p>
            </div>
          </motion.div>
        </div>

        {/* Fleet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-white/5 border border-white/10 hover:border-electric/40 transition-all duration-500 overflow-hidden text-center sm:text-left flex flex-col items-center sm:items-start h-full justify-between ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Multi-layered bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center sm:items-start w-full">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-6 sm:mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  {v.icon}
                </div>
                <h4 className="font-heading font-black text-white text-lg sm:text-xl mb-1 sm:mb-2 text-center sm:text-left">{v.name}</h4>
                <p className="text-white/30 text-[10px] sm:text-xs mb-6 sm:mb-8 font-bold uppercase tracking-widest text-center sm:text-left">{v.desc}</p>
                <div className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-electric text-[10px] sm:text-xs font-black border border-white/5 w-full">
                  <FiZap className="animate-pulse" /> {v.capacity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
