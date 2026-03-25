import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiShield, FiNavigation, FiAward, FiHeadphones } from 'react-icons/fi'

const stats = [
  { number: 500, suffix: '+', label: 'Deliveries/Month' },
  { number: 98, suffix: '%', label: 'On-Time Rate' },
  { number: 5, suffix: '★', label: 'Customer Rating' },
  { number: 60, suffix: 'm', label: 'Target Collection' },
]

const pillars = [
  {
    icon: <FiShield className="text-2xl" />,
    title: 'Safety First',
    description: 'Every parcel is handled with care and covered by comprehensive insurance.',
  },
  {
    icon: <FiNavigation className="text-2xl" />,
    title: 'Real-Time Tracking',
    description: 'Track your delivery live from pickup to doorstep with GPS updates.',
  },
  {
    icon: <FiAward className="text-2xl" />,
    title: 'Fully Insured',
    description: 'Complete coverage for your goods. Ship with confidence, always.',
  },
  {
    icon: <FiHeadphones className="text-2xl" />,
    title: '24/7 Support',
    description: 'Our team is always available to help, day or night, every day of the year.',
  },
]

function AnimatedNumber({ target, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="stat-number text-3xl sm:text-4xl lg:text-5xl">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-8 sm:py-12 bg-white overflow-hidden w-full">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#F1F5F9_0%,transparent_50%)] opacity-100" />
      
      {/* Cinematic Glows */}
      {/* Removed cinematic glows for light mode */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-6"
          >
            <span className="text-royal font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">
              Trusted Delivery Partners
            </span>
          </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tighter leading-tight"
            >
              Why{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-400">
                Choose Us
              </span>
            </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium"
          >
            Redefining logistics through traditional reliability and modern data architecture.
          </motion.p>
        </div>

        {/* Premium Stats Row */}
        <div className="relative mb-20 sm:mb-32">
          <div className="absolute -inset-2 bg-slate-100 rounded-[36px] opacity-5 hidden lg:block" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white rounded-[28px] border border-slate-100 shadow-lg overflow-hidden"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`p-8 sm:p-10 text-center sm:text-left group hover:bg-slate-50 transition-smooth border-slate-100`}
              >
                <div className="flex flex-col gap-1 items-center sm:items-start">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  <p className="text-slate-900 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-royal transition-colors mt-2 text-center sm:text-left">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col p-8 sm:p-10 rounded-[40px] bg-white border border-slate-100 hover:bg-slate-50 hover:shadow-lg transition-smooth group items-center sm:items-start text-center sm:text-left shadow-md shadow-slate-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-royal/10 flex items-center justify-center text-royal mb-10 group-hover:rotate-[10deg] transition-transform shadow-md shadow-royal/10">
                {pillar.icon}
              </div>
              <h3 className="font-heading font-black text-xl text-slate-900 mb-4 tracking-tight group-hover:text-royal transition-colors">{pillar.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium group-hover:text-slate-700 transition-colors">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
