import Link from 'next/link'

const divisions = [
  { num: '01', tag: 'B2C', name: 'Business to Consumer', desc: 'Network switches, fiber cables & connectivity products for homes, SMEs and retail customers across India.', href: '/home' },
  { num: '02', tag: 'B2G', name: 'Business to Government', desc: 'MTCTE & TTP Approved Network Switches, telecom infrastructure & enterprise networking for government projects, railways & PSUs.', href: '/home' },
  { num: '03', tag: 'OEM', name: 'Original Equipment Mfr.', desc: 'Custom manufacturing, white-labelling & bulk supply of networking hardware for brands & system integrators.', href: '/home' },
  { num: '04', tag: 'SI', name: 'System Integrator', desc: 'End-to-end network design and deployment solutions for IT system integrators, EPC contractors & project partners.', href: '/home' },
]

const stats = [
  { val: '11+', lbl: 'Years Experience' },
  { val: '500+', lbl: 'Products' },
  { val: '1000+', lbl: 'Happy Clients' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-blue-deep relative overflow-hidden">
      <div className="bg-grid"/>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none z-0"
        style={{background:'radial-gradient(ellipse,rgba(0,229,255,0.10) 0%,transparent 70%)'}}/>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-16 py-6 border-b border-cyan/10">
          <div className="flex items-center gap-3">
            {/* DE Box Logo */}
            <div style={{width:'42px',height:'42px',background:'rgba(0,229,255,0.12)',border:'1.5px solid #00e5ff',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{fontFamily:'Arial Black,sans-serif',fontSize:'18px',fontWeight:'900',color:'#00e5ff',letterSpacing:'1px'}}>DE</span>
            </div>
            <div style={{fontFamily:'Arial Black,sans-serif',fontSize:'22px',fontWeight:'900',letterSpacing:'3px',color:'#e8f8ff'}}>
              DRON<span style={{color:'#00e5ff'}}>EDGE</span>
            </div>
          </div>
          <div className="font-orbitron text-[10px] tracking-[0.16em] uppercase text-cyan border border-cyan/30 px-4 py-1.5 bg-cyan/05 hidden md:block">
            Manufacturer &amp; Exporter
          </div>
        </header>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-cyan mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-cyan opacity-70"/>
            Optical Fiber · Network Switch · Telecom
            <span className="w-9 h-px bg-gradient-to-l from-transparent to-cyan opacity-70"/>
          </div>

          <h1 className="font-orbitron font-black text-white uppercase leading-none mb-3"
            style={{fontSize:'clamp(2.8rem,7vw,6rem)'}}>
            Network
          </h1>
          <h1 className="font-orbitron font-black uppercase leading-none mb-5"
            style={{fontSize:'clamp(2.8rem,7vw,6rem)',color:'#00e5ff',textShadow:'0 0 40px rgba(0,229,255,0.6),0 0 80px rgba(0,229,255,0.25)'}}>
            Solutions
          </h1>
          <p className="text-text-muted font-light max-w-lg leading-7 mb-10" style={{fontSize:'clamp(0.88rem,1.6vw,1.05rem)'}}>
            India's trusted manufacturer &amp; exporter of Optical Fiber Cables, Network Switches &amp; Telecom Infrastructure — engineered for scale.
          </p>

          <div className="flex items-center gap-4 text-[11px] tracking-[0.32em] uppercase text-text-muted mb-7">
            <span className="w-20 h-px bg-cyan/20"/>
            Select Your Division
            <span className="w-20 h-px bg-cyan/20"/>
          </div>

          {/* Division Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            {divisions.map(d => (
              <Link key={d.tag} href={d.href}
                className="group relative bg-blue-mid/70 border border-cyan/12 rounded-md p-8 text-left hover:border-cyan/45 hover:-translate-y-2 transition-all duration-350 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan/0 via-cyan/04 to-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <div className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-350"/>
                <div className="absolute top-0 right-0 w-11 h-11 border-t-2 border-r-2 border-cyan/22 rounded-tr-md group-hover:border-cyan/70 group-hover:w-14 group-hover:h-14 transition-all duration-300"/>
                <div className="font-orbitron text-[10px] tracking-[0.28em] text-cyan/35 mb-4">// {d.num}</div>
                <div className="font-orbitron text-2xl font-bold mb-1">{d.tag}</div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-cyan opacity-80 mb-3">{d.name}</div>
                <div className="text-[13px] text-text-muted font-light leading-relaxed mb-6">{d.desc}</div>
                <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-cyan font-orbitron group-hover:gap-3.5 transition-all">
                  Enter
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats — 3 items, no turnover */}
          <div className="grid grid-cols-3 w-full max-w-5xl mt-11 border border-cyan/10 rounded-md overflow-hidden bg-blue-mid/40">
            {stats.map((s, i) => (
              <div key={s.lbl} className={`py-5 px-6 ${i < 2 ? 'border-r border-cyan/10' : ''} hover:bg-cyan/04 transition-colors`}>
                <div className="font-orbitron text-xl font-bold text-cyan" style={{textShadow:'0 0 18px rgba(0,229,255,0.4)'}}>{s.val}</div>
                <div className="text-[11px] tracking-widest uppercase text-text-muted mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center py-5 border-t border-cyan/07">
          <p className="font-orbitron text-[10px] tracking-widest text-text-muted/30 uppercase">
            © 2025 Dron Edge India Pvt. Ltd. · GST: 09AAFCD3524N1ZE
          </p>
        </footer>
      </div>
    </div>
  )
}
