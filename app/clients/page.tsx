import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { supabase } from '@/lib/supabase'

async function getData() {
  const [{ data: clients }, { data: testimonials }] = await Promise.all([
    supabase.from('clients').select('*').eq('is_visible', true).order('order'),
    supabase.from('testimonials').select('*').eq('is_visible', true).order('order'),
  ])
  return { clients: clients || [], testimonials: testimonials || [] }
}

const divisions = [
  { tag: 'B2C', name: 'Consumer Division', desc: 'Retail customers, small businesses, home users, and local network installers.', clients: ['Local ISPs', 'Home Networks', 'SME Offices', 'CCTV Installers', 'WiFi Deployers'] },
  { tag: 'B2G', name: 'Government Division', desc: 'Central and state government bodies, railways, defence, and public sector undertakings.', clients: ['Indian Railways', 'BSNL', 'Smart Cities', 'Defence', 'State PSUs'] },
  { tag: 'OEM', name: 'Manufacturing Division', desc: 'Brands sourcing custom-manufactured or white-labelled products from our Noida facility.', clients: ['Network Brands', 'Telecom OEMs', 'Export Partners', 'Private Labels', 'Bulk Buyers'] },
  { tag: 'SI', name: 'System Integrator Division', desc: 'IT companies, EPC contractors, and consultants needing complete network supply.', clients: ['IT Integrators', 'EPC Companies', 'Network Consultants', 'Data Centers', 'Infra Companies'] },
  ]

export default async function ClientsPage() {
  const { clients, testimonials } = await getData()

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* PAGE HERO */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&fit=crop"
          alt="Clients" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.2) saturate(0.5) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2),rgba(2,11,24,0) 40%,rgba(2,11,24,1))'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-3">
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            Trusted Across India
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">Trusted By <span className="text-cyan" style={{textShadow:'0 0 30px rgba(0,229,255,0.5)'}}>🤝</span></h1>
        </div>
      </div>

      {/* STATS */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>At a Glance
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Trusted by <span className="text-cyan">1000+ Clients</span></h2>
        <p className="text-text-muted font-light mb-10 max-w-lg">From Indian Railways to Oil & Gas PSUs — our products power critical network infrastructure nationwide.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-cyan/10 rounded-lg overflow-hidden" style={{background:'rgba(7,26,53,0.4)'}}>
          {[{v:'1000+',l:'Happy Clients'},{v:'28+',l:'States Served'},{v:'50+',l:'Govt Projects'},{v:'200+',l:'Channel Partners'}].map((s,i) => (
            <div key={s.l} className={`p-7 ${i < 3 ? 'border-r border-cyan/10' : ''} hover:bg-cyan/04 transition-colors`}>
              <div className="font-orbitron text-2xl font-bold text-cyan mb-2" style={{textShadow:'0 0 18px rgba(0,229,255,0.4)'}}>{s.v}</div>
              <div className="text-xs tracking-widest uppercase text-text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT LOGOS */}
      {clients.length > 0 && (
        <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.5)'}}>
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
            <span className="w-7 h-px bg-cyan"/>Who We Work With
          </div>
          <h2 className="font-orbitron text-3xl font-bold mb-10">Our <span className="text-cyan">Trusted Clients</span></h2>
          <div className="flex flex-wrap gap-3">
            {clients.map(c => (
              <div key={c.id} className="px-5 py-3 border border-cyan/12 rounded bg-blue-mid/50 text-sm text-text-muted hover:border-cyan/35 hover:text-white transition-all">
                {c.name}
                {c.type && <span className="ml-2 text-[10px] text-cyan/60">{c.type}</span>}
              </div>
            ))}
            {/* Oil & Gas */}
            {['Indian Oil', 'GAIL', 'ONGC'].map(c => (
              <div key={c} className="px-5 py-3 border border-cyan/12 rounded bg-blue-mid/50 text-sm text-text-muted hover:border-cyan/35 hover:text-white transition-all">
                {c}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DIVISION WISE */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Division Wise
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-10">Clients by <span className="text-cyan">Business Division</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {divisions.map(d => (
            <div key={d.tag} className="bg-blue-mid/60 border border-cyan/10 rounded-lg p-7 hover:border-cyan/25 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 border border-cyan/22 rounded flex items-center justify-center bg-cyan/05">
                  <span className="font-orbitron text-xs font-bold text-cyan">{d.tag}</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold">{d.tag}</div>
                  <div className="text-[10px] tracking-widest uppercase text-cyan opacity-75">{d.name}</div>
                </div>
              </div>
              <p className="text-sm text-text-muted font-light leading-relaxed mb-4">{d.desc}</p>
              <div className="flex flex-wrap gap-2">
                {d.clients.map(c => (
                  <span key={c} className="text-xs px-3 py-1.5 border border-cyan/12 rounded text-text-muted hover:border-cyan/30 hover:text-white transition-all">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.6)'}}>
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
            <span className="w-7 h-px bg-cyan"/>What They Say
          </div>
          <h2 className="font-orbitron text-3xl font-bold mb-10">Client <span className="text-cyan">Testimonials</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.slice(0,6).map(t => (
              <div key={t.id} className="bg-blue-mid/60 border border-cyan/08 rounded-lg p-7 hover:border-cyan/25 transition-colors">
                <div className="text-3xl text-cyan opacity-25 font-orbitron mb-3">"</div>
                <p className="text-sm text-text-muted font-light leading-relaxed italic mb-5">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-cyan/08">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-orbitron text-xs font-bold text-cyan"
                    style={{background:'linear-gradient(135deg,rgba(0,80,180,0.5),rgba(0,229,255,0.2))',border:'1px solid rgba(0,229,255,0.2)'}}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-orbitron text-xs font-semibold">{t.name}</div>
                    <div className="text-[11px] text-text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-16 py-20 text-center" style={{background:'linear-gradient(135deg,rgba(0,80,180,0.2),rgba(0,229,255,0.07))',borderTop:'1px solid rgba(0,229,255,0.15)'}}>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Want to Work With <span className="text-cyan">Dron Edge?</span></h2>
        <p className="text-text-muted font-light mb-8">Talk to our team today — get a custom quote within 24 hours.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
            Send Enquiry
          </Link>
          <Link href="/partner" className="font-orbitron text-xs tracking-widest uppercase text-cyan px-7 py-3.5 rounded-sm font-semibold border-2 hover:bg-cyan/07 transition-all" style={{borderColor:'rgba(0,229,255,0.35)'}}>
            🤝 Become a Partner
          </Link>
        </div>
      </section>

      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}
