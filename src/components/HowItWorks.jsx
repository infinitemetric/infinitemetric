import { motion } from 'framer-motion'
import { FiMousePointer, FiTruck, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    step: '01',
    icon: <FiMousePointer className="text-2xl" />,
    title: 'Book Mission',
    description: 'Configure your parameters in our secure booking interface for an instant strategic quote.',
    color: 'from-royal via-electric to-blue-400',
  },
  {
    step: '02',
    icon: <FiTruck className="text-2xl" />,
    title: 'Rapid Collection',
    description: 'Our fleet activates within 60 minutes. GPS-tracked recovery and secure handling guaranteed.',
    color: 'from-electric via-blue-400 to-blue-300',
  },
  {
    step: '03',
    icon: <FiCheckCircle className="text-2xl" />,
    title: 'Final Delivery',
    description: 'Precision drop-off with real-time verification and automated Proof of Delivery (POD).',
    color: 'from-accent via-orange-500 to-orange-400',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-6 sm:py-10 bg-white relative overflow-hidden w-full">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-block px-3 py-1 bg-royal/5 text-royal rounded-full text-[9px] font-black mb-4 tracking-[0.3em] uppercase">
            Protocol
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-navy mb-4 tracking-tighter">
            Three Simple{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-400">
              Steps
            </span>
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto text-xs sm:text-sm font-medium">
            Our process is engineered for the highest standard of corporate reliability.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px]">
            <div className="w-full h-full border-t border-dashed border-gray-200" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-royal via-electric to-accent origin-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative text-center group"
              >
                {/* Step Icon & Number */}
                <div className="relative mx-auto mb-10 w-max">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-2xl shadow-blue-500/10 group-hover:scale-110 group-hover:shadow-blue-500/20 transition-smooth rotate-3 group-hover:rotate-0`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-gray-100 z-20 group-hover:-translate-y-1 transition-transform">
                    <span className="text-navy font-black text-xs uppercase tracking-tighter">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading font-black text-xl text-navy mb-4 tracking-tight group-hover:text-royal transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto font-medium group-hover:text-gray-700 transition-colors">
                  {step.description}
                </p>

                {/* Mobile/Tablet Arrow Indicator */}
                {i < 2 && (
                  <div className="lg:hidden mt-8 text-royal/20 flex justify-center">
                    <div className="w-px h-12 bg-gradient-to-b from-royal/20 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
