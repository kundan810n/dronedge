'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Server } from 'lucide-react'

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

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/clients', label: 'Clients' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-16 py-4 border-b border-cyan/10 bg-blue-deep/95 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center animate-pulse-glow"
          style={{background:'linear-gradient(135deg,#0055bb,#0099dd)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)'}}>
          <Server size={18} color="#e8f8ff" strokeWidth={2.2}/>
        </div>
        <div>
          <div className="font-orbitron text-xl font-bold tracking-widest">
            DRON<span className="text-cyan">EDGE</span>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted">India Private Limited</div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-1">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}
            className={`text-xs tracking-widest uppercase px-3 py-2 transition-colors hover:text-cyan
              ${pathname === link.href ? 'text-cyan' : 'text-text-muted'}`}>
            {link.label}
          </Link>
        ))}

        {/* Products Mega Menu */}
        <div className="relative group">
          <button className={`flex items-center gap-1 text-xs tracking-widest uppercase px-3 py-2 transition-colors
            ${pathname.startsWith('/products') ? 'text-cyan' : 'text-text-muted hover:text-cyan'}`}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}>
            Products
            <svg className={`w-3 h-3 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Mega Dropdown */}
          <div
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px]
              bg-blue-dark/98 border border-cyan/15 rounded-lg p-7 backdrop-blur-xl
              shadow-2xl transition-all duration-200
              ${productsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
            {/* Arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-blue-dark border-t border-l border-cyan/15"/>
            <div className="grid grid-cols-3 gap-0">
              {productCategories.map((cat, i) => (
                <div key={cat.title} className={`px-5 ${i < 2 ? 'border-r border-cyan/08' : ''}`}
                  style={i === 0 ? {paddingLeft:0} : {}}>
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-blue-dark/98 border-b border-cyan/10 p-6">
          <div className="flex flex-col gap-4">
            <Link href="/home" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link href="/products" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/clients" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Clients</Link>
            <Link href="/certifications" className="text-sm text-text-muted hover:text-cyan transition-colors" onClick={() => setMobileOpen(false)}>Certifications</Link>
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
