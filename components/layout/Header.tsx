'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const productCategories = [
  {
    title: 'Fiber Optic Solutions',
    items: ['Optical Fiber Cable', 'OFC Joint Closures', 'LIU / FMS Panels', 'Fiber Patch Cords', 'FTTH Solutions', 'Splicing Machines', 'OTDR Equipment']
  },
  {
    title: 'Network Solutions',
    items: ['Network Switches', 'ONT Devices', 'OLT Systems', 'Media Converters', 'PoE Switches', 'Managed Switches']
  },
  {
    title: 'Other Solutions',
    items: ['Copper Cables', 'Telephone Cables', 'Cabinets / Racks', 'Tools & Accessories', 'Co-Axial Cables']
  }
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()

  // Updated nav order: Home | About Us | Products | Certifications | Clients | Contact
  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About Us' },
  ]

  const navLinksRight = [
    { href: '/certifications', label: 'Certifications' },
    { href: '/partner', label: 'Partners' },
    { href: '/clients', label: 'Trusted By 🤝' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-[999] flex items-center justify-between px-16 py-4 border-b border-cyan/10 bg-blue-deep/95 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        {/* DE Box */}
        <div style={{
          width:'42px',height:'42px',
          background:'rgba(0,229,255,0.12)',
          border:'1.5px solid #00e5ff',
          borderRadius:'6px',
          display:'flex',alignItems:'center',justifyContent:'center',
          flexShrink:0
        }}>
          <span style={{fontFamily:'Arial Black,sans-serif',fontSize:'18px',fontWeight:'900',color:'#00e5ff',letterSpacing:'1px'}}>DE</span>
        </div>
        {/* Brand Text */}
        <div style={{fontFamily:'Arial Black,sans-serif',fontSize:'22px',fontWeight:'900',letterSpacing:'3px',color:'#e8f8ff'}}>
          DRON<span style={{color:'#00e5ff'}}>EDGE</span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-1" style={{position:'relative',zIndex:999}}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}
            className={`text-xs tracking-widest uppercase px-3 py-2 transition-colors hover:text-cyan
              ${pathname === link.href ? 'text-cyan' : 'text-text-muted'}`}>
            {link.label}
          </Link>
        ))}

        {/* Products Mega Menu — After About Us */}
        <div
          style={{position:'relative',zIndex:999}}
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}>
          <button className={`flex items-center gap-1 text-xs tracking-widest uppercase px-3 py-2 transition-colors
            ${pathname.startsWith('/products') ? 'text-cyan' : 'text-text-muted hover:text-cyan'}`}>
            Products
            <svg className={`w-3 h-3 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Mega Dropdown */}
          <div style={{
            position:'absolute',top:'calc(100% + 8px)',left:'50%',
            transform: productsOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(8px)',
            width:'680px',
            background:'rgba(4,15,32,0.98)',
            border:'1px solid rgba(0,229,255,0.15)',
            borderRadius:'8px',
            padding:'24px',
            opacity: productsOpen ? 1 : 0,
            visibility: productsOpen ? 'visible' : 'hidden',
            transition:'all 0.25s ease',
            backdropFilter:'blur(20px)',
            boxShadow:'0 30px 80px rgba(0,0,0,0.8)',
            zIndex:9999,
          }}>
            <div style={{position:'absolute',top:'-6px',left:'50%',transform:'translateX(-50%) rotate(45deg)',width:'12px',height:'12px',background:'rgba(4,15,32,0.98)',borderTop:'1px solid rgba(0,229,255,0.15)',borderLeft:'1px solid rgba(0,229,255,0.15)'}}/>
            <div className="grid grid-cols-3 gap-0">
              {productCategories.map((cat, i) => (
                <div key={cat.title} style={{padding:'0 18px',paddingLeft: i===0 ? 0 : undefined, borderRight: i<2 ? '1px solid rgba(0,229,255,0.08)' : 'none'}}>
                  <div className="text-[10px] tracking-[0.26em] uppercase text-cyan font-orbitron font-semibold mb-3 pb-2 border-b border-cyan/10">
                    {cat.title}
                  </div>
                  {cat.items.map(item => (
                    <Link key={item} href={`/products?category=${encodeURIComponent(item)}`}
                      className="flex items-center gap-2 text-[13px] text-text-muted py-1.5 border-b border-cyan/04 last:border-0 hover:text-white hover:pl-1 transition-all group/item">
                      <span className="w-1 h-1 rounded-full bg-cyan/30 group-hover/item:bg-cyan transition-colors flex-shrink-0"/>
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {navLinksRight.map(link => (
          <Link key={link.href} href={link.href}
            className={`text-xs tracking-widest uppercase px-3 py-2 transition-colors hover:text-cyan
              ${pathname === link.href ? 'text-cyan' : 'text-text-muted'}`}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-3">
        <Link href="/contact"
          className="font-orbitron text-[11px] tracking-widest uppercase bg-cyan text-blue-deep px-5 py-2 rounded-sm font-bold hover:bg-cyan-dim transition-colors">
          Get Quote
        </Link>
        <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_#00e5ff] animate-pulse"/>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-cyan" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-blue-dark/98 border-b border-cyan/10 p-6" style={{zIndex:999}}>
          <div className="flex flex-col gap-4">
            <Link href="/home" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link href="/products" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/certifications" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Certifications</Link>
            <Link href="/clients" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Clients</Link>
            <Link href="/contact" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/contact" className="font-orbitron text-[11px] tracking-widest uppercase bg-cyan text-blue-deep px-5 py-2 rounded-sm font-bold text-center" onClick={() => setMobileOpen(false)}>
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
