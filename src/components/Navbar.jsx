import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiPhone, FiArrowRight } from 'react-icons/fi'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'How it Works', href: '#how-it-works' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled || mobileOpen
            ? 'py-2'
            : 'py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className={`relative flex items-center justify-between px-8 py-2.5 rounded-[28px] transition-all duration-700 border ${
            scrolled || mobileOpen
              ? 'bg-navy border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]'
              : 'bg-navy/40 backdrop-blur-xl border-white/10 shadow-2xl'
          }`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" className="relative group">
                <img 
                  src="/logo.png" 
                  alt="Infinite Metric"
                  className="h-9 sm:h-10 w-auto object-contain transition-all duration-500 brightness-0 invert"
                />
              </a>
            </div>

            {/* Modern Central Navigation */}
            <div className={`hidden lg:flex items-center gap-1 my-1 p-0.5 rounded-2xl ${scrolled ? 'bg-white/5' : 'bg-transparent'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{ color: 'white' }}
                  className="px-6 py-2.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 rounded-xl relative group overflow-hidden translate-y-0.5"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 rounded-xl bg-white/10" />
                </a>
              ))}
            </div>

            {/* Action Group */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex flex-col items-end group">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] leading-none mb-1 text-white/40">Urgent Support</p>
                <a 
                  href="tel:+447896656811" 
                  style={{ color: 'white' }}
                  className="font-black text-sm tracking-tighter flex items-center gap-2 hover:text-electric transition-colors"
                >
                  +44 7896 656811
                </a>
              </div>
              
              <a
                href="#booking"
                className="group px-8 py-3 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all duration-500 active:scale-95 flex items-center gap-3 bg-accent text-white hover:bg-orange-600 shadow-xl shadow-accent/20"
              >
                Book Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-2xl transition-colors border bg-white/10 text-white border-white/10 shadow-sm"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Modern High-End Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-navy lg:hidden p-6 pt-32 flex flex-col items-center justify-center space-y-12"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-4xl font-black text-white/30 hover:text-white transition-colors tracking-tighter"
              >
                {link.name}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-12 w-full max-w-sm space-y-6"
            >
              <a href="tel:+441234567890" className="w-full py-6 flex items-center justify-center gap-4 bg-white/5 border border-white/5 rounded-[32px] text-white">
                <FiPhone className="text-royal text-xl" />
                <span className="text-xl font-bold tracking-tight">0123 456 7890</span>
              </a>
              <a href="#booking" onClick={() => setMobileOpen(false)} className="w-full py-7 bg-accent text-white flex items-center justify-center gap-4 rounded-[40px] font-black uppercase tracking-widest text-lg shadow-2xl">
                Book Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
