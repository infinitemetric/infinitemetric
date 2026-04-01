import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiPackage, FiPhone, FiArrowRight, FiMail, FiMessageSquare, FiCalendar, FiNavigation, FiShield, FiCheckCircle } from 'react-icons/fi'

export default function BookingWidget() {
  const [form, setForm] = useState({
    pickupAddress: '',
    pickupPostcode: '',
    pickupDate: '',
    deliveryAddress: '',
    deliveryPostcode: '',
    distanceMiles: '',
    parcelSize: '',
    serviceType: 'same-day',
    phone: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const MotionDiv = motion.div

  const minPickupDate = (() => {
    const now = new Date()
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    return localDate.toISOString().split('T')[0]
  })()

  const createBookingMeta = () => {
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '')
    const randomId = Math.floor(Math.random() * 999).toString().padStart(3, '0')
    const bookingRef = `BKG-${dateStr}-${randomId}`
    const now = new Date()
    const datePart = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(now)
    const timePart = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now).toLowerCase()
    const submittedDate = `${datePart} at ${timePart}`

    return { bookingRef, submittedDate }
  }

  const buildWhatsAppMessage = (bookingRef, submittedDate) => {
    return [
      '*Infinite Metric Limited - New Booking Enquiry*',
      '',
      `*Booking Reference:* ${bookingRef}`,
      `*Submitted:* ${submittedDate}`,
      '',
      '*1) Customer Details*',
      `- Phone: ${form.phone || 'N/A'}`,
      `- Email: ${form.email || 'N/A'}`,
      '',
      '*2) Collection Details*',
      `- Address: ${form.pickupAddress || 'N/A'}`,
      `- Postcode: ${form.pickupPostcode || 'N/A'}`,
      `- Date: ${form.pickupDate || 'N/A'}`,
      '',
      '*3) Delivery Details*',
      `- Address: ${form.deliveryAddress || 'N/A'}`,
      `- Postcode: ${form.deliveryPostcode || 'N/A'}`,
      `- Distance: ${form.distanceMiles ? `${form.distanceMiles} Miles` : 'N/A'}`,
      '',
      '*4) Shipment Information*',
      `- Parcel Size: ${form.parcelSize || 'N/A'}`,
      `- Service Type: ${form.serviceType || 'N/A'}`,
      '',
      '*Additional Notes*',
      form.message || 'N/A',
    ].join('\n')
  }

  const validate = () => {
    const newErrors = {}
    if (!form.pickupAddress.trim()) newErrors.pickupAddress = 'Required'
    if (!form.pickupPostcode.trim()) newErrors.pickupPostcode = 'Required'
    if (form.pickupDate && form.pickupDate < minPickupDate) newErrors.pickupDate = 'Choose today or later'
    if (!form.deliveryAddress.trim()) newErrors.deliveryAddress = 'Required'
    if (!form.deliveryPostcode.trim()) newErrors.deliveryPostcode = 'Required'
    if (!form.parcelSize) newErrors.parcelSize = 'Select'
    if (!form.phone.trim()) {
      newErrors.phone = 'Required'
    } else if (!/^\+?[\d\s-]{10,}$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSending(true)
    try {
      const { bookingRef, submittedDate } = createBookingMeta()

      const senderEmail = import.meta.env.VITE_SENDER_EMAIL || 'noreply@infinitemetriclogistics.co.uk'
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'Srujan.konda@infinitemetriclogistics.co.uk'
      
      const emailPayload = {
        sender: { name: 'Infinite Metric Website', email: senderEmail },
        to: [{ name: 'Admin', email: contactEmail }],
        subject: `New Booking Inquiry: ${bookingRef}`,
        htmlContent: `
            <div style="background-color: #fcfcfc; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #000000; padding: 40px;">
                <h1 style="font-size: 18px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px; text-transform: uppercase;">Infinite Metric Limited</h1>
                
                <p style="font-size: 14px; margin-bottom: 25px; line-height: 1.5;">A new booking enquiry has been submitted via the website. Please find the details below.</p>
                
                <div style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; padding: 20px 0; margin-bottom: 30px;">
                  <p style="margin: 0; font-size: 13px; font-weight: 700;">Booking Reference: ${bookingRef}</p>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Submitted: ${submittedDate}</p>
                </div>

                <div style="margin-bottom: 30px;">
                  <h3 style="font-size: 14px; text-transform: uppercase; font-weight: 900; margin-bottom: 15px; border-left: 3px solid #000000; padding-left: 10px;">1. Customer Details</h3>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Phone:</strong> ${form.phone}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${form.email}</p>
                </div>

                <div style="margin-bottom: 30px;">
                  <h3 style="font-size: 14px; text-transform: uppercase; font-weight: 900; margin-bottom: 15px; border-left: 3px solid #000000; padding-left: 10px;">2. Collection Details</h3>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Address:</strong> ${form.pickupAddress}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Postcode:</strong> ${form.pickupPostcode}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${form.pickupDate}</p>
                </div>

                <div style="margin-bottom: 30px;">
                  <h3 style="font-size: 14px; text-transform: uppercase; font-weight: 900; margin-bottom: 15px; border-left: 3px solid #000000; padding-left: 10px;">3. Delivery Details</h3>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Address:</strong> ${form.deliveryAddress}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Postcode:</strong> ${form.deliveryPostcode}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Distance:</strong> ${form.distanceMiles || 'N/A'} Miles</p>
                </div>

                <div style="margin-bottom: 30px;">
                  <h3 style="font-size: 14px; text-transform: uppercase; font-weight: 900; margin-bottom: 15px; border-left: 3px solid #000000; padding-left: 10px;">4. Shipment Information</h3>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Parcel Size:</strong> ${form.parcelSize}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Service Type:</strong> ${form.serviceType}</p>
                </div>

                <div style="margin-bottom: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                  <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 900; color: #666; margin-bottom: 10px;">Additional Notes</h3>
                  <p style="margin: 0; font-size: 14px; font-style: italic;">${form.message || 'N/A'}</p>
                </div>

                <div style="border-top: 1px solid #000000; padding-top: 20px; text-align: center;">
                  <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">End of Enquiry</p>
                </div>
              </div>
            </div>
          `,
      }

      let response
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      
      if (isLocalhost) {
        // Direct Brevo API call for local dev
        const apiKey = import.meta.env.VITE_BREVO_API_KEY
        response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        })
      } else {
        // Vercel serverless function for production
        response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload),
        })
      }

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 8000)
        setForm({ 
          pickupAddress: '', pickupPostcode: '', pickupDate: '', 
          deliveryAddress: '', deliveryPostcode: '', distanceMiles: '',
          parcelSize: '', serviceType: 'same-day', phone: '', email: '', message: '' 
        })
      } else {
        handleWhatsAppRedirect(bookingRef, submittedDate)
      }
    } catch {
      handleWhatsAppRedirect()
    } finally {
      setIsSending(false)
    }
  }

  const handleWhatsAppRedirect = (bookingRef, submittedDate) => {
    const meta = bookingRef && submittedDate ? { bookingRef, submittedDate } : createBookingMeta()
    const text = buildWhatsAppMessage(meta.bookingRef, meta.submittedDate)
    window.open(`https://wa.me/447896656811?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <section id="booking" className="section-padding bg-surface-light relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[24px] shadow-[0_12px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-border-subtle">
          <div className="p-4 sm:p-8 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-accent rounded-full" />
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-text-muted">Instant Delivery Quote</h2>
            </div>
          </div>

          <AnimatePresence>
            {submitted && (
              <MotionDiv
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mx-4 sm:mx-8 mb-6 sm:mb-8 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/60 text-center relative overflow-hidden shadow-lg"
              >
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <FiCheckCircle className="text-4xl" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-heading font-extrabold text-2xl tracking-tight mb-2">Quote Has Been Sent!</h3>
                    <p className="text-text-muted font-medium text-base max-w-md mx-auto leading-relaxed">Thank you for choosing <span className="text-accent font-bold">Infinite Metric Limited</span>. Our team will review your request and contact you shortly with a personalised quote.</p>
                  </div>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="p-4 sm:p-8 pt-0 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Column 1: Locations */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-black text-sm">1</div>
                  <h3 className="font-heading font-bold text-lg text-text-primary">Pickup & Delivery Locations</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="text"
                        placeholder="Pickup Street Address *"
                        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${errors.pickupAddress ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.pickupAddress}
                        onChange={(e) => handleChange('pickupAddress', e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="text"
                        placeholder="Pickup Postcode *"
                        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${errors.pickupPostcode ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.pickupPostcode}
                        onChange={(e) => handleChange('pickupPostcode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="text"
                        placeholder="Delivery Street Address *"
                        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${errors.deliveryAddress ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.deliveryAddress}
                        onChange={(e) => handleChange('deliveryAddress', e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="text"
                        placeholder="Delivery Postcode *"
                        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${errors.deliveryPostcode ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.deliveryPostcode}
                        onChange={(e) => handleChange('deliveryPostcode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10 pointer-events-none" />
                      {!form.pickupDate && (
                        <span className="absolute left-12 right-12 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium pointer-events-none z-10">
                          Pickup Date (Optional)
                        </span>
                      )}
                      <input
                        id="pickup-date"
                        type="date"
                        aria-label="Pickup date"
                        min={minPickupDate}
                        className={`booking-date-input w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${!form.pickupDate ? 'booking-date-input-empty' : ''} ${errors.pickupDate ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.pickupDate}
                        onChange={(e) => handleChange('pickupDate', e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <FiNavigation className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="text"
                        placeholder="Distance in Miles (Optional)"
                        className="w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none"
                        value={form.distanceMiles}
                        onChange={(e) => handleChange('distanceMiles', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Specifics */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-black text-sm">2</div>
                  <h3 className="font-heading font-bold text-lg text-text-primary">Parcel & Contact Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <FiPackage className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <select
                        className={`w-full h-12 pl-12 pr-6 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none appearance-none cursor-pointer ${errors.parcelSize ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.parcelSize}
                        onChange={(e) => handleChange('parcelSize', e.target.value)}
                      >
                        <option value="">Choose Parcel Size *</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="pallet">Pallet Size</option>
                      </select>
                    </div>
                    <div className="relative group">
                      <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <select
                        className={`w-full h-12 pl-12 pr-6 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none appearance-none cursor-pointer ${errors.serviceType ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.serviceType}
                        onChange={(e) => handleChange('serviceType', e.target.value)}
                      >
                        <option value="">Select Service Type *</option>
                        <option value="express">Same-Day Express</option>
                        <option value="standard">Standard Next-Day</option>
                        <option value="economy">Economy 48-Hour</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="tel"
                        placeholder="Contact Number *"
                        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${errors.phone ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg z-10" />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${errors.email ? 'border-red-500 bg-red-50/20' : ''}`}
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <FiMessageSquare className="absolute left-4 top-6 text-accent text-lg z-10" />
                    <textarea
                      placeholder="Additional notes or cargo info (Optional)"
                      className="w-full h-24 pl-12 pr-4 py-4 premium-input rounded-[10px] text-text-primary text-sm font-medium focus:border-accent transition-all outline-none resize-none"
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t border-border-subtle">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
                <span>+ FULLY INSURED</span>
                <span className="opacity-40">&middot;</span>
                <span>+ TRACKED LIVE</span>
                <span className="opacity-40">&middot;</span>
                <span>+ 24/7 SUPPORT</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-sheen w-full sm:flex-1 h-14 bg-accent text-white rounded-2xl font-bold uppercase tracking-[0.1em] text-sm glow-orange hover:scale-[1.02] active:scale-95 transition-all duration-400 flex items-center justify-center gap-3"
                >
                  {isSending ? 'SENDING...' : (
                    <>SEND QUOTE REQUEST <FiArrowRight className="text-lg" /></>
                  )}
                </button>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleWhatsAppRedirect()
                  }}
                  className="w-full sm:w-auto h-14 px-8 bg-accent text-white rounded-2xl font-bold uppercase tracking-[0.1em] text-sm hover:bg-black active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
                  style={{ color: '#FFFFFF' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WHATSAPP
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
