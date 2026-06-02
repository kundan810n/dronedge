import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import TestimonialBanner from '@/components/ui/TestimonialBanner'
import { supabase } from '@/lib/supabase'

async function getContent() {
  const { data } = await supabase.from('site_content').select('*').eq('section', 'home')
  const map: Record<string, string> = {}
  data?.forEach(row => { map[row.key] = row.value || '' })
  return map
}

async function getProducts() {
  const { data } = await supabase.from('products').select('*').eq('is_featured', true).eq('is_visible', true).limit(6)
  return data || []
}

async function getClients() {
  const { data } = await supabase.from('clients').select('*').eq('is_visible', true).order('order')
  return data || []
}

const divisions = [
  { num: '01', tag: 'B2C', name: 'Business to Consumer', desc: 'Network switches, fiber cables & connectivity products for homes, SMEs and retail customers.' },
 { num: '02', tag: 'B2G', name: 'Business to Government', desc: 'MTCTE & TTP Approved Network Switches, telecom infrastructure & enterprise networking for government projects, railways & PSUs.' },  { num: '03', tag: 'OEM', name: 'Original Equipment Mfr.', desc: 'Custom manufacturing, white-labelling & bulk supply for brands & system integrators.' },
  { num: '04', tag: 'SI', name: 'System Integrator', desc: 'End-to-end network design and deployment for EPC contractors & project partners.' },
]

const whyUs = [
  { icon: '🛡️', title: ''MTCTE & TTP Approved Network Switches', desc: 'MTCTE & TTP Approved Network Switches, telecom infrastructure & enterprise networking for government projects, railways & PSUs.' },
  { icon: '🏭', title: 'In-House Manufacturing', desc: 'Full manufacturing facility in Noida. Direct factory pricing with complete quality control.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Bulk stock ready at our Noida warehouse. Pan India delivery within 2–5 working days.' },
  { icon: '📅', title: '11+ Years Experience', desc: 'Since 2014, serving telecom, government and enterprise sectors with consistent quality.' },
  { icon: '🏷️', title: 'OEM & White Label', desc: 'Custom branding, packaging and bulk manufacturing for distributors and international clients.' },
  { icon: '📞', title: 'Dedicated Support', desc: 'Pre-sales technical consultation, after-sales warranty support and on-site assistance.' },
]

export default async function HomePage() {
  const content = await getContent()
  const products = await getProducts()
  const clients = await getClients()

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* HERO */}
      <div className="relative h-[92vh] min-h-[580px] overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80&fit=crop"
          alt="Data Center" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.28) saturate(0.6) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2) 0%,rgba(2,11,24,0.05) 50%,rgba(2,11,24,1) 100%)'}}/>
        <div className="absolute inset-0" style={{backgroundImage:'linear-gradient(rgba(0,229,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.05) 1px,transparent 1px)',backgroundSize:'52px 52px'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-6">
            <span className="w-9 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            Manufacturer & Exporter · Est. 2014 · Noida
            <span className="w-9 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black uppercase leading-none mb-3 text-white" style={{fontSize:'clamp(2.6rem,6vw,5.5rem)'}}>
            {content.hero_title?.split(' ').slice(0,2).join(' ') || 'Network'}
          </h1>
          <h1 className="font-orbitron font-black uppercase leading-none mb-5" style={{fontSize:'clamp(2.6rem,6vw,5.5rem)',color:'#00e5ff',textShadow:'0 0 40px rgba(0,229,255,0.6)'}}>
            {content.hero_title?.split(' ').slice(2).join(' ') || 'Infrastructure'}
          </h1>
          <p className="text-text-muted font-light max-w-xl mx-auto leading-7 mb-8" style={{fontSize:'clamp(0.9rem,1.7vw,1.05rem)'}}>
            {content.hero_subtitle || 'Optical Fiber Cables, Network Switches & Telecom Equipment — engineered for scale.'}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/products" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
              Explore Products
            </Link>
            <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase text-cyan px-7 py-3.5 rounded-sm font-semibold transition-all border-2 hover:bg-cyan/07" style={{borderColor:'rgba(0,229,255,0.35)'}}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* DIVISIONS */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.5)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Our Divisions
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-2">Four Specialized <span className="text-cyan">Business Verticals</span></h2>
        <p className="text-text-muted font-light mb-12 max-w-lg">From retail consumers to government contracts — we serve every segment with dedicated expertise.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisions.map(d => (
            <Link key={d.tag} href="/contact"
              className="group relative bg-blue-mid/70 border border-cyan/12 rounded-md p-7 hover:border-cyan/45 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent scale-x-0 group-hover:scale-x-100 transition-transform"/>
              <div className="font-orbitron text-[10px] tracking-[0.28em] text-cyan/35 mb-4">// {d.num}</div>
              <div className="font-orbitron text-xl font-bold mb-1">{d.tag}</div>
              <div className="text-[10px] tracking-widest uppercase text-cyan opacity-80 mb-3">{d.name}</div>
              <div className="text-sm text-text-muted font-light leading-relaxed">{d.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {products.length > 0 && (
        <section className="px-16 py-20">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
            <span className="w-7 h-px bg-cyan"/>Featured Products
          </div>
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-orbitron text-3xl font-bold">Our Core <span className="text-cyan">Product Range</span></h2>
            <Link href="/products" className="font-orbitron text-xs tracking-widest uppercase text-cyan border border-cyan/25 px-5 py-2 rounded hover:bg-cyan/06 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => (
              <Link key={p.id} href={`/products/${p.slug}`}
                className="group bg-blue-mid/60 border border-cyan/08 rounded-lg overflow-hidden hover:border-cyan/35 hover:-translate-y-1 transition-all">
                <div className="h-44 overflow-hidden bg-blue-deep/80">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      style={{filter:'brightness(0.55) saturate(0.6) hue-rotate(185deg)'}}/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted/20 font-orbitron text-xs tracking-widest">NO IMAGE</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-cyan mb-2 opacity-75">{p.sub_category || p.category}</div>
                  <div className="font-orbitron text-sm font-semibold mb-2">{p.name}</div>
                  <p className="text-xs text-text-muted font-light leading-relaxed line-clamp-2">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* WHY US */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.5)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Why Dron Edge
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-12">Trusted by 1000+ <span className="text-cyan">Clients Across India</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map(w => (
            <div key={w.title} className="bg-blue-mid/50 border border-cyan/08 rounded-lg p-7 hover:border-cyan/25 transition-colors">
              <div className="text-2xl mb-4">{w.icon}</div>
              <div className="font-orbitron text-sm font-semibold mb-3">{w.title}</div>
              <p className="text-sm text-text-muted font-light leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      {clients.length > 0 && (
        <section className="px-16 py-20">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
            <span className="w-7 h-px bg-cyan"/>Our Clients
          </div>
          <h2 className="font-orbitron text-3xl font-bold mb-12">Trusted By <span className="text-cyan">Industry Leaders</span></h2>
          <div className="flex flex-wrap gap-3">
            {clients.map(c => (
              <div key={c.id} className="px-5 py-3 border border-cyan/12 rounded bg-blue-mid/40 text-sm text-text-muted hover:border-cyan/35 hover:text-white transition-all">
                {c.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STATS — 11+, no turnover */}
      <section className="px-16 py-20">
        <div className="grid grid-cols-3 border border-cyan/10 rounded-lg overflow-hidden" style={{background:'rgba(7,26,53,0.5)'}}>
          {[
            { val: content.stat_years || '11+', lbl: 'Years in Business' },
            { val: content.stat_products || '500+', lbl: 'Products' },
            { val: content.stat_clients || '1000+', lbl: 'Happy Clients' },
          ].map((s, i) => (
            <div key={s.lbl} className={`p-8 ${i < 2 ? 'border-r border-cyan/10' : ''} hover:bg-cyan/04 transition-colors`}>
              <div className="font-orbitron text-2xl font-bold text-cyan mb-2" style={{textShadow:'0 0 20px rgba(0,229,255,0.4)'}}>{s.val}</div>
              <div className="text-xs tracking-widest uppercase text-text-muted">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-16 py-20 text-center" style={{background:'linear-gradient(135deg,rgba(0,80,180,0.2),rgba(0,229,255,0.07))',borderTop:'1px solid rgba(0,229,255,0.15)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center justify-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Get In Touch
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Ready to Build Your <span className="text-cyan">Network?</span></h2>
        <p className="text-text-muted font-light mb-8">Talk to our experts — get a custom quote within 24 hours.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
            Send Enquiry
          </Link>
          <a href="tel:+917942631533" className="font-orbitron text-xs tracking-widest uppercase text-cyan px-7 py-3.5 rounded-sm font-semibold transition-all border-2 hover:bg-cyan/07" style={{borderColor:'rgba(0,229,255,0.35)'}}>
            📞 Call Us Now
          </a>
        </div>
      </section>

      <TestimonialBanner/>
      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}
