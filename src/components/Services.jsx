import { motion } from 'framer-motion'
import { FiArrowUpRight, FiZap, FiTruck, FiGlobe, FiPackage } from 'react-icons/fi'

const services = [
  {
    icon: <FiZap className="text-xl" />,
    title: 'Same Day Courier',
    description: 'High-velocity document and parcel delivery across all major UK business hubs within 60-90 minutes of collection.',
    speed: '60Mins Collection',
    image: '/services/same-day.png',
  },
  {
    icon: <FiTruck className="text-xl" />,
    title: 'UK Next Day',
    description: 'Cost-efficient precision distribution for your bulk consignments and retail inventory with end-to-end tracking.',
    speed: 'Guaranteed 09:00',
    image: '/services/next-day.png',
  },
  {
    icon: <FiGlobe className="text-xl" />,
    title: 'International',
    description: 'Strategic global freight solutions connecting your business to EMEA, Americas, and APAC with seamless customs clearing.',
    speed: 'Global Reach',
    image: '/services/international.png',
  },
  {
    icon: <FiPackage className="text-xl" />,
    title: 'Movers & Packers',
    description: 'White-glove logistical support for office relocations and residential moves. Specialized handling for fragile equipment.',
    speed: 'Expert Handling',
    image: '/services/movers.png',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-8 sm:py-12 bg-[#05081a] relative overflow-hidden w-full">
      {/* Precision Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-royal/[0.05] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 bg-electric/10 text-electric rounded-lg text-[9px] font-black mb-4 tracking-[0.3em] uppercase border border-electric/20"
            >
              Infrastructure
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tighter leading-tight"
            >
              Specialized Delivery<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-400">
                Verticals
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-[300px] text-xs sm:text-sm leading-relaxed font-semibold lg:text-right"
          >
            Providing the backbone for global supply chain missions through precision.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[400px] flex flex-col p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-electric/40 transition-smooth overflow-hidden shadow-2xl hover:shadow-electric/10"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-electric/10 to-transparent rounded-bl-[100px] -mr-4 -mt-4 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/5 shadow-xl flex items-center justify-center text-electric mb-6 group-hover:bg-electric group-hover:text-white transition-all duration-500 border border-white/10">
                  {service.icon}
                </div>
                
                <h3 className="font-heading font-black text-xl text-white mb-4 tracking-tight group-hover:text-electric transition-colors">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-auto group-hover:text-white/70 transition-colors font-medium">{service.description}</p>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Max Speed</p>
                    <p className="text-xs font-bold text-white">{service.speed}</p>
                  </div>
                  <a href="#booking" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-accent group-hover:text-white group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                    <FiArrowUpRight />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
