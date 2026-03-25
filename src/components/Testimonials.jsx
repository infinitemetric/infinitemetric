import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { HiStar } from 'react-icons/hi'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    company: 'Mitchell & Co. Solicitors',
    text: "Absolutely brilliant service. We needed urgent legal documents delivered same-day across London and Infinite Metric handled it flawlessly. They're our go-to courier now.",
    rating: 5,
  },
  {
    name: 'James Henderson',
    company: 'TechFlow Solutions',
    text: "We ship hardware to clients weekly and IM has never let us down. Real-time tracking, professional drivers, and genuinely helpful customer support. Highly recommended.",
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    company: 'HomeStyle Interiors',
    text: "Used their movers & packers service for our office relocation. Everything was packed with care, delivered on time, and the team was incredibly professional. Will use again!",
    rating: 5,
  },
  {
    name: 'David Clarke',
    company: 'Clarke Family',
    text: "Sent a birthday gift to my mum in Edinburgh from London. Next-day delivery, beautifully handled, and I could track it the whole way. Exceeded all expectations.",
    rating: 5,
  },
  {
    name: 'Emily Watson',
    company: 'Watson E-Commerce Ltd',
    text: "As an e-commerce business, reliable delivery is everything. Infinite Metric's consistency and speed have helped us maintain our 5-star seller rating. Couldn't be happier.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 8000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section id="testimonials" className="py-6 sm:py-10 bg-[#0A0F2C] relative overflow-hidden w-full text-white">
      {/* Cinematic Overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A3CFF]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4F8EF7]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Left Side: Visual/Context */}
          <div className="lg:col-span-5 order-first lg:order-none">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <div className="inline-block px-4 py-1.5 bg-[#4F8EF7]/10 text-[#4F8EF7] rounded-full text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase border border-[#4F8EF7]/20">
                Network Credibility
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl leading-[1.1] tracking-tighter">
                The Logistics Choice of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8EF7] to-blue-300">
                  Global Enterprises
                </span>
              </h2>
              <p className="text-white/40 text-base sm:text-lg leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                We're proud to support the world's most demanding businesses with delivery precision that exceeds expectations every single day.
              </p>

              {/* Stats Mini Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-8 w-max mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-white">4.9/5</div>
                  <div className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-widest font-bold">User Rating</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-white">99.8%</div>
                  <div className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-widest font-bold">On-Time Rate</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Testimony Carousel */}
          <div className="lg:col-span-7 relative">
            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 lg:p-16 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4F8EF7]/20 rounded-full blur-3xl hidden sm:block" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col h-full"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6 sm:mb-8 justify-center sm:justify-start">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <HiStar key={i} className="text-[#FF6B2B] text-lg sm:text-xl" />
                    ))}
                  </div>

                  {/* Testimony */}
                  <blockquote className="relative flex-grow">
                    <span className="absolute -top-8 -left-4 sm:-top-12 sm:-left-8 text-white/5 text-[8rem] sm:text-[12rem] font-black select-none pointer-events-none leading-none">"</span>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 sm:mb-10 text-white !leading-snug text-center sm:text-left relative z-10">
                      {testimonials[current].text}
                    </p>
                  </blockquote>

                  {/* Author Details */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 pt-6 sm:pt-8 border-t border-white/5 mt-auto">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1A3CFF] to-[#4F8EF7] flex items-center justify-center text-lg sm:text-xl font-black shadow-xl shrink-0">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-[#4F8EF7] text-[10px] sm:text-xs font-black uppercase tracking-widest mt-0.5">
                        {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center gap-6 mt-12">
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        i === current ? 'w-10 bg-[#FF6B2B]' : 'w-4 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <div className="ml-auto flex gap-3">
                  <button
                    onClick={prev}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#4F8EF7] hover:border-[#4F8EF7] transition-all cursor-pointer group"
                  >
                    <FiChevronLeft className="text-xl group-hover:scale-125 transition-transform" />
                  </button>
                  <button
                    onClick={next}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#4F8EF7] hover:border-[#4F8EF7] transition-all cursor-pointer group"
                  >
                    <FiChevronRight className="text-xl group-hover:scale-125 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
