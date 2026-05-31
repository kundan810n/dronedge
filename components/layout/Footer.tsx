import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#020810]/95 border-t border-cyan/08 pt-14 pb-7 px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-11 mb-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="font-orbitron text-base font-bold tracking-widest mb-4">
            DRON<span className="text-cyan">EDGE</span>
          </div>
          <p className="text-sm text-text-muted font-light leading-7 max-w-xs">
            India's trusted manufacturer & exporter of Optical Fiber Cables, Network Switches and Telecom Equipment. Serving government, enterprise and retail sectors since 2015.
          </p>
          <div className="flex gap-3 mt-5">
            {['L','T','F','Y'].map((s,i) => (
              <a key={i} href="#" className="w-8 h-8 border border-cyan/15 rounded flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-all text-[10px] font-orbitron">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-orbitron text-[10px] tracking-[0.22em] uppercase text-cyan mb-4">Company</h4>
          <Link href="/home" className="block text-sm text-text-muted hover:text-white mb-2 transition-colors">Home</Link>
          <Link href="/about" className="block text-sm text-text-muted hover:text-white mb-2 transition-colors">About Us</Link>
          <Link href="/certifications" className="block text-sm text-text-muted hover:text-white mb-2 transition-colors">Certifications</Link>
          <Link href="/clients" className="block text-sm text-text-muted hover:text-white mb-2 transition-colors">Clients</Link>
          <Link href="/contact" className="block text-sm text-text-muted hover:text-white mb-2 transition-colors">Contact Us</Link>
        </div>

        {/* Products — Proper categories */}
        <div>
          <h4 className="font-orbitron text-[10px] tracking-[0.22em] uppercase text-cyan mb-4">Products</h4>
          <div className="text-[9px] tracking-[0.18em] uppercase text-cyan/50 font-orbitron mb-2">Fiber Optic</div>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-1.5 transition-colors">Optical Fiber Cable</Link>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-1.5 transition-colors">OFC Joint Closures</Link>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-1.5 transition-colors">LIU / FMS Panels</Link>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-3 transition-colors">Splicing Machines</Link>
          <div className="text-[9px] tracking-[0.18em] uppercase text-cyan/50 font-orbitron mb-2">Network</div>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-1.5 transition-colors">Network Switches</Link>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-1.5 transition-colors">ONT / OLT Devices</Link>
          <Link href="/products" className="block text-sm text-text-muted hover:text-white mb-1.5 transition-colors">PoE Switches</Link>
        </div>
      </div>

      {/* Contact strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-5 rounded-lg border border-cyan/08" style={{background:'rgba(7,26,53,0.4)'}}>
        <a href="tel:+917942631533" className="flex items-center gap-3 text-text-muted hover:text-cyan transition-colors">
          <span className="text-lg">📞</span>
          <div>
            <div className="text-[9px] tracking-widest uppercase text-cyan/60 font-orbitron">Call Us</div>
            <div className="text-xs font-medium">+91 79426 31533</div>
          </div>
        </a>
        <a href="mailto:info@dronedge.in" className="flex items-center gap-3 text-text-muted hover:text-cyan transition-colors">
          <span className="text-lg">📧</span>
          <div>
            <div className="text-[9px] tracking-widest uppercase text-cyan/60 font-orbitron">Email</div>
            <div className="text-xs font-medium">info@dronedge.in</div>
          </div>
        </a>
        <a href="https://wa.me/918759854111" className="flex items-center gap-3 text-text-muted hover:text-cyan transition-colors">
          <span className="text-lg">💬</span>
          <div>
            <div className="text-[9px] tracking-widest uppercase text-cyan/60 font-orbitron">WhatsApp</div>
            <div className="text-xs font-medium">+91 87598 54111</div>
          </div>
        </a>
        <div className="flex items-center gap-3 text-text-muted">
          <span className="text-lg">📍</span>
          <div>
            <div className="text-[9px] tracking-widest uppercase text-cyan/60 font-orbitron">Address</div>
            <div className="text-xs font-medium">Sector 65, Noida UP</div>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan/07 pt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-orbitron text-[10px] tracking-widest text-text-muted/30 uppercase">
          © 2025 Dron Edge India Pvt. Ltd. · All Rights Reserved
        </p>
        <p className="font-orbitron text-[10px] tracking-widest text-text-muted/30 uppercase">
          GST: 09AAFCD3524N1ZE · CIN: U74140BR2015PTC024256
        </p>
      </div>
    </footer>
  )
}
