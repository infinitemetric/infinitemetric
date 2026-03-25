import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiPackage, FiTruck, FiPhone, FiArrowRight, FiMail, FiMessageSquare, FiCalendar, FiNavigation } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi'

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

  const validate = () => {
    const newErrors = {}
    if (!form.pickupAddress.trim()) newErrors.pickupAddress = 'Required'
    if (!form.pickupPostcode.trim()) newErrors.pickupPostcode = 'Required'
    if (!form.deliveryAddress.trim()) newErrors.deliveryAddress = 'Required'
    if (!form.deliveryPostcode.trim()) newErrors.deliveryPostcode = 'Required'
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
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Infinite Metric Website' },
          to: [{ name: 'Admin' }],
          subject: 'New Booking Inquiry',
          htmlContent: `
            <div style="background-color: #f8fafc; padding: 50px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #0A0F2C; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Infinite Metric Dispatch</h1>
                </div>
                <div style="padding: 40px;">
                  <h2 style="color: #1e293b; margin-top: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.02em;">New Booking Inquiry</h2>
                  <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin-bottom: 30px;">A new delivery mission has been requested via the digital terminal. Details are archived below.</p>
                  
                  <div style="background-color: #f1f5f9; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h3 style="color: #2563eb; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 15px;">1. Pickup Information</h3>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Address:</strong> ${form.pickupAddress}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Postcode:</strong> ${form.pickupPostcode}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Date:</strong> ${form.pickupDate}</p>
                    
                    <h3 style="color: #2563eb; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 25px; margin-bottom: 15px;">2. Delivery Information</h3>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Address:</strong> ${form.deliveryAddress}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Postcode:</strong> ${form.deliveryPostcode}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Distance:</strong> ${form.distanceMiles || 'N/A'} Miles</p>
                    
                    <h3 style="color: #2563eb; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 25px; margin-bottom: 15px;">3. Logistics & Contact</h3>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Type:</strong> ${form.parcelSize} / ${form.serviceType}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Phone:</strong> ${form.phone}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #334155;"><strong>Email:</strong> ${form.email}</p>
                  </div>

                  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                    <p style="color: #64748b; font-size: 12px; font-style: italic;"><strong>Additional Message:</strong> ${form.message || 'No additional instructions provided.'}</p>
                  </div>
                </div>
                <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Infinite Metric Limited - Official Dispatch Protocol</p>
                </div>
              </div>
            </div>
          `,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 8000)
        setForm({ 
          pickupAddress: '', pickupPostcode: '', pickupDate: '', 
          deliveryAddress: '', deliveryPostcode: '', distanceMiles: '',
          parcelSize: '', serviceType: 'same-day', phone: '', email: '', message: '' 
        })
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
    const text = `New Booking Request:%0A- Pickup: ${form.pickupAddress}, ${form.pickupPostcode}%0A- Date: ${form.pickupDate}%0A- Delivery: ${form.deliveryAddress}, ${form.deliveryPostcode}%0A- Size: ${form.parcelSize}`
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
          <div className="absolute -inset-[2px] bg-gradient-to-r from-royal via-electric to-orange-500 rounded-[32px] blur sm:opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative glass shadow-2xl rounded-[28px] p-1">
            <div className="bg-white/90 backdrop-blur-2xl rounded-[26px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="text-left">
                  <span className="text-royal font-black text-[9px] uppercase tracking-[0.3em] mb-2 block">Enterprise Dispatch Manager</span>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tighter">
                    Secure a{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-electric to-blue-600">
                      Quote
                    </span>
                  </h2>
                </div>
                <p className="text-slate-400 text-[10px] max-w-[200px] md:text-right font-bold uppercase tracking-widest leading-loose">
                  Real-time logistical calculating for UK-Wide delivery.
                </p>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mb-8 p-8 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/5"
                >
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
                      <HiCheckCircle className="text-3xl" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-black text-xl uppercase tracking-tighter">Transmission Successful</h3>
                      <p className="text-slate-500 font-bold text-sm">Infinite Metric Limited will get back to you</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12 relative">
                
                {/* 1. Pickup Section */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-royal/10 flex items-center justify-center text-royal font-black text-xs">1</div>
                    <span className="text-slate-900 font-black text-xs uppercase tracking-widest">Pickup Dispatch</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-5">
                    <div className="md:col-span-6 relative space-y-2">
                      <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Address Line 1</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-royal opacity-40" />
                        <input
                          type="text"
                          placeholder="House No / Street Name"
                          value={form.pickupAddress}
                          onChange={(e) => handleChange('pickupAddress', e.target.value)}
                          className={`w-full h-11 sm:h-14 pl-12 pr-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none ${errors.pickupAddress ? 'border-red-500' : ''}`}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3 relative space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Post Code</label>
                      <input
                        type="text"
                        placeholder="W1 1AA"
                        value={form.pickupPostcode}
                        onChange={(e) => handleChange('pickupPostcode', e.target.value)}
                        className={`w-full h-11 sm:h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none ${errors.pickupPostcode ? 'border-red-500' : ''}`}
                      />
                    </div>
                    <div className="md:col-span-3 relative space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Pickup Date</label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-royal opacity-40" />
                        <input
                          type="date"
                          value={form.pickupDate}
                          onChange={(e) => handleChange('pickupDate', e.target.value)}
                          className="w-full h-11 sm:h-14 pl-12 pr-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Section */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-royal/10 flex items-center justify-center text-royal font-black text-xs">2</div>
                    <span className="text-slate-900 font-black text-xs uppercase tracking-widest">Delivery Terminal</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-5">
                    <div className="md:col-span-6 relative space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Address Line 1</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-electric opacity-40" />
                        <input
                          type="text"
                          placeholder="Destination Address"
                          value={form.deliveryAddress}
                          onChange={(e) => handleChange('deliveryAddress', e.target.value)}
                          className={`w-full h-11 sm:h-14 pl-12 pr-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none ${errors.deliveryAddress ? 'border-red-500' : ''}`}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3 relative space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Post Code</label>
                      <input
                        type="text"
                        placeholder="M1 1AA"
                        value={form.deliveryPostcode}
                        onChange={(e) => handleChange('deliveryPostcode', e.target.value)}
                        className={`w-full h-11 sm:h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none ${errors.deliveryPostcode ? 'border-red-500' : ''}`}
                      />
                    </div>
                    <div className="md:col-span-3 relative space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Est. Miles</label>
                      <div className="relative">
                        <FiNavigation className="absolute left-4 top-1/2 -translate-y-1/2 text-electric opacity-40" />
                        <input
                          type="number"
                          placeholder="Miles"
                          value={form.distanceMiles}
                          onChange={(e) => handleChange('distanceMiles', e.target.value)}
                          className="w-full h-11 sm:h-14 pl-12 pr-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Package & Contact */}
                <div className="pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Parcel Size</label>
                    <div className="relative">
                      <FiPackage className="absolute left-4 top-1/2 -translate-y-1/2 text-royal" />
                      <select
                        value={form.parcelSize}
                        onChange={(e) => handleChange('parcelSize', e.target.value)}
                        className={`w-full h-11 sm:h-14 pl-12 pr-5 bg-white border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none appearance-none cursor-pointer ${errors.parcelSize ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Size</option>
                        <option value="small">Small (&lt;5kg)</option>
                        <option value="medium">Medium (5-20kg)</option>
                        <option value="large">Large (20-50kg)</option>
                        <option value="pallet">Pallet Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Service Level</label>
                    <div className="relative">
                      <FiTruck className="absolute left-4 top-1/2 -translate-y-1/2 text-electric" />
                      <select
                        value={form.serviceType}
                        onChange={(e) => handleChange('serviceType', e.target.value)}
                        className="w-full h-11 sm:h-14 pl-12 pr-5 bg-white border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="same-day">Same Day Express</option>
                        <option value="next-day">Standard Next Day</option>
                        <option value="international">Worldwide Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-royal opacity-40" />
                      <input
                        type="tel"
                        placeholder="+44 7XXX XXXXXX"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`w-full h-11 sm:h-14 pl-12 pr-5 bg-white border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Business Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-royal opacity-40" />
                      <input
                        type="email"
                        placeholder="client@company.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full h-11 sm:h-14 pl-12 pr-5 bg-white border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="w-full lg:flex-1 relative group">
                    <FiMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      placeholder="Special instructions or cargo details..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full h-11 sm:h-14 pl-12 pr-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold focus:border-royal transition-all outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full lg:w-max h-12 lg:h-14 px-10 bg-orange-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                  >
                    {isSending ? 'PROCESSING...' : <>GET QUOTE NOW <FiArrowRight /></>}
                  </button>
                </div>

              </form>

              {/* Trust Footer */}
              <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40">
                {['FULLY INSURED', 'TRACKED LIVE', '24/7 SUPPORT', 'DATA SECURE'].map(trust => (
                  <div key={trust} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-royal" />
                    <span className="text-slate-900 font-black text-[9px] tracking-widest">{trust}</span>
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
