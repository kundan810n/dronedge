'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { createClient } from '@supabase/supabase-js'  
const supabase = createClient(   
  process.env.NEXT_PUBLIC_SUPABASE_URL!,   
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! )
import type { Product } from '@/types'

const categories = [
  { label: 'All Products', value: 'all' },
  { label: 'Network / Data Centre Solutions', value: 'Network / Data Centre Solutions' },
  { label: 'Fiber Optic Solutions', value: 'Fiber Optic Solutions' },
  { label: 'Structured Cabling', value: 'Structured Cabling' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase.from('products').select('*').eq('is_visible', true).order('created_at', { ascending: false })
      .then(({ data }) => { setProducts(data || []); setLoading(false) })
  }, [])

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* PAGE HERO */}
      <div className="relative h-64 overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80&fit=crop"
          alt="Products" className="absolute inset-0 w-full h-full object-cover"
          style={{filter:'brightness(0.2) saturate(0.5) hue-rotate(185deg)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(2,11,24,0.2),rgba(2,11,24,0) 40%,rgba(2,11,24,1))'}}/>
        <div className="scan-line"/>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-cyan mb-3">
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,transparent,#00e5ff)'}}/>
            Our Product Range
            <span className="w-8 h-px" style={{background:'linear-gradient(90deg,#00e5ff,transparent)'}}/>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">Products & <span className="text-cyan" style={{textShadow:'0 0 30px rgba(0,229,255,0.5)'}}>Solutions</span></h1>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <div className="hidden lg:block w-64 flex-shrink-0 border-r border-cyan/08 bg-blue-dark/30 pt-8">
          <div className="sticky top-20">
            <div className="px-6 mb-4">
              <div className="text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-3">Categories</div>
            </div>
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                className={`w-full text-left px-6 py-3 text-sm transition-all border-l-2 ${
                  activeCategory === cat.value
                    ? 'border-cyan text-cyan bg-cyan/05'
                    : 'border-transparent text-text-muted hover:text-white hover:bg-cyan/03'
                }`}>
                {cat.label}
              </button>
            ))}

            {/* Quick Links */}
            <div className="px-6 mt-8 pt-6 border-t border-cyan/08">
              <div className="text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-3">Quick Links</div>
              <Link href="/contact" className="block text-sm text-text-muted hover:text-cyan mb-2 transition-colors">📩 Get a Quote</Link>
              <Link href="/contact" className="block text-sm text-text-muted hover:text-cyan mb-2 transition-colors">📞 Call Us</Link>
              <Link href="/partner" className="block text-sm text-text-muted hover:text-cyan transition-colors">🤝 Become a Partner</Link>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-8">
          {/* Search + Mobile Filter */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="bg-blue-mid/50 border border-cyan/10 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/35 transition-colors flex-1 max-w-sm"/>
            <div className="flex gap-2 lg:hidden flex-wrap">
              {categories.map(cat => (
                <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                  className={`text-xs tracking-widest uppercase px-3 py-2 rounded font-orbitron transition-all border ${
                    activeCategory === cat.value ? 'bg-cyan text-blue-deep border-cyan font-bold' : 'border-cyan/15 text-text-muted hover:border-cyan/35'
                  }`}>
                  {cat.label === 'All Products' ? 'All' : cat.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="font-orbitron text-base font-bold">
              {activeCategory === 'all' ? 'All Products' : activeCategory}
              <span className="text-text-muted text-xs ml-3 font-light font-exo">{filtered.length} products</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="font-orbitron text-sm text-text-muted animate-pulse">Loading products...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 opacity-20">📦</div>
              <p className="text-text-muted font-orbitron text-sm">No products found.</p>
              <p className="text-text-muted text-xs mt-2">Try a different category or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`}
                  className="group bg-blue-mid/65 border border-cyan/08 rounded-lg overflow-hidden hover:border-cyan/35 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-blue-deep/80">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{filter:'brightness(0.55) saturate(0.6) hue-rotate(185deg)'}}/>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                        <div className="text-4xl opacity-20">📦</div>
                        <div className="text-text-muted/30 font-orbitron text-[10px] tracking-widest">{p.sub_category || p.category}</div>
                      </div>
                    )}
                    {p.badge && (
                      <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 font-orbitron tracking-wider"
                        style={{background:'rgba(0,229,255,0.15)',border:'1px solid rgba(0,229,255,0.3)',color:'#00e5ff'}}>
                        {p.badge}
                      </span>
                    )}
                    {p.is_featured && !p.badge && (
                      <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 font-orbitron tracking-wider"
                        style={{background:'rgba(255,180,0,0.15)',border:'1px solid rgba(255,180,0,0.3)',color:'#fbb040'}}>
                        Featured
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-cyan mb-1.5 opacity-75">{p.sub_category || p.category}</div>
                    <div className="font-orbitron text-sm font-semibold mb-2 leading-snug group-hover:text-cyan transition-colors">{p.name}</div>
                    {p.model_number && (
                      <div className="text-[10px] text-text-muted font-orbitron mb-2 opacity-60">Model: {p.model_number}</div>
                    )}
                    <p className="text-xs text-text-muted font-light leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tags?.slice(0,2).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 border border-cyan/14 text-text-muted rounded">{tag}</span>
                        ))}
                      </div>
                      <span className="text-[10px] tracking-widest uppercase text-cyan font-orbitron flex items-center gap-1 group-hover:gap-2 transition-all">
                        View
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA when no products */}
          {!loading && filtered.length === 0 && (
            <div className="text-center mt-8">
              <Link href="/contact" className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-6 py-3 rounded font-bold hover:bg-cyan-dim transition-colors">
                📩 Request Product Info
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}
