import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus, FiArrowRight, FiChevronDown, FiMail, FiPhone } from 'react-icons/fi'

const faqs = [
  {
    q: 'What areas do you cover for same-day delivery?',
    a: 'We cover all major UK cities for same-day delivery including London, Birmingham, Manchester, Leeds, Edinburgh, and Glasgow. For other areas, please contact us and we\'ll arrange the fastest possible service.',
  },
  {
    q: 'How can I track my delivery?',
    a: 'Once your parcel is collected, you\'ll receive a unique tracking link via SMS and email. Our real-time GPS tracking allows you to see your parcel\'s exact location at any time.',
  },
  {
    q: 'Are my items insured during transit?',
    a: 'Yes, all shipments are fully insured. Standard coverage is included in every booking. For high-value items, we offer enhanced insurance options.',
  },
  {
    q: 'What size parcels can you deliver?',
    a: 'We handle everything from small envelopes and documents to large furniture and pallets. Our fleet includes motorcycles, vans, and trucks to accommodate any size requirement.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#F1F5F9_0%,transparent_70%)] opacity-100" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-royal/5 text-royal rounded-full text-[9px] font-black tracking-[0.2em] uppercase mb-6"
          >
            Support Center
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 tracking-tighter"
          >
            Common{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-600">
              Questions
            </span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
            Everything you need to know about our premium delivery services and logistics infrastructure.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border border-slate-100 rounded-[32px] overflow-hidden bg-white hover:border-royal/30 transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left outline-none"
              >
                <span className={`font-black text-slate-900 text-sm sm:text-base pr-8 tracking-tight transition-colors ${openIndex === i ? 'text-royal' : ''}`}>{item.q}</span>
                <div className={`w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center shrink-0 transition-all ${openIndex === i ? 'bg-royal text-white rotate-180' : 'text-slate-400 group-hover:text-royal group-hover:bg-royal/5'}`}>
                  <FiChevronDown />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-8">
                       <div className="w-12 h-1 bg-royal/10 rounded-full mb-6" />
                       <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                         {item.a}
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 rounded-[40px] bg-slate-50 border border-slate-100 text-center"
        >
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">Still have questions?</p>
          <a
            href="mailto:ops@infinitemetric.com"
            className="text-slate-900 font-black text-xl hover:text-royal transition-colors flex items-center justify-center gap-3 group"
          >
            Connect with our Operations Team <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
