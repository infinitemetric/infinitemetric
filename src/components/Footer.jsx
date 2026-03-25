import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiLayers } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const serviceLinks = [
  { name: 'Same Day Courier', href: '#services' },
  { name: 'UK Next Day Delivery', href: '#services' },
  { name: 'Global Strategy', href: '#services' },
  { name: 'Movers & Packers', href: '#services' },
]

const quickLinks = [
  { name: 'Mission Home', href: '#home' },
  { name: 'Secure Booking', href: '#booking' },
  { name: 'Infrastructure', href: '#services' },
  { name: 'Trust Assets', href: '#why-us' },
  { name: 'Global Coverage', href: '#coverage' },
  { name: 'FAQ Matrix', href: '#faq' },
]

const socials = [
  { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-[#05081a] relative overflow-hidden w-full text-white pt-24 pb-12">
      {/* Cinematic Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-royal via-electric to-accent opacity-50 shadow-[0_4px_20px_rgba(26,60,255,0.3)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 lg:mb-24">
          {/* Brand Infrastructure */}
          <div className="space-y-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-3 group transition-transform hover:scale-102">
              <img 
                src="/logo.png" 
                alt="Logo"
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/40 text-[13px] leading-relaxed max-w-xs font-medium uppercase tracking-widest text-center sm:text-left">
              UK's PREMIER PRECISION LOGISTICS INFRASTRUCTURE. REDEFINING RELIABILITY THROUGH SCALABLE SPEED AND INTEGRITY.
            </p>
            {/* Social Matrix */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-royal hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-500 border border-white/5"
                >
                  <span className="scale-100">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-heading font-black text-white text-[10px] mb-8 uppercase tracking-[0.4em] text-royal">
              PROTOCOL
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/30 text-xs sm:text-[13px] hover:text-white transition-smooth flex items-center justify-center sm:justify-start gap-3 group font-black uppercase tracking-widest"
                  >
                    <span className="w-1 h-1 rounded-full bg-royal opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Matrix */}
          <div className="text-center sm:text-left">
            <h4 className="font-heading font-black text-white text-[10px] mb-8 uppercase tracking-[0.4em] text-electric">
              VERTICALS
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/30 text-xs sm:text-[13px] hover:text-white transition-smooth flex items-center justify-center sm:justify-start gap-3 group font-black uppercase tracking-widest"
                  >
                    <span className="w-1 h-1 rounded-full bg-electric opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Matrix */}
          <div className="text-center sm:text-left space-y-8">
            <h4 className="font-heading font-black text-white text-[10px] uppercase tracking-[0.4em] text-accent">
              COMMAND CENTER
            </h4>
            <ul className="space-y-6">
              <li>
                <a href="tel:+447896656811" className="flex items-center justify-center sm:justify-start gap-4 text-white hover:text-royal transition-smooth group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-royal/10 transition-colors hidden sm:flex">
                    <FiPhone className="text-royal text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Phone Infrastructure</p>
                    <p className="text-base font-bold">+44 7896 656811</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@infinitemetric.co.uk" className="flex items-center justify-center sm:justify-start gap-4 text-white hover:text-electric transition-smooth group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-electric/10 transition-colors hidden sm:flex">
                    <FiMail className="text-electric text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Email Uplink</p>
                    <p className="text-base font-bold">info@infinitemetric.co.uk</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Footer Sub-Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-40">
          <p className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-center sm:text-left">
            © {new Date().getFullYear()} Infinite Metric Logistics Limited. All rights reserved. Precision is Priority.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Legal', 'Governance'].map(link => (
              <a key={link} href="#" className="text-[10px] sm:text-[11px] font-black hover:text-white transition-colors uppercase tracking-[0.2em]">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
