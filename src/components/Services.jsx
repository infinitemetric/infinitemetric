import { motion } from 'framer-motion'
import { FiArrowUpRight, FiZap, FiTruck, FiGlobe, FiPackage, FiShield } from 'react-icons/fi'

const services = [
  {
    icon: <FiZap />,
    title: 'Fast Delivery',
    subtitle: 'Same-day collection and delivery for urgent items.',
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: <FiTruck />,
    title: 'Versatile Fleet',
    subtitle: 'From small vans to large trucks for all parcel sizes.',
    color: 'from-electric to-blue-400',
  },
  {
    icon: <FiShield />,
    title: 'Secure Handling',
    subtitle: 'Fully insured and GPS-tracked for your peace of mind.',
    color: 'from-emerald-600 to-emerald-400',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#F8FAFC_0%,transparent_50%)] opacity-100" />
      {/* The following two divs were part of the original dark mode background and are kept as they are not explicitly removed or replaced by the instruction. */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-royal/[0.05] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      {/* The original grid background is also kept as it's not explicitly removed. */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            <span className="text-accent font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">
                Professional Delivery Solutions
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tighter leading-tight"
            >
                Reliable{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-600">
                  Delivery Services
                </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 lg:text-right font-medium max-w-xs"
          >
            We provide specialized logistics solutions tailored for your business needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[360px] flex flex-col p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-royal/30 transition-smooth overflow-hidden shadow-xl hover:shadow-royal/5"
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color}/5 to-transparent rounded-bl-[100px] -mr-4 -mt-4 group-hover:scale-150 transition-transform duration-700`} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-royal mb-6 group-hover:bg-royal group-hover:text-white transition-all duration-500 border border-slate-100">
                  {service.icon}
                </div>
                
                <h3 className="font-heading font-black text-xl text-slate-900 mb-4 tracking-tight group-hover:text-royal transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-auto group-hover:text-slate-700 transition-colors font-medium">{service.subtitle}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-widest mb-1">Service Level</p>
                    <p className="text-slate-900 font-bold text-xs">Standard Business</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-royal group-hover:text-white transition-all">
                    <FiArrowUpRight />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
