'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [leadForm, setLeadForm] = useState({ name:'', email:'', phone:'' })
  const [leadLoading, setLeadLoading] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)

  useEffect(() => {
    supabase.from('products').select('*').eq('slug', params.slug).single()
      .then(({ data }) => { setProduct(data); setLoading(false) })
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
      // In production, trigger actual PDF download here
      setTimeout(() => { setShowModal(false); setLeadSuccess(false) }, 3000)
    } catch { } finally { setLeadLoading(false) }
  }

  if (loading) return <div className="min-h-screen bg-blue-deep flex items-center justify-center"><div className="text-text-muted font-orbitron text-sm">Loading...</div></div>
  if (!product) return <div className="min-h-screen bg-blue-deep flex items-center justify-center"><div className="text-text-muted">Product not found. <Link href="/products" className="text-cyan">Go back</Link></div></div>

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <Header/>

      {/* BREADCRUMB */}
      <div className="px-16 py-3 border-b border-cyan/07 flex items-center gap-2 text-xs text-text-muted">
        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
        <span className="text-cyan/30">›</span>
        <Link href="/products" className="hover:text-cyan transition-colors">Products</Link>
        <span className="text-cyan/30">›</span>
        <span className="text-cyan">{product.name}</span>
      </div>

      <div className="px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* IMAGES */}
          <div>
            <div className="w-full h-80 rounded-lg overflow-hidden border border-cyan/15 bg-blue-dark/60">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover"
                  style={{filter:'brightness(0.6) saturate(0.7) hue-rotate(185deg)'}}/>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted/20 font-orbitron text-xs tracking-widest">NO IMAGE</div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.slice(0,4).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-16 h-16 rounded object-cover border border-cyan/15 opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                    style={{filter:'brightness(0.5) saturate(0.5) hue-rotate(185deg)'}}/>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <div className="text-[10px] tracking-[0.24em] uppercase text-cyan font-orbitron mb-3">{product.sub_category || product.category}</div>
            <h1 className="font-orbitron text-2xl font-bold leading-snug mb-2">{product.name}</h1>
            {product.model_number && (
              <div className="font-orbitron text-xs text-text-muted tracking-wider mb-5">Model: {product.model_number}</div>
            )}
            <p className="text-sm text-text-muted font-light leading-relaxed mb-6">{product.description}</p>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-7">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 border border-cyan/18 rounded text-text-muted">{tag}</span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <Link href="/contact"
                className="font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-6 py-3 rounded-sm font-bold hover:bg-cyan-dim transition-colors border-2 border-cyan">
                📩 Send Enquiry
              </Link>
              {product.datasheet_url && (
                <button onClick={() => setShowModal(true)}
                  className="font-orbitron text-xs tracking-widest uppercase text-cyan px-6 py-3 rounded-sm font-semibold border-2 hover:bg-cyan/07 transition-all flex items-center gap-2"
                  style={{borderColor:'rgba(0,229,255,0.35)'}}>
                  ⬇ Download Datasheet
                </button>
              )}
            </div>

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-cyan font-orbitron mb-4">
                  Technical Specifications
                  <span className="flex-1 h-px bg-cyan/15"/>
                </div>
                <table className="w-full">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key} className="border-b border-cyan/06 hover:bg-cyan/02 transition-colors">
                      <td className="py-2.5 pr-4 text-xs text-text-muted w-2/5">{key}</td>
                      <td className="py-2.5 text-sm text-white font-light">{String(val)}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer/>
      <WhatsAppButton/>

      {/* DATASHEET MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{background:'rgba(2,11,24,0.92)',backdropFilter:'blur(8px)'}}
          onClick={() => setShowModal(false)}>
          <div className="relative bg-blue-mid border border-cyan/18 rounded-lg p-9 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:'linear-gradient(90deg,transparent,#00e5ff,transparent)'}}/>
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
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={(leadForm as any)[f.key]} onChange={e => setLeadForm({...leadForm, [f.key]: e.target.value})}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
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
