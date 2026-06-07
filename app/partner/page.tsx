'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const tiers = [
  {
    num: '01', icon: '🥉', name: 'GEM Authorized Reseller',
    fee: '₹5,000', commitment: '₹10 Lakhs/year', experience: 'No experience required',
    featured: false,
    criteria: {
      firmTypes: ['Proprietorship', 'LLP', 'Private Limited', 'Public Limited'],
      minExp: 0, minTurnover: 0, minTeam: 0
    },
    perks: ['Wholesale pricing', 'Product training', 'Marketing support', 'Technical assistance', 'Sales collateral']
  },
  {
    num: '02', icon: '🥈', name: 'Preferred Partner',
    fee: '₹1,50,000', commitment: '₹50 Lakhs/year', experience: '2+ years experience',
    featured: true,
    criteria: {
      firmTypes: ['LLP', 'Private Limited', 'Public Limited'],
      minExp: 2, minTurnover: 100, minTeam: 5
    },
    perks: ['Higher margins', 'Priority stock', 'Co-branded material', 'Dedicated manager', 'Quarterly review']
  },
  {
    num: '03', icon: '🥇', name: 'Strategic Partner',
    fee: '₹5,00,000', commitment: '₹2 Crore/year', experience: '5+ years experience',
    featured: false,
    criteria: {
      firmTypes: ['Private Limited', 'Public Limited'],
      minExp: 5, minTurnover: 500, minTeam: 10
    },
    perks: ['Best-in-class pricing', 'Custom products', 'Joint planning', 'Executive support', 'Exclusive territory']
  }
]

const benefits = [
  { icon: '💰', title: 'Attractive Margins', desc: 'Industry-leading margins with volume-based incentives.' },
  { icon: '📦', title: 'Ready Stock', desc: 'Bulk inventory at Noida warehouse for immediate dispatch.' },
  { icon: '🎓', title: 'Product Training', desc: 'Comprehensive training for your sales and support teams.' },
  { icon: '📢', title: 'Marketing Support', desc: 'Co-branded materials, digital assets and campaign support.' },
  { icon: '🛠️', title: 'Technical Backup', desc: 'Dedicated pre-sales and post-sales technical support.' },
  { icon: '📈', title: 'Business Growth', desc: 'Joint planning and regular reviews to accelerate growth.' },
]

const steps = [
  { num: '01', title: 'Submit Application', desc: 'Fill out the partner application with your business details.' },
  { num: '02', title: 'Verification', desc: 'Our team reviews and verifies your business credentials.' },
  { num: '03', title: 'Agreement', desc: 'Sign the partnership agreement and complete onboarding.' },
  { num: '04', title: 'Start Selling', desc: 'Get access to products, training and start growing.' },
]

type Step = 'tiers' | 'eligibility' | 'form' | 'success'

export default function PartnerPage() {
  const [step, setStep] = useState<Step>('tiers')
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [eligible, setEligible] = useState<boolean | null>(null)
  const [eligReason, setEligReason] = useState('')
  const [loading, setLoading] = useState(false)

  // Eligibility form
  const [elig, setElig] = useState({
    name: '', company: '', phone: '', email: '',
    firmType: '', expYears: '', turnover: '', teamSize: '', gst: '', bank: ''
  })

  // Application form
  const [appForm, setAppForm] = useState({
    designation: '', gst: '', city: '', territory: '', bio: ''
  })

  function checkEligibility() {
    const { name, company, phone, email, firmType, expYears, turnover, teamSize, gst, bank } = elig
    if (!name || !company || !phone || !email || !firmType || !expYears || !turnover || !teamSize || !gst || !bank) {
      alert('Please fill all fields'); return
    }

    const tier = tiers[selectedTier! - 1]
    const exp = parseInt(expYears)
    const turn = parseInt(turnover)
    const team = parseInt(teamSize)

    if (gst === 'No' || bank === 'No') {
      setEligible(false)
      setEligReason('GST registration and active bank account are mandatory for all tiers.')
      sendEmail(false, 'GST registration and active bank account are mandatory.')
      return
    }

    const reasons: string[] = []
    if (!tier.criteria.firmTypes.includes(firmType)) reasons.push(`Firm type must be ${tier.criteria.firmTypes.join(' / ')}`)
    if (exp < tier.criteria.minExp) reasons.push(`Minimum ${tier.criteria.minExp} years telecom experience required`)
    if (turn < tier.criteria.minTurnover) {
      const label = tier.criteria.minTurnover >= 100 ? `₹${tier.criteria.minTurnover >= 500 ? '5 Crore' : '1 Crore'}` : `₹${tier.criteria.minTurnover} Lakhs`
      reasons.push(`Minimum ${label} annual turnover required`)
    }
    if (team < tier.criteria.minTeam) reasons.push(`Minimum ${tier.criteria.minTeam} sales personnel required`)

    if (reasons.length > 0) {
      setEligible(false)
      setEligReason(reasons.join(' · '))
      sendEmail(false, reasons.join(', '))
    } else {
      setEligible(true)
      setEligReason(`You meet all eligibility criteria for ${tier.name}.`)
      sendEmail(true, 'Eligible')
    }
  }

  async function sendEmail(isEligible: boolean, reason: string) {
    try {
      await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: elig.name, company: elig.company,
          phone: elig.phone, email: elig.email,
          tier: selectedTier, tierName: tiers[selectedTier! - 1].name,
          eligible: isEligible,
          eligibilityData: { firmType: elig.firmType, expYears: elig.expYears, turnover: elig.turnover, teamSize: elig.teamSize, gst: elig.gst },
          formData: null
        })
      })
    } catch {}
  }

  async function submitApplication() {
    const { designation, gst, city, territory } = appForm
    if (!designation || !gst || !city || !territory) { alert('Please fill all required fields'); return }
    setLoading(true)
    try {
      await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: elig.name, company: elig.company,
          phone: elig.phone, email: elig.email,
          tier: selectedTier, tierName: tiers[selectedTier! - 1].name,
          eligible: true,
          eligibilityData: { firmType: elig.firmType, expYears: elig.expYears, turnover: elig.turnover, teamSize: elig.teamSize, gst: elig.gst },
          formData: appForm
        })
      })
      setStep('success')
    } catch { alert('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  const inputClass = "w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"
  const selectClass = "w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan/40 transition-colors"
  const labelClass = "block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5"

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* PAGE HERO */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fit=crop"
          alt="Partner" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.2) saturate(0.5) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2),rgba(2,11,24,0) 40%,rgba(2,11,24,1))'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-3">
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            Grow With Us
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">Channel <span className="text-cyan" style={{textShadow:'0 0 30px rgba(0,229,255,0.5)'}}>Partner Program</span></h1>
        </div>
      </div>

      {/* BENEFITS */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Why Partner With Us
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-10">Join India's Fastest Growing <span className="text-cyan">Network Brand</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {benefits.map(b => (
            <div key={b.title} className="bg-blue-mid/60 border border-cyan/08 rounded-lg p-5 hover:border-cyan/25 transition-colors">
              <div className="text-2xl mb-3">{b.icon}</div>
              <div className="font-orbitron text-xs font-bold mb-2">{b.title}</div>
              <p className="text-xs text-text-muted font-light leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.5)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Partnership Tiers
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-12">Choose Your <span className="text-cyan">Partnership Level</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tiers.map((t, i) => (
            <div key={t.num} className={`relative bg-blue-mid/60 border rounded-xl p-8 transition-all ${t.featured ? 'border-cyan/45 shadow-lg shadow-cyan/10' : 'border-cyan/12'}`}>
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-orbitron text-[10px] tracking-widest uppercase bg-cyan text-blue-deep px-4 py-1 rounded-full font-bold">Most Popular</div>
              )}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)'}}/>
              <div className="text-[10px] tracking-[0.28em] uppercase text-cyan font-orbitron mb-3">// Tier {t.num}</div>
              <div className="text-4xl mb-3">{t.icon}</div>
              <div className="font-orbitron text-base font-bold mb-1">{t.name}</div>
              <div className="text-xs text-cyan mb-1">Fee: {t.fee}</div>
              <div className="text-xs text-text-muted mb-4">{t.experience}</div>
              <div className="space-y-2 mb-6">
                {t.perks.map(p => (
                  <div key={p} className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="text-cyan font-bold">✓</span>{p}
                  </div>
                ))}
              </div>
              <button onClick={() => { setSelectedTier(i + 1); setEligible(null); setEligReason(''); setStep('eligibility') }}
                className={`w-full font-orbitron text-xs tracking-widest uppercase py-3 rounded-sm transition-all ${t.featured ? 'bg-cyan text-blue-deep font-bold border-2 border-cyan hover:bg-cyan-dim' : 'text-cyan border-2 hover:bg-cyan/07'}`}
                style={!t.featured ? {borderColor:'rgba(0,229,255,0.35)'} : {}}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ELIGIBILITY + APPLICATION MODAL */}
      {step !== 'tiers' && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4" style={{background:'rgba(2,11,24,0.95)',backdropFilter:'blur(8px)'}}>
          <div className="bg-blue-mid border border-cyan/15 rounded-xl w-full max-w-2xl p-8 relative my-4">
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{background:'linear-gradient(90deg,transparent,#00e5ff,transparent)'}}/>
            <button onClick={() => { setStep('tiers'); setEligible(null) }} className="absolute top-4 right-4 text-text-muted hover:text-cyan text-xl">✕</button>

            {step === 'eligibility' && (
              <>
                <div className="text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-1">Step 1 — Eligibility Check</div>
                <h3 className="font-orbitron text-lg font-bold mb-6">{tiers[selectedTier! - 1].name}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input value={elig.name} onChange={e => setElig({...elig, name: e.target.value})} placeholder="Your full name" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>Company Name *</label>
                    <input value={elig.company} onChange={e => setElig({...elig, company: e.target.value})} placeholder="Registered company name" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>Mobile Number *</label>
                    <input value={elig.phone} onChange={e => setElig({...elig, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>Email ID *</label>
                    <input value={elig.email} onChange={e => setElig({...elig, email: e.target.value})} placeholder="your@email.com" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>Firm Type *</label>
                    <select value={elig.firmType} onChange={e => setElig({...elig, firmType: e.target.value})} className={selectClass}>
                      <option value="">Select</option>
                      {['Proprietorship','LLP','Private Limited','Public Limited'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Telecom Experience *</label>
                    <select value={elig.expYears} onChange={e => setElig({...elig, expYears: e.target.value})} className={selectClass}>
                      <option value="">Select</option>
                      <option value="0">Less than 1 year</option>
                      <option value="1">1–2 years</option>
                      <option value="2">2–5 years</option>
                      <option value="5">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Annual Turnover *</label>
                    <select value={elig.turnover} onChange={e => setElig({...elig, turnover: e.target.value})} className={selectClass}>
                      <option value="">Select</option>
                      <option value="0">Less than ₹25 Lakhs</option>
                      <option value="25">₹25 Lakhs – ₹1 Crore</option>
                      <option value="100">₹1 Crore – ₹5 Crore</option>
                      <option value="500">₹5 Crore+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Team Size (Sales) *</label>
                    <select value={elig.teamSize} onChange={e => setElig({...elig, teamSize: e.target.value})} className={selectClass}>
                      <option value="">Select</option>
                      <option value="1">1–2 people</option>
                      <option value="3">3–5 people</option>
                      <option value="6">6–10 people</option>
                      <option value="11">10+ people</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>GST Registration *</label>
                    <select value={elig.gst} onChange={e => setElig({...elig, gst: e.target.value})} className={selectClass}>
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Business Bank Account *</label>
                    <select value={elig.bank} onChange={e => setElig({...elig, bank: e.target.value})} className={selectClass}>
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <button onClick={checkEligibility}
                  className="w-full font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-3 rounded font-bold hover:bg-cyan-dim transition-colors">
                  Check Eligibility →
                </button>

                {eligible !== null && (
                  <div className={`mt-5 p-5 rounded-lg border ${eligible ? 'border-green-500/30 bg-green-500/08' : 'border-red-500/30 bg-red-500/08'}`}>
                    <div className={`font-orbitron text-sm font-bold mb-2 ${eligible ? 'text-green-400' : 'text-red-400'}`}>
                      {eligible ? '✅ Eligible!' : '❌ Not Eligible'}
                    </div>
                    <p className="text-sm text-text-muted font-light">{eligReason}</p>
                    {eligible && (
                      <button onClick={() => setStep('form')}
                        className="mt-4 font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-6 py-2.5 rounded font-bold hover:bg-cyan-dim transition-colors">
                        Proceed to Application →
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {step === 'form' && (
              <>
                <div className="text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-1">Step 2 — Application Form</div>
                <h3 className="font-orbitron text-lg font-bold mb-6">{tiers[selectedTier! - 1].name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input value={elig.name} disabled className={`${inputClass} opacity-60`}/>
                  </div>
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input value={elig.company} disabled className={`${inputClass} opacity-60`}/>
                  </div>
                  <div>
                    <label className={labelClass}>Designation *</label>
                    <input value={appForm.designation} onChange={e => setAppForm({...appForm, designation: e.target.value})} placeholder="Owner / Director / Manager" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>GSTIN *</label>
                    <input value={appForm.gst} onChange={e => setAppForm({...appForm, gst: e.target.value})} placeholder="22AAAAA0000A1Z5" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>City / State *</label>
                    <input value={appForm.city} onChange={e => setAppForm({...appForm, city: e.target.value})} placeholder="Noida, Uttar Pradesh" className={inputClass}/>
                  </div>
                  <div>
                    <label className={labelClass}>Service Territory *</label>
                    <input value={appForm.territory} onChange={e => setAppForm({...appForm, territory: e.target.value})} placeholder="Delhi NCR, UP, Bihar..." className={inputClass}/>
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Business Background</label>
                    <textarea value={appForm.bio} onChange={e => setAppForm({...appForm, bio: e.target.value})}
                      placeholder="Tell us about your business and experience..." rows={3}
                      className={`${inputClass} resize-none leading-relaxed`}/>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep('eligibility')} className="font-orbitron text-xs tracking-widest uppercase text-cyan px-6 py-3 rounded border border-cyan/25 hover:bg-cyan/05 transition-colors">
                    Back
                  </button>
                  <button onClick={submitApplication} disabled={loading}
                    className="flex-1 font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-3 rounded font-bold hover:bg-cyan-dim transition-colors disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Application →'}
                  </button>
                </div>
              </>
            )}

            {step === 'success' && (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🎉</div>
                <div className="font-orbitron text-xl font-bold text-cyan mb-3">Application Submitted!</div>
                <p className="text-sm text-text-muted font-light leading-relaxed mb-6">
                  Our partnership team will contact you within <strong className="text-white">24–48 hours</strong>.
                  <br/><br/>For urgent queries:<br/>
                  <strong className="text-cyan">+91 81016 48585</strong>
                </p>
                <button onClick={() => setStep('tiers')} className="font-orbitron text-xs tracking-widest uppercase text-cyan border border-cyan/25 px-6 py-2.5 rounded hover:bg-cyan/05 transition-colors">
                  Back to Partner Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Process
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-12">How to <span className="text-cyan">Get Started</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] right-0 h-px" style={{background:'linear-gradient(90deg,rgba(0,229,255,0.3),transparent)'}}/>
              )}
              <div className="font-orbitron text-3xl font-black text-cyan/15 mb-4">{s.num}</div>
              <div className="font-orbitron text-sm font-bold mb-2">{s.title}</div>
              <p className="text-xs text-text-muted font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-16 py-20 text-center" style={{background:'linear-gradient(135deg,rgba(0,80,180,0.2),rgba(0,229,255,0.07))',borderTop:'1px solid rgba(0,229,255,0.15)'}}>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Ready to <span className="text-cyan">Partner With Us?</span></h2>
        <p className="text-text-muted font-light mb-8">Contact our partnership team today.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="tel:+918101648585" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
            📞 +91 81016 48585
          </a>
          <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase text-cyan px-7 py-3.5 rounded-sm font-semibold border-2 hover:bg-cyan/07 transition-all" style={{borderColor:'rgba(0,229,255,0.35)'}}>
            📩 Send Enquiry
          </Link>
        </div>
      </section>

      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}
