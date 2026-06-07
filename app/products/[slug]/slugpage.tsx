'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
import type { Product } from '@/types'

export default function ProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [leadForm, setLeadForm] = useState({ name:'', email:'', phone:'' })
  const [leadLoading, setLeadLoading] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)

  useEffect(() => {
    supabase.from('products').select('*').eq('slug', params.slug).single()
      .then(({ data }) => {
        setProduct(data)
        setLoading(false)
        if (data) {
          supabase.from('products').select('*').eq('category', data.category).eq('is_visible', true).neq('slug', data.slug).limit(3)
            .then(({ data: rel }) => setRelated(rel || []))
        }
      })
  }, [params.slug])

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    setLeadLoading(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadForm, product: product?.name, product_id: product?.id })
      })
      setLeadSuccess(true)
      if (product?.datasheet_url) window.open(product.datasheet_url, '_blank')
      setTimeout(() => { setShowModal(false); setLeadSuccess(false) }, 3000)
    } catch {} finally { setLeadLoading(false) }
  }

  if (loading) return (
    <div className="min-h-screen bg-blue-deep flex items-center justify-center">
      <div className="text-text-muted font-orbitron text-sm animate-pulse">Loading...</div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-blue-deep flex flex-col items-center justify-center gap-4">
      <div className="text-6xl opacity-20">📦</div>
      <div className="text-text-muted font-orbitron text-sm">Product not found.</div>
      <Link href="/products" className="font-orbitron text-xs tracking-widest uppercase text-cyan border border-cyan/25 px-5 py-2 rounded hover:bg-cyan/05 transition-colors">
        ← Back to Products
      </Link>
    </div>
  )

  const inputClass = "w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"
  const labelClass = "block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5"

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* BREADCRUMB */}
      <div className="px-8 lg:px-16 py-3 border-b border-cyan/07 flex items-center gap-2 text-xs text-text-muted flex-wrap">
        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
        <span className="text-cyan/30">›</span>
        <Link href="/products" className="hover:text-cyan transition-colors">Products</Link>
        <span className="text-cyan/30">›</span>
        <span className="text-cyan/60">{product.category}</span>
        <span className="text-cyan/30">›</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* IMAGES */}
          <div>
            <div className="w-full h-80 rounded-xl overflow-hidden border border-cyan/12 bg-blue-dark/60 mb-3">
              {product.images?.[activeImg] ? (
                <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover"
                  style={{filter:'brightness(0.65) saturate(0.7) hue-rotate(185deg)'}}/>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <div className="text-6xl opacity-15">📦</div>
                  <div className="text-text-muted/30 font-orbitron text-xs tracking-widest">No Image Available</div>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.slice(0,5).map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded overflow-hidden border transition-all ${i === activeImg ? 'border-cyan/60' : 'border-cyan/15 opacity-50 hover:opacity-80'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"
                      style={{filter:'brightness(0.5) saturate(0.5) hue-rotate(185deg)'}}/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <div className="text-[10px] tracking-[0.24em] uppercase text-cyan font-orbitron mb-3">{product.sub_category || product.category}</div>
            <h1 className="font-orbitron text-2xl font-bold leading-snug mb-2">{product.name}</h1>
            {product.model_number && (
              <div className="font-orbitron text-xs text-text-muted tracking-wider mb-5 flex items-center gap-2">
                <span className="text-cyan/50">Model:</span> {product.model_number}
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 border border-cyan/18 rounded text-text-muted">{tag}</span>
                ))}
              </div>
            )}

            <p className="text-sm text-text-muted font-light leading-relaxed mb-7">{product.description}</p>

            {/* Actions */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <Link href="/contact"
                className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-6 py-3 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan flex items-center gap-2">
                📩 Get Quote
              </Link>
              <a href="https://wa.me/918101648585"
                className="font-orbitron text-xs tracking-widest uppercase text-white px-6 py-3 rounded-sm font-semibold border-2 hover:bg-green-500/10 transition-all flex items-center gap-2"
                style={{borderColor:'rgba(37,211,102,0.4)',background:'rgba(37,211,102,0.08)'}}>
                💬 WhatsApp
              </a>
              {product.datasheet_url && (
                <button onClick={() => setShowModal(true)}
                  className="font-orbitron text-xs tracking-widest uppercase text-cyan px-6 py-3 rounded-sm font-semibold border-2 hover:bg-cyan/07 transition-all flex items-center gap-2"
                  style={{borderColor:'rgba(0,229,255,0.35)'}}>
                  ⬇ Datasheet
                </button>
              )}
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon: '🚚', title: 'Fast Delivery', desc: 'Pan India — 2-5 working days' },
                { icon: '✅', title: 'Quality Assured', desc: 'MTCTE approved products' },
                { icon: '🔧', title: 'Tech Support', desc: 'Pre & post sales support' },
                { icon: '📦', title: 'Bulk Available', desc: 'Ready stock at Noida' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-2 bg-blue-deep/40 border border-cyan/07 rounded-lg p-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="font-orbitron text-[10px] font-bold text-white mb-0.5">{item.title}</div>
                    <div className="text-[10px] text-text-muted">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SPECS */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-6">
              Technical Specifications
              <span className="flex-1 h-px bg-cyan/15"/>
            </div>
            <div className="bg-blue-mid/40 border border-cyan/08 rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr key={key} className={`border-b border-cyan/05 hover:bg-cyan/02 transition-colors ${i % 2 === 0 ? 'bg-blue-deep/20' : ''}`}>
                      <td className="px-6 py-3 text-xs text-text-muted w-2/5 font-orbitron tracking-wider">{key}</td>
                      <td className="px-6 py-3 text-sm text-white font-light">{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-6">
              Related Products
              <span className="flex-1 h-px bg-cyan/15"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`}
                  className="group bg-blue-mid/65 border border-cyan/08 rounded-lg overflow-hidden hover:border-cyan/35 hover:-translate-y-1 transition-all">
                  <div className="h-36 overflow-hidden bg-blue-deep/80">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{filter:'brightness(0.55) saturate(0.6) hue-rotate(185deg)'}}/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted/20 font-orbitron text-xs">No Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] tracking-widest uppercase text-cyan mb-1 opacity-75">{p.sub_category || p.category}</div>
                    <div className="font-orbitron text-sm font-semibold group-hover:text-cyan transition-colors">{p.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer/>
      <WhatsAppButton/>

      {/* DATASHEET MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{background:'rgba(2,11,24,0.92)',backdropFilter:'blur(8px)'}}
          onClick={() => setShowModal(false)}>
          <div className="relative bg-blue-mid border border-cyan/18 rounded-xl p-9 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{background:'linear-gradient(90deg,transparent,#00e5ff,transparent)'}}/>
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-text-muted hover:text-cyan">✕</button>

            {leadSuccess ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-4">✅</div>
                <div className="font-orbitron text-base font-bold text-cyan mb-2">Download Starting!</div>
                <p className="text-sm text-text-muted">We've also sent a copy to your email.</p>
              </div>
            ) : (
              <>
                <div className="text-2xl mb-4">📄</div>
                <h3 className="font-orbitron text-base font-bold mb-2">Download Datasheet</h3>
                <p className="text-sm text-text-muted font-light mb-6">Enter your details to download the <strong className="text-white">{product.name}</strong> datasheet.</p>
                <form onSubmit={submitLead} className="space-y-4">
                  {[
                    { key:'name', label:'Full Name *', placeholder:'Your name', type:'text' },
                    { key:'email', label:'Business Email *', placeholder:'your@email.com', type:'email' },
                    { key:'phone', label:'Mobile Number *', placeholder:'+91 XXXXX XXXXX', type:'tel' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className={labelClass}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={(leadForm as any)[f.key]} onChange={e => setLeadForm({...leadForm, [f.key]: e.target.value})}
                        className={inputClass}/>
                    </div>
                  ))}
                  <button type="submit" disabled={leadLoading}
                    className="w-full font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-3 rounded font-bold hover:bg-cyan-dim transition-colors disabled:opacity-50 mt-2">
                    {leadLoading ? 'Processing...' : 'Download Now →'}
                  </button>
                  <p className="text-[10px] text-text-muted/50 text-center">🔒 Your information is secure and will not be shared.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
