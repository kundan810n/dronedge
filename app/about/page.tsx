import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { supabase } from '@/lib/supabase'

async function getData() {
  const [{ data: content }, { data: team }, { data: certs }] = await Promise.all([
    supabase.from('site_content').select('*').eq('section', 'about'),
    supabase.from('team_members').select('*').eq('is_visible', true).order('order'),
    supabase.from('certifications').select('*').eq('is_visible', true).order('order'),
  ])
  const map: Record<string, string> = {}
  content?.forEach(row => { map[row.key] = row.value || '' })
  return { content: map, team: team || [], certs: certs || [] }
}

const timeline = [
  { year: '2015', title: 'Company Founded', desc: 'Dron Edge India Private Limited incorporated in Noida. Started as a trader and distributor of optical fiber cables.' },
  { year: '2017', title: 'Manufacturing Unit', desc: 'Set up in-house manufacturing facility. Began producing OFC joint closures and LIU systems.' },
  { year: '2019', title: 'National Compliance', desc: 'Achieved critical national compliance certifications — opening doors to government tenders, PSU projects and large enterprise deployments pan India.' },
  { year: '2021', title: 'OEM & Export', desc: 'Expanded into OEM manufacturing and white-labelling. Export operations initiated.' },
  { year: '2023', title: 'Network Switch Line', desc: 'Launched dedicated network switch product line under the Dron Edge brand.' },
  { year: '2025', title: 'Four Divisions', desc: 'Formalized B2C, B2G, OEM and SI divisions to serve each market with specialized expertise.' },
]

const values = [
  { num: '01', title: 'Quality First', desc: 'Every product meets stringent quality checks before leaving our facility.' },
  { num: '02', title: 'Customer Focus', desc: 'We build long-term relationships — not just transactions.' },
  { num: '03', title: 'Innovation', desc: 'Continuously expanding our product range with new technologies.' },
  { num: '04', title: 'Integrity', desc: 'Transparent pricing, honest timelines and no hidden costs.' },
  { num: '05', title: 'Reliability', desc: 'Bulk stock maintained for immediate dispatch pan-India.' },
  { num: '06', title: 'National Pride', desc: 'Proudly Made in India — supporting Atmanirbhar Bharat.' },
]

export default async function AboutPage() {
  const { content, team, certs } = await getData()

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* PAGE HERO */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1565689476967-a6bf2afbc6c6?w=1600&q=80&fit=crop"
          alt="About" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.2) saturate(0.5) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2),rgba(2,11,24,0) 40%,rgba(2,11,24,1))'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-3">
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            Our Story
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">About <span className="text-cyan" style={{textShadow:'0 0 30px rgba(0,229,255,0.5)'}}>Dron Edge</span></h1>
        </div>
      </div>

      {/* STORY */}
      <section className="px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
              <span className="w-7 h-px bg-cyan"/>Who We Are
            </div>
            <h2 className="font-orbitron text-3xl font-bold mb-6">A Decade of Building <span className="text-cyan">India's Networks</span></h2>
            <div className="space-y-4 text-sm text-text-muted font-light leading-relaxed">
              <p>Founded in 2015 in Noida, Uttar Pradesh, Dron Edge India Private Limited has emerged as one of India's leading manufacturers and exporters of networking infrastructure products. With over a decade of industry experience, we have built a reputation for delivering world-class quality, technical excellence, and unmatched reliability.</p>
              <p>Our journey began with a singular vision — <strong className="text-white font-medium">to make enterprise-grade networking products accessible across every segment of India.</strong> Today, Dron Edge products power mission-critical government projects, large-scale telecom networks, enterprise infrastructure deployments, and broadband connectivity for millions of homes nationwide.</p>
              <p>Our MTCTE-approved product range meets the most stringent quality benchmarks set by the Government of India — making us a preferred and trusted partner for critical national infrastructure, smart city deployments, and large-scale telecom rollouts across the country.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&fit=crop"
              alt="Manufacturing" className="w-full h-96 object-cover rounded-lg"
              style={{filter:'brightness(0.5) saturate(0.6) hue-rotate(185deg)',border:'1px solid rgba(0,229,255,0.15)'}}/>
            <div className="absolute bottom-5 left-5 right-5 rounded-lg p-4 flex items-center gap-4" style={{background:'rgba(2,11,24,0.92)',border:'1px solid rgba(0,229,255,0.2)'}}>
              {[{v:'2015',l:'Founded'},{v:'₹25Cr+',l:'Turnover'},{v:'100+',l:'Team'}].map((s,i) => (
                <div key={s.l} className={`flex-1 text-center ${i < 2 ? 'border-r border-cyan/20' : ''}`}>
                  <div className="font-orbitron text-lg font-bold text-cyan">{s.v}</div>
                  <div className="text-[10px] text-text-muted tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.6)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Our Purpose
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-10">Vision & <span className="text-cyan">Mission</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { tag: '// Vision', title: 'To Connect Every Corner of India', text: content.vision || 'To be India\'s most trusted and innovative manufacturer of network infrastructure — empowering businesses, governments and communities.' },
            { tag: '// Mission', title: 'Quality, Reliability & Innovation', text: content.mission || 'To manufacture and deliver world-class networking products that meet the highest quality standards while making them accessible and affordable.' },
          ].map(v => (
            <div key={v.tag} className="relative bg-blue-mid/70 border border-cyan/12 rounded-lg p-9 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:'linear-gradient(90deg,transparent,#00e5ff,transparent)'}}/>
              <div className="text-[10px] tracking-[0.28em] uppercase text-cyan font-orbitron mb-3">{v.tag}</div>
              <h3 className="font-orbitron text-lg font-bold mb-4">{v.title}</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Our Journey
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-12">Growing Stronger <span className="text-cyan">Year by Year</span></h2>
        <div className="relative pl-8 border-l border-cyan/20">
          {timeline.map((t, i) => (
            <div key={t.year} className={`relative pl-7 ${i < timeline.length - 1 ? 'mb-10' : ''}`}>
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan" style={{boxShadow:'0 0 10px rgba(0,229,255,0.6)'}}/>
              <div className="font-orbitron text-[11px] tracking-[0.2em] text-cyan mb-1">{t.year}</div>
              <div className="font-orbitron text-sm font-semibold mb-2">{t.title}</div>
              <p className="text-sm text-text-muted font-light leading-relaxed max-w-xl">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.5)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>What Drives Us
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-10">Our Core <span className="text-cyan">Values</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map(v => (
            <div key={v.num} className="flex gap-4 bg-blue-mid/50 border border-cyan/08 rounded-lg p-6 hover:border-cyan/25 hover:-translate-y-1 transition-all">
              <div className="font-orbitron text-3xl font-black text-cyan/15 leading-none flex-shrink-0">{v.num}</div>
              <div>
                <div className="font-orbitron text-sm font-semibold mb-2">{v.title}</div>
                <p className="text-xs text-text-muted font-light leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      {team.length > 0 && (
        <section className="px-16 py-20">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
            <span className="w-7 h-px bg-cyan"/>Leadership
          </div>
          <h2 className="font-orbitron text-3xl font-bold mb-10">The Team Behind <span className="text-cyan">Dron Edge</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map(m => (
              <div key={m.id} className="bg-blue-mid/60 border border-cyan/12 rounded-xl overflow-hidden hover:border-cyan/45 hover:-translate-y-2 transition-all text-center group shadow-lg hover:shadow-cyan/10">
                <div className="h-44 overflow-hidden bg-blue-deep/80">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top"
                      style={{filter:'brightness(0.55) saturate(0.5) hue-rotate(185deg)'}}/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center font-orbitron text-xl font-bold text-cyan"
                        style={{background:'linear-gradient(135deg,rgba(0,80,180,0.4),rgba(0,229,255,0.15))',border:'1px solid rgba(0,229,255,0.2)'}}>
                        {m.name.split(' ').map((n:string) => n[0]).join('').slice(0,2)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-orbitron text-sm font-bold mb-1">{m.name}</div>
                  <div className="text-[10px] tracking-widest uppercase text-cyan mb-1 opacity-80">{m.role}</div>
                  <div className="text-xs text-text-muted font-light">{m.department}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS STRIP */}
      {certs.length > 0 && (
        <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.6)'}}>
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
            <span className="w-7 h-px bg-cyan"/>Compliance
          </div>
          <h2 className="font-orbitron text-3xl font-bold mb-10">Certifications & <span className="text-cyan">Registrations</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certs.map(c => (
              <div key={c.id} className="bg-blue-mid/60 border border-cyan/10 rounded-lg p-6 text-center hover:border-cyan/30 transition-all">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-orbitron text-sm font-bold text-cyan mb-2">{c.name}</div>
                <div className="text-xs text-text-muted font-light">{c.issuer}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/certifications" className="font-orbitron text-xs tracking-widest uppercase text-cyan border border-cyan/25 px-6 py-2.5 rounded hover:bg-cyan/06 transition-colors">
              View All Certifications →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-16 py-20 text-center" style={{background:'linear-gradient(135deg,rgba(0,80,180,0.2),rgba(0,229,255,0.07))',borderTop:'1px solid rgba(0,229,255,0.15)'}}>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Let's Build Something <span className="text-cyan">Together</span></h2>
        <p className="text-text-muted font-light mb-8">Partner with India's trusted network infrastructure manufacturer.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
            Send Enquiry
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
