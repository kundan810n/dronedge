import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const partnerTiers = [
  {
    tier: '01', icon: '🥉', name: 'Authorized Reseller',
    desc: 'For small distributors and retailers looking to start their journey with Dron Edge.',
    perks: ['Wholesale pricing', 'Product training', 'Marketing support', 'Technical assistance', 'Sales collateral'],
    cta: 'Apply Now'
  },
  {
    tier: '02', icon: '🥈', name: 'Preferred Partner',
    desc: 'For established distributors with proven track record and strong market presence.',
    perks: ['Higher margins', 'Priority stock allocation', 'Co-branded material', 'Dedicated account manager', 'Quarterly business review'],
    cta: 'Apply Now',
    featured: true
  },
  {
    tier: '03', icon: '🥇', name: 'Strategic Partner',
    desc: 'For large enterprises and national distributors with significant business volumes.',
    perks: ['Best-in-class pricing', 'Custom product development', 'Joint business planning', 'Executive support', 'Exclusive territory rights'],
    cta: 'Contact Us'
  },
]

const benefits = [
  { icon: '💰', title: 'Attractive Margins', desc: 'Industry-leading margins with volume-based incentives and quarterly bonuses.' },
  { icon: '📦', title: 'Ready Stock', desc: 'Bulk inventory maintained at our Noida warehouse for immediate dispatch.' },
  { icon: '🎓', title: 'Product Training', desc: 'Comprehensive technical training for your sales and support teams.' },
  { icon: '📢', title: 'Marketing Support', desc: 'Co-branded marketing materials, digital assets and campaign support.' },
  { icon: '🛠️', title: 'Technical Backup', desc: 'Dedicated technical support team for pre-sales and post-sales assistance.' },
  { icon: '📈', title: 'Business Growth', desc: 'Joint business planning and regular reviews to accelerate your growth.' },
]

const steps = [
  { num: '01', title: 'Submit Application', desc: 'Fill out our partner application form with your business details.' },
  { num: '02', title: 'Verification', desc: 'Our team reviews your application and verifies business credentials.' },
  { num: '03', title: 'Agreement', desc: 'Sign the partnership agreement and complete onboarding formalities.' },
  { num: '04', title: 'Start Selling', desc: 'Get access to products, pricing, training and start growing your business.' },
]

export default function PartnerPage() {
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

      {/* INTRO */}
      <section className="px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
              <span className="w-7 h-px bg-cyan"/>Why Partner With Us
            </div>
            <h2 className="font-orbitron text-3xl font-bold mb-6">Join India's Fastest Growing <span className="text-cyan">Network Brand</span></h2>
            <p className="text-sm text-text-muted font-light leading-relaxed mb-4">
              Dron Edge is India's trusted manufacturer and exporter of optical fiber cables, network switches and telecom equipment. With 11+ years of experience and 1000+ satisfied clients, we offer our partners an unmatched opportunity to grow their business.
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed mb-8">
              Our partner program is designed to provide maximum value — from industry-leading margins to dedicated technical support — ensuring your success is our success.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{v:'200+',l:'Active Partners'},{v:'28+',l:'States'},{v:`${new Date().getFullYear() - 2015}+`,l:'Years'}].map((s,i) => (
                <div key={s.l} className="bg-blue-mid/60 border border-cyan/12 rounded-lg p-4 text-center">
                  <div className="font-orbitron text-xl font-bold text-cyan mb-1" style={{textShadow:'0 0 15px rgba(0,229,255,0.4)'}}>{s.v}</div>
                  <div className="text-[10px] tracking-widest uppercase text-text-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {benefits.map(b => (
              <div key={b.title} className="bg-blue-mid/60 border border-cyan/08 rounded-lg p-5 hover:border-cyan/25 transition-colors">
                <div className="text-2xl mb-3">{b.icon}</div>
                <div className="font-orbitron text-xs font-bold mb-2">{b.title}</div>
                <p className="text-xs text-text-muted font-light leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TIERS */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.5)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Partnership Tiers
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Choose Your <span className="text-cyan">Partnership Level</span></h2>
        <p className="text-text-muted font-light mb-12 max-w-lg">Three tiers designed to match your business size and growth ambitions.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerTiers.map(p => (
            <div key={p.tier} className={`relative bg-blue-mid/60 border rounded-xl p-8 hover:-translate-y-2 transition-all ${p.featured ? 'border-cyan/45 shadow-lg shadow-cyan/10' : 'border-cyan/12'}`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-orbitron text-[10px] tracking-widest uppercase bg-cyan text-blue-deep px-4 py-1 rounded-full font-bold">
                  Most Popular
                </div>
              )}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)'}}/>
              <div className="text-[10px] tracking-[0.28em] uppercase text-cyan font-orbitron mb-4">// Tier {p.tier}</div>
              <div className="text-4xl mb-3">{p.icon}</div>
              <div className="font-orbitron text-lg font-bold mb-2">{p.name}</div>
              <p className="text-xs text-text-muted font-light mb-6 leading-relaxed">{p.desc}</p>
              <div className="space-y-2.5 mb-8">
                {p.perks.map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="text-cyan font-bold flex-shrink-0">✓</span>{perk}
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className={`block text-center font-orbitron text-xs tracking-widest uppercase py-3 rounded-sm transition-all ${
                  p.featured
                    ? 'bg-cyan text-blue-deep font-bold hover:bg-cyan-dim border-2 border-cyan'
                    : 'text-cyan border-2 hover:bg-cyan/07'
                }`}
                style={!p.featured ? {borderColor:'rgba(0,229,255,0.35)'} : {}}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

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
        <p className="text-text-muted font-light mb-8">Contact our partnership team today — we will get back within 24 hours.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
            Apply Now
          </Link>
          <a href="tel:+918101648585" className="font-orbitron text-xs tracking-widest uppercase text-cyan px-7 py-3.5 rounded-sm font-semibold border-2 hover:bg-cyan/07 transition-all" style={{borderColor:'rgba(0,229,255,0.35)'}}>
            📞 +91 81016 48585
          </a>
        </div>
      </section>

      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}
