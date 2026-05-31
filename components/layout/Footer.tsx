import Link from 'next/link'
import { Server } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#020810]/95 border-t border-cyan/08 pt-14 pb-7 px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-11 mb-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 flex items-center justify-center"
              style={{background:'linear-gradient(135deg,#0055bb,#0099dd)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)'}}>
              <Server size={16} color="#e8f8ff" strokeWidth={2.2}/>
            </div>
            <div className="font-orbitron text-base font-bold tracking-widest">
              DRON<span className="text-cyan">EDGE</span>
            </div>
          </div>
          <p className="text-sm text-text-muted font-light leading-7 max-w-xs">
            India's trusted manufacturer & exporter of Optical Fiber Cables, Network Switches and Telecom Equipment. Serving government, enterprise and retail sectors since 2015.
          </p>
          <div className="flex gap-3 mt-5">
            {['LinkedIn','Twitter','Facebook','YouTube'].map(s => (
              <a key={s} href="#" className="w-8 h-8 border border-cyan/15 rounded flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-all text-[10px] font-orbitron">
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-orbitron text-[10px] tracking-[0.22em] uppercase text-cyan mb-4">Products</h4>
          {['Network Switches','Optical Fiber Cable','ONT / OLT','Joint Closures','Splicing Machines','LIU / FMS'].map(p => (
            <Link key={p} href="/products" className="block text-sm text-text-muted hover:text-white mb-2 transition-colors">{p}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-orbitron text-[10px] tracking-[0.22em] uppercase text-cyan mb-4">Contact</h4>
          <div className="space-y-3">
            <p className="text-sm text-text-muted font-light">A-93, Sector 65, Noida<br/>Gautam Buddha Nagar, UP — 201301</p>
            <a href="tel:+917942631533" className="block text-sm text-text-muted hover:text-cyan transition-colors">+91 79426 31533</a>
            <a href="mailto:info@dronedge.in" className="block text-sm text-text-muted hover:text-cyan transition-colors">info@dronedge.in</a>
            <p className="text-xs text-text-muted/60">GST: 09AAFCD3524N1ZE</p>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan/07 pt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-orbitron text-[10px] tracking-widest text-text-muted/30 uppercase">
          © 2025 Dron Edge India Pvt. Ltd. · All Rights Reserved
        </p>
        <p className="font-orbitron text-[10px] tracking-widest text-text-muted/30 uppercase">
          CIN: U74140BR2015PTC024256
        </p>
      </div>
    </footer>
  )
}
