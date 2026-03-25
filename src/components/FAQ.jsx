import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi'

const faqs = [
  {
    question: 'What areas do you cover for same-day delivery?',
    answer: 'We cover all major UK cities for same-day delivery including London, Birmingham, Manchester, Leeds, Edinburgh, and Glasgow. For other areas, please contact us and we\'ll arrange the fastest possible service.',
  },
  {
    question: 'How can I track my delivery?',
    answer: 'Once your parcel is collected, you\'ll receive a unique tracking link via SMS and email. Our real-time GPS tracking allows you to see your parcel\'s exact location at any time.',
  },
  {
    question: 'Are my items insured during transit?',
    answer: 'Yes, all shipments are fully insured. Standard coverage is included in every booking. For high-value items, we offer enhanced insurance options — just let us know when booking.',
  },
  {
    question: 'What size parcels can you deliver?',
    answer: 'We handle everything from small envelopes and documents to large furniture and pallets. Our fleet includes motorcycles, vans, and artic trucks to accommodate any size requirement.',
  },
  {
    question: 'Can I book a collection for today?',
    answer: 'Absolutely! For same-day collection, simply book before 2 PM and we\'ll have a driver at your door within 60-90 minutes. For later bookings, we\'ll arrange the earliest available slot.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we provide door-to-door international delivery services. We handle all customs documentation and offer tracked shipping to over 200 countries worldwide.',
  },
  {
    question: 'How do your movers & packers services work?',
    answer: 'Our professional team will visit your location, assess the items, provide packing materials, carefully pack everything, load it onto our vehicles, transport it, and unpack at the destination. We offer both local and long-distance moving.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, bank transfers, and can set up invoicing accounts for regular business customers. Payment is taken at the time of booking.',
  },
]

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border-[1px] rounded-[12px] px-[1.5rem] py-[1.25rem] mb-[0.75rem] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ${
        isOpen ? 'border-[#4F8EF7]' : 'border-[#e2e8f0]'
      }`}
    >
      <button
        onClick={onToggle}
        id={`faq-toggle-${index}`}
        className="w-full flex items-center justify-between text-left group cursor-pointer"
      >
        <span className={`font-heading font-semibold text-base sm:text-lg pr-4 transition-colors duration-200 ${
          isOpen ? 'text-royal' : 'text-navy group-hover:text-royal'
        }`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-gradient-to-br from-royal to-electric text-white rotate-0'
            : 'bg-gray-100 text-gray-400 group-hover:bg-electric/10 group-hover:text-electric'
        }`}>
          {isOpen ? <FiMinus className="text-sm" /> : <FiPlus className="text-sm" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 text-sm sm:text-base leading-relaxed pl-0 sm:pl-1 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-6 sm:py-10 bg-white relative overflow-visible w-full">
      {/* Precision Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#1A3CFF]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4F8EF7]/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#1A3CFF]/10 text-[#1A3CFF] rounded-full text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6"
          >
            Operational Intelligence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A0F2C] mb-6 sm:mb-8 tracking-tighter"
          >
            Knowledge<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3CFF] to-[#4F8EF7]">
              Repository
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium"
          >
            Critical insights into our infrastructure, security protocols, and international delivery frameworks.
          </motion.p>
        </div>

        {/* Accordion Grid */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group overflow-hidden rounded-[20px] sm:rounded-[24px] border transition-all duration-500 ${
                openIndex === i 
                ? 'border-[#1A3CFF] bg-[#1A3CFF]/[0.02] shadow-xl shadow-[#1A3CFF]/5' 
                : 'border-gray-100 hover:border-[#1A3CFF]/30 bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7 text-left outline-none cursor-pointer"
              >
                <span className={`font-heading font-black text-base sm:text-xl pr-4 transition-colors duration-300 ${
                  openIndex === i ? 'text-[#1A3CFF]' : 'text-[#0A0F2C]'
                }`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  openIndex === i 
                  ? 'bg-[#1A3CFF] border-[#1A3CFF] text-white rotate-0' 
                  : 'border-gray-200 text-[#0A0F2C]'
                }`}>
                  {openIndex === i ? <FiMinus className="text-[10px] sm:text-xs" /> : <FiPlus className="text-[10px] sm:text-xs" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-0 sm:pt-2">
                      <div className="w-full h-px bg-gradient-to-r from-[#1A3CFF]/20 to-transparent mb-5 sm:mb-6" />
                      <p className="text-gray-500 text-sm sm:text-lg leading-relaxed font-medium max-w-3xl">
                        {faq.answer}
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
          className="mt-20 text-center"
        >
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">Still have questions?</p>
          <a
            href="mailto:info@infinitemetric.co.uk"
            className="text-[#1A3CFF] font-black text-lg hover:text-[#4F8EF7] transition-colors flex items-center justify-center gap-2 group"
          >
            Connect with our Operations Team <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
