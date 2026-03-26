import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const fleet = [
  {
    title: 'Parcel Car',
    label: 'Small parcels & urgent docs',
    description: 'Rapid urban courier service for time-critical documents, small packages, and same-day deliveries across all major UK cities.',
    image: '/WhatsApp%20Image%202026-03-26%20at%207.01.50%20PM.jpeg',
  },
  {
    title: 'Logistics Van',
    label: 'Large packages & boxes',
    description: 'High-capacity van fleet for larger consignments, multi-drop deliveries, and business-to-business logistics across the United Kingdom.',
    image: '/WhatsApp%20Image%202026-03-26%20at%206.13.28%20PM.jpeg',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-surface-light relative">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-accent/8 border border-accent/15 rounded-full mb-8 w-fit"
          >
            <span className="text-accent font-bold text-[11px] uppercase tracking-[0.2em] block leading-none">
              What We Deliver
            </span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-[-0.03em] leading-[1.1]"
            >
              One Fleet. <br /> <span className="text-accent">Every Corner of the UK.</span>
            </motion.h2>
            <p className="text-text-muted text-lg max-w-sm font-medium font-body leading-relaxed">
              Nationwide reach with a multi-modal fleet designed for high-velocity business demands.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fleet.map((vehicle, i) => (
            <motion.div
              key={vehicle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col group h-full card-hover"
            >
              <div className="relative h-[260px] rounded-[20px_20px_0_0] overflow-hidden border border-border-subtle border-b-0 shadow-sm">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-primary">{vehicle.label}</span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-8 bg-white rounded-[0_0_20px_20px] border border-border-subtle border-t-0">
                <h3 className="font-heading font-bold text-2xl text-text-primary mb-3 tracking-tight">{vehicle.title}</h3>
                <p className="text-text-muted text-sm leading-[1.7] mb-8 font-medium font-body">
                  {vehicle.description}
                </p>
                <a 
                  href="#booking" 
                  className="mt-auto flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-text-primary hover:text-accent transition-colors duration-300 group-hover:gap-4"
                >
                  Book This Service <FiArrowRight className="text-accent" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
