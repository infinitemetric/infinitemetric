import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

export default function Footer() {
  const quickLinks = [
    { name: 'Parcel Car', href: '#services' },
    { name: 'Logistics Van', href: '#services' },
    { name: 'Get a Quote', href: '#booking' },
    { name: 'How It Works', href: '#how-it-works' },
  ]

  const supportLinks = [
    { name: 'About Us', href: '#' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ]

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Top CTA Strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 style={{ color: '#FFFFFF' }} className="font-heading font-extrabold text-xl tracking-tight">Need a delivery today?</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-sm font-body mt-1">Get an instant quote in under 30 seconds.</p>
          </div>
          <a href="#booking" className="btn-sheen h-12 px-8 bg-white text-black border border-white/70 flex items-center gap-2.5 rounded-full font-bold text-sm uppercase tracking-[0.1em] glow-orange hover:bg-white/90 hover:scale-[1.03] transition-all active:scale-95 whitespace-nowrap">
            GET A QUOTE <FiArrowRight className="text-sm" />
          </a>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <img src="/logo.png" alt="Infinite Metric" className="h-10 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            <p style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm leading-relaxed font-body max-w-xs">
              UK-based logistics company specialising in same-day and next-day delivery services nationwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF' }} className="font-bold text-xs uppercase tracking-[0.15em] mb-6">Services</h4>
            <ul className="space-y-3.5">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} style={{ color: 'rgba(255,255,255,0.65)' }} className="hover:text-accent transition-colors duration-300 text-sm font-medium font-body">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: '#FFFFFF' }} className="font-bold text-xs uppercase tracking-[0.15em] mb-6">Company</h4>
            <ul className="space-y-3.5">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} style={{ color: 'rgba(255,255,255,0.65)' }} className="hover:text-accent transition-colors duration-300 text-sm font-medium font-body">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: '#FFFFFF' }} className="font-bold text-xs uppercase tracking-[0.15em] mb-6">Contact</h4>
            <div className="space-y-5">
              <div>
                <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5">Phone</span>
                <a href="tel:+447896656811" style={{ color: '#FFFFFF' }} className="hover:text-accent text-sm font-semibold transition-colors">+44 7896 656811</a>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5">Email</span>
                <a href="mailto:srujan.konda@infinitemetriclogistics.co.uk" style={{ color: '#FFFFFF' }} className="hover:text-accent text-sm font-semibold transition-colors break-all">srujan.konda@infinitemetriclogistics.co.uk</a>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5">Office</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }} className="text-sm leading-relaxed block">
                  Regal House, 70 London Road,<br />
                  Twickenham, TW1 3QS
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p style={{ color: 'rgba(255,255,255,0.35)' }} className="text-[11px] font-medium tracking-wide">
            © 2026 Infinite Metric Limited. Registered in England.
          </p>
          <div className="flex items-center gap-6">
            <span style={{ color: 'rgba(255,255,255,0.35)' }} className="text-[11px] font-medium">Company No: 12345678</span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }} className="text-[11px] font-medium">ISO 9001</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
