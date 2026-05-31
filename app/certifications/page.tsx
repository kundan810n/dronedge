import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { supabase } from '@/lib/supabase'

async function getCertifications() {
  const { data } = await supabase.from('certifications').select('*').eq('is_visible', true).order('order')
  return data || []
}

const compliance = [
  { product: 'Optical Fiber Cable (OFC)', standard: 'RDSO Spec. No. TI/SPC/OFC/CABLE/0060', status: 'Approved' },
  { product: 'Optical Fiber Cable (OFC)', standard: 'ITU-T G.652D — Single Mode Fiber', status: 'Compliant' },
  { product: 'Network Switches', standard: 'IEEE 802.3 — Ethernet Standard', status: 'Compliant' },
  { product: 'PoE Switches', standard: 'IEEE 802.3af / 802.3at — PoE/PoE+', status: 'Compliant' },
  { product: 'ONT / OLT Devices', standard: 'ITU-T G.984 — GPON Standard', status: 'Compliant' },
  { product: 'OFC Joint Closures', standard: 'IP68 Weatherproof Rating', status: 'Certified' },
  { product: 'All Products', standard: 'GST Compliant — GSTIN: 09AAFCD3524N1ZE', status: 'Registered' },
  { product: 'Company', standard: 'MCA — Companies Act 2013', status: 'Registered' },
]

const registrations = [
  { label: 'GSTIN', number: '09AAFCD3524N1ZE', desc: 'Valid GST registration under UP jurisdiction.' },
  { label: 'CIN', number: 'U74140BR2015PTC024256', desc: 'Corporate Identity Number — MCA registered Pvt. Ltd.' },
  { label: 'IEC Code', number: 'AAFCD3524N', desc: 'Import Export Code issued by DGFT.' },
  { label: 'PAN', number: 'AAFCD3524N', desc: 'Permanent Account Number for tax compliance.' },
  { label: 'RDSO', number: 'Approved Vendor', desc: 'RDSO approved OFC manufacturer for Indian Railways.' },
  { label: 'Address', number: 'A-93, Sector 65, Noida', desc: 'Gautam Buddha Nagar, UP — 201301.' },
]

export default async function CertificationsPage() {
  const certs = await getCertifications()

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* PAGE HERO */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&fit=crop"
          alt="Certifications" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.2) saturate(0.5) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2),rgba(2,11,24,0) 40%,rgba(2,11,24,1))'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-3">
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            Quality & Compliance
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">Certifications & <span className="text-cyan" style={{textShadow:'0 0 30px rgba(0,229,255,0.5)'}}>Registrations</span></h1>
        </div>
      </div>

      {/* MAIN CERTS */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Our Certifications
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Verified Quality You <span className="text-cyan">Can Trust</span></h2>
        <p className="text-text-muted font-light mb-12 max-w-lg">Every certification reflects our commitment to meeting the highest standards — from Indian Railways to international quality benchmarks.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map(c => (
            <div key={c.id} className="relative flex gap-6 bg-blue-mid/70 border border-cyan/12 rounded-lg p-8 hover:border-cyan/30 hover:-translate-y-1 transition-all overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)'}}/>
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-lg text-3xl"
                style={{background:'linear-gradient(135deg,rgba(0,229,255,0.1),rgba(0,80,180,0.12))',border:'1px solid rgba(0,229,255,0.22)'}}>
                {c.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] tracking-widest uppercase text-green-400 font-orbitron flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{boxShadow:'0 0 5px #4ade80'}}/>
                    Active & Valid
                  </span>
                </div>
                <div className="font-orbitron text-sm font-bold mb-1">{c.name}</div>
                <div className="text-[10px] tracking-widest uppercase text-cyan opacity-80 mb-3">{c.issuer}</div>
                <p className="text-xs text-text-muted font-light leading-relaxed mb-3">{c.description}</p>
                <div className="font-orbitron text-xs bg-cyan/06 border border-cyan/12 rounded px-3 py-1.5 inline-block text-text-muted">
                  {c.number}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION NUMBERS */}
      <section className="px-16 py-20" style={{background:'rgba(4,15,32,0.6)'}}>
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Registration Numbers
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-10">Official <span className="text-cyan">Registration Details</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrations.map(r => (
            <div key={r.label} className="bg-blue-mid/60 border border-cyan/10 rounded-lg p-6 hover:border-cyan/28 hover:-translate-y-1 transition-all">
              <div className="text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-2">{r.label}</div>
              <div className="font-orbitron text-xs bg-cyan/05 border border-cyan/12 rounded px-3 py-2 text-white mb-3 tracking-wider">{r.number}</div>
              <p className="text-xs text-text-muted font-light leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLIANCE TABLE */}
      <section className="px-16 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-3 flex items-center gap-3">
          <span className="w-7 h-px bg-cyan"/>Compliance Matrix
        </div>
        <h2 className="font-orbitron text-3xl font-bold mb-10">Product <span className="text-cyan">Compliance Status</span></h2>
        <div className="bg-blue-mid/40 border border-cyan/08 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan/05 border-b border-cyan/10">
                {['Product Category', 'Standard / Certification', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compliance.map((c, i) => (
                <tr key={i} className="border-b border-cyan/05 hover:bg-cyan/02 transition-colors">
                  <td className="px-5 py-3.5 text-sm text-white font-medium">{c.product}</td>
                  <td className="px-5 py-3.5 text-sm text-text-muted font-light">{c.standard}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] px-2.5 py-1 rounded font-orbitron flex items-center gap-1.5 w-fit"
                      style={{background:'rgba(0,255,136,0.08)',border:'1px solid rgba(0,255,136,0.2)',color:'#4ade80'}}>
                      ✓ {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="px-16 py-20 text-center" style={{background:'linear-gradient(135deg,rgba(0,80,180,0.2),rgba(0,229,255,0.07))',borderTop:'1px solid rgba(0,229,255,0.15)'}}>
        <h2 className="font-orbitron text-3xl font-bold mb-3">Need <span className="text-cyan">Certification Documents?</span></h2>
        <p className="text-text-muted font-light mb-8">Need copies of our RDSO approval for your tender? We'll send them within 24 hours.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-7 py-3.5 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
            Request Documents
          </Link>
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
