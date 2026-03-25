import { FiMail, FiPhone, FiGlobe, FiChevronRight, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
  ]

  const supportLinks = [
    { name: 'Tracking', href: '#' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy', href: '#' },
  ]

  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-20 sm:py-24 relative overflow-hidden w-full">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* Brand Module */}
          <div className="space-y-8 text-center sm:text-left">
            <img 
              src="/logo.png" 
              alt="Infinite Metric" 
              className="h-10 w-auto mx-auto sm:mx-0 object-contain" 
            />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0 font-medium">
              Premium UK & International logistics solutions. Delivering reliability and professional excellence since 2024.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4">
               {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                 <a key={social} href="#" className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-royal hover:shadow-xl transition-all">
                   <FiGlobe />
                 </a>
               ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-10">Navigation</h4>
            <ul className="space-y-5">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-royal transition-colors text-sm font-black uppercase tracking-widest flex items-center gap-2 justify-center sm:justify-start group">
                    <FiChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all font-bold" /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-10">Help Desk</h4>
            <ul className="space-y-5">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-royal transition-colors text-sm font-black uppercase tracking-widest flex items-center gap-2 justify-center sm:justify-start group">
                    <FiChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all font-bold" /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operations Module */}
          <div className="space-y-10 text-center sm:text-left">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-10">Operations Center</h4>
            <div className="space-y-6">
              <div className="flex flex-col gap-1 items-center sm:items-start group">
                <span className="text-slate-300 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Global Headquarters</span>
                <span className="text-slate-900 font-bold text-sm leading-relaxed">
                  Regal House, 70 London Road,<br/>
                  Twickenham, TW1 3QS<br/>
                  United Kingdom
                </span>
              </div>
              <a href="mailto:ops@infinitemetric.com" className="flex flex-col gap-1 items-center sm:items-start group">
                <span className="text-slate-300 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Direct Email Support</span>
                <span className="text-slate-900 font-black text-sm group-hover:text-royal transition-colors">ops@infinitemetric.com</span>
              </a>
              <a href="tel:+447896656811" className="flex flex-col gap-1 items-center sm:items-start group">
                <span className="text-slate-300 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">24/7 Logistics Hotline</span>
                <span className="text-slate-900 font-black text-sm group-hover:text-royal transition-colors">+44 7896 656811</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2024 Infinite Metric Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-10">
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Company No: 12345678</p>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">UK Operation</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
