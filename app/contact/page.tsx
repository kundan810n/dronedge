'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', division:'', product:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* PAGE HERO */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80&fit=crop"
          alt="Contact" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.18) saturate(0.5) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2),rgba(2,11,24,0) 40%,rgba(2,11,24,1))'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-3">
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            We're Here to Help
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">Get In <span className="text-cyan" style={{textShadow:'0 0 30px rgba(0,229,255,0.5)'}}>Touch</span></h1>
        </div>
      </div>

      {/* MAIN */}
      <section className="px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* INFO */}
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
              <span className="w-7 h-px bg-cyan"/>Contact Details
            </div>
            <h2 className="font-orbitron text-2xl font-bold mb-2">Let's Start a <span className="text-cyan">Conversation</span></h2>
            <p className="text-sm text-text-muted font-light leading-relaxed mb-8">Whether you need a product quote, technical support, or partnership inquiry — our team responds within 24 hours.</p>

            <div className="space-y-4 mb-8">
              {[
                { icon: '📍', label: 'Office Address', val: 'A-93, Sector 65, Noida', sub: 'Gautam Buddha Nagar, Uttar Pradesh — 201301' },
                { icon: '📞', label: 'Phone / WhatsApp', val: '+91 8101648585', sub: 'Mon–Sat, 9:00 AM – 6:30 PM IST' },
                { icon: '📧', label: 'Email', val: 'info@dronedge.in', sub: 'Response within 24 business hours' },
                { icon: '🕐', label: 'Business Hours', val: 'Monday – Saturday', sub: '9:00 AM – 6:30 PM IST · Sunday Closed' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 bg-blue-mid/60 border border-cyan/10 rounded-lg p-5 hover:border-cyan/28 hover:translate-x-1 transition-all">
                  <div className="text-xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-white mb-0.5">{item.val}</div>
                    <div className="text-xs text-text-muted font-light">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:+918101648585" className="flex items-center justify-center gap-2 border border-cyan/20 rounded-lg py-3 text-xs text-text-muted hover:border-cyan/40 hover:text-cyan transition-all font-orbitron tracking-wider">
                📞 Call Now
              </a>
              <a href="https://wa.me/918101648585" target="_blank" className="flex items-center justify-center gap-2 border border-cyan/20 rounded-lg py-3 text-xs text-text-muted hover:border-cyan/40 hover:text-cyan transition-all font-orbitron tracking-wider">
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* FORM */}
          <div className="relative bg-blue-mid/60 border border-cyan/12 rounded-lg p-9 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:'linear-gradient(90deg,transparent,#00e5ff,transparent)'}}/>

            {success ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <div className="font-orbitron text-lg font-bold text-cyan mb-3">Enquiry Sent!</div>
                <p className="text-sm text-text-muted leading-relaxed">Our team will respond within <strong className="text-white">24 business hours</strong>.<br/><br/>For urgent requirements:<br/><strong className="text-cyan">+91 8101648585</strong></p>
              </div>
            ) : (
              <>
                <h3 className="font-orbitron text-base font-bold mb-2">Send Us an Enquiry</h3>
                <p className="text-sm text-text-muted font-light mb-7">Fill in the details and our team will get back to you with a quote.</p>

                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key:'name', label:'Full Name *', placeholder:'Your name', type:'text', required:true },
                      { key:'company', label:'Company', placeholder:'Company name', type:'text', required:false },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">{f.label}</label>
                        <input type={f.type} required={f.required} placeholder={f.placeholder}
                          value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                          className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Email *</label>
                      <input type="email" required placeholder="your@email.com"
                        value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Mobile *</label>
                      <input type="tel" required placeholder="+91 XXXXX XXXXX"
                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Division *</label>
                      <select required value={form.division} onChange={e => setForm({...form, division: e.target.value})}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan/40 transition-colors">
                        <option value="">Select</option>
                        <option>B2C — Consumer</option>
                        <option>B2G — Government</option>
                        <option>OEM — Manufacturing</option>
                        <option>SI — System Integrator</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Product</label>
                      <select value={form.product} onChange={e => setForm({...form, product: e.target.value})}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan/40 transition-colors">
                        <option value="">Select</option>
                        <option>Network Switches</option>
                        <option>Optical Fiber Cable</option>
                        <option>ONT / OLT Devices</option>
                        <option>OFC Joint Closures</option>
                        <option>Splicing Machines</option>
                        <option>LIU / FMS Panels</option>
                        <option>Other / General</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Message *</label>
                    <textarea required placeholder="Describe your requirement..." rows={4}
                      value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors resize-none leading-relaxed"/>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-3.5 rounded font-bold hover:bg-cyan-dim transition-colors disabled:opacity-50 mt-2">
                    {loading ? 'Sending...' : 'Send Enquiry →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <div className="h-96 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-14 z-10" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.8),transparent)'}}/>
        <div className="absolute bottom-0 left-0 right-0 h-14 z-10" style={{background:'linear-gradient(to top,rgba(2,11,24,0.8),transparent)'}}/>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.9!2d77.3895!3d28.5713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector+65%2C+Noida!5e0!3m2!1sen!2sin!4v1620000000000"
          className="w-full h-full border-0"
          style={{filter:'invert(0.9) hue-rotate(180deg) saturate(0.5) brightness(0.7)'}}
          allowFullScreen loading="lazy"/>
      </div>

      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}
