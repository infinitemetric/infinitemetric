import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPackage, FiTruck, FiPhone, FiArrowRight, FiMail, FiMessageSquare } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi'

export default function BookingWidget() {
  const [form, setForm] = useState({
    pickup: '',
    delivery: '',
    parcelSize: '',
    serviceType: 'same-day',
    phone: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.pickup.trim()) newErrors.pickup = 'Required'
    if (!form.delivery.trim()) newErrors.delivery = 'Required'
    if (!form.parcelSize) newErrors.parcelSize = 'Select'
    if (!form.phone.trim()) newErrors.phone = 'Required'
    if (!form.email.trim()) newErrors.email = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSending(true)
    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY
      const senderEmail = import.meta.env.VITE_SENDER_EMAIL
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL

      const response = await fetch('/api-brevo/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Infinite Metric Website', email: senderEmail },
          to: [{ email: contactEmail, name: 'Admin' }],
          subject: 'New Booking Inquiry',
          htmlContent: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #FF6B2B;">New Booking Request</h2>
              <p><strong>Pickup:</strong> ${form.pickup}</p>
              <p><strong>Delivery:</strong> ${form.delivery}</p>
              <p><strong>Size:</strong> ${form.parcelSize}</p>
              <p><strong>Service:</strong> ${form.serviceType}</p>
              <p><strong>Phone:</strong> ${form.phone}</p>
              <p><strong>Email:</strong> ${form.email}</p>
              <p><strong>Message:</strong> ${form.message || 'No additional message'}</p>
            </div>
          `,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 8000)
        setForm({ pickup: '', delivery: '', parcelSize: '', serviceType: 'same-day', phone: '', email: '', message: '' })
      } else {
        handleWhatsAppRedirect()
      }
    } catch (err) {
      handleWhatsAppRedirect()
    } finally {
      setIsSending(false)
    }
  }

  const handleWhatsAppRedirect = () => {
    const text = `New Booking Request:%0A- Pickup: ${form.pickup}%0A- Delivery: ${form.delivery}%0A- Size: ${form.parcelSize}%0A- Service: ${form.serviceType}%0A- Email: ${form.email}%0A- Message: ${form.message || 'N/A'}`
    window.open(`https://wa.me/447896656811?text=${text}`, '_blank')
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <section id="booking" className="relative -mt-16 z-30 px-6 overflow-visible w-full min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto"
      >
        <div className="relative group">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-royal via-electric to-accent rounded-[32px] blur sm:opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative glass shadow-2xl rounded-[28px] p-1">
            <div className="bg-navy/90 backdrop-blur-2xl rounded-[26px] px-5 py-8 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-left">
                  <span className="text-electric font-black text-[8px] sm:text-[9px] uppercase tracking-[0.3em] mb-1.5 block">Instant Logistics Matrix</span>
                  <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tighter">
                    Precision{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-blue-400 to-blue-200">
                      Booking
                    </span>
                  </h2>
                </div>
                <p className="text-white/40 text-[8px] sm:text-[9px] max-w-[180px] md:text-right mt-1 md:mt-0 font-bold uppercase tracking-widest leading-normal">
                  Secure your mission parameters for immediate collection.
                </p>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mb-8 p-6 sm:p-8 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 text-center relative overflow-hidden group shadow-2xl shadow-emerald-500/5"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 border border-emerald-500/30">
                      <HiCheckCircle className="text-3xl" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-white font-black text-xl sm:text-2xl uppercase tracking-tighter">Thank You!</h3>
                      <p className="text-emerald-400 font-bold text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                        <span className="text-white font-black">Infinite Metric Limited</span> will contact you within the hour.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Pickup', field: 'pickup', icon: <FiMapPin className="text-electric" />, placeholder: 'W1 London', type: 'text' },
                    { label: 'Delivery', field: 'delivery', icon: <FiMapPin className="text-accent" />, placeholder: 'M1 Manchester', type: 'text' },
                    { label: 'Parcel Size', field: 'parcelSize', icon: <FiPackage className="text-royal" />, type: 'select', 
                      options: [
                        { value: '', label: 'Select Dimension' },
                        { value: 'small', label: 'Small (<5kg)' },
                        { value: 'medium', label: 'Medium (5-20kg)' },
                        { value: 'large', label: 'Large (20-50kg)' },
                        { value: 'pallet', label: 'Pallet Mission' }
                      ] 
                    },
                    { label: 'Service Speed', field: 'serviceType', icon: <FiTruck className="text-electric" />, type: 'select', 
                      options: [
                        { value: 'same-day', label: 'Same Day Express' },
                        { value: 'next-day', label: 'Standard Next Day' },
                        { value: 'international', label: 'Global Strategy' }
                      ] 
                    },
                  ].map((field) => (
                    <div key={field.label} className="relative space-y-3">
                      <label className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-[0.2em]">
                        {field.icon} {field.label}
                      </label>
                      <div className="relative group/field">
                        {field.type === 'select' ? (
                          <div className="relative">
                            <select
                              value={form[field.field]}
                              onChange={(e) => handleChange(field.field, e.target.value)}
                              className={`w-full h-14 px-6 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm font-bold focus:border-electric transition-all outline-none appearance-none cursor-pointer ${errors[field.field] ? 'border-red-500/50' : ''}`}
                            >
                              {field.options.map(opt => <option key={opt.value} value={opt.value} className="bg-navy">{opt.label}</option>)}
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover/field:opacity-60 transition-opacity">
                              <FiArrowRight className="rotate-90 text-xs" />
                            </div>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.field]}
                            onChange={(e) => handleChange(field.field, e.target.value)}
                            className={`w-full h-14 px-6 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm font-bold focus:border-electric transition-all outline-none placeholder:text-white/10 ${errors[field.field] ? 'border-red-500/50' : ''}`}
                          />
                        )}
                        {errors[field.field] && <span className="absolute -bottom-5 left-1 text-red-400 text-[8px] font-black uppercase tracking-widest">{errors[field.field]}</span>}
                      </div>
                    </div>
                  ))}

                  <div className="relative space-y-3">
                    <label className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-[0.2em]">
                      <FiPhone className="text-electric" /> Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7XXX XXXXXX"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full h-14 px-6 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm font-bold focus:border-electric transition-all outline-none placeholder:text-white/10 ${errors.phone ? 'border-red-500/50' : ''}`}
                    />
                    {errors.phone && <span className="absolute -bottom-5 left-1 text-red-400 text-[8px] font-black uppercase tracking-widest">{errors.phone}</span>}
                  </div>

                  <div className="relative space-y-3">
                    <label className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-[0.2em]">
                      <FiMail className="text-royal" /> Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="client@enterprise.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-xs font-bold text-white outline-none focus:border-electric/50 focus:bg-white/10 transition-all placeholder:text-white/20`}
                    />
                    {errors.email && <span className="absolute -bottom-5 left-1 text-red-400 text-[8px] font-black uppercase tracking-widest">{errors.email}</span>}
                  </div>

                  <div className="lg:col-span-1 relative group">
                    <label className="flex items-center gap-2 text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1.5 transition-colors group-hover:text-electric">
                      <FiMessageSquare className="text-accent" /> Message (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Additional details..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white outline-none focus:border-electric/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-end h-full">
                    <button
                      type="submit"
                      disabled={isSending}
                      className={`btn-primary w-full h-14 bg-accent text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-accent/20 flex items-center justify-center gap-3 ${isSending ? 'opacity-50' : 'hover:scale-[1.02]'}`}
                    >
                      {isSending ? <>SYNCING...</> : <>INITIATE MISSION <FiArrowRight className="text-base" /></>}
                    </button>
                  </div>
                </div>
              </form>

              {/* Bottom Trust Line */}
              <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
                {['FULLY INSURED', 'TRACKED LIVE', '24/7 SUPPORT', 'DATA SECURE'].map(trust => (
                  <div key={trust} className="text-center group cursor-default">
                    <p className="text-white font-black text-[9px] mb-1 group-hover:text-electric transition-colors tracking-[0.2em]">{trust}</p>
                    <div className="w-4 h-[1px] bg-white/10 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
