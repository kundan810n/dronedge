'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, ArrowLeft, Package } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

type Product = {
  id: string
  name: string
  slug: string
  category: string
  sub_category: string
  model_number: string
  description: string
  specs: Record<string, string>
  images: string[]
  datasheet_url?: string
  tags: string[]
  badge?: string
  is_featured: boolean
  is_visible: boolean
  created_at: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({
    name: '', slug: '', category: '', sub_category: '',
    model_number: '', description: '', tags: '', badge: '',
    is_featured: false, is_visible: true, specs: ''
  })

  const categories = ['Fiber Optic Solutions', 'Network Solutions', 'Other Solutions']

  function getClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  async function fetchProducts() {
    setLoading(true)
    const sb = getClient()
    const { data } = await sb.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  async function saveProduct() {
    const sb = getClient()
    let specsObj: Record<string, string> = {}
    try { specsObj = JSON.parse(form.specs || '{}') } catch {}
    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      sub_category: form.sub_category,
      model_number: form.model_number,
      description: form.description,
      badge: form.badge,
      is_featured: form.is_featured,
      is_visible: form.is_visible,
      tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      specs: specsObj,
    }
    if (editProduct) {
      await sb.from('products').update(payload).eq('id', editProduct.id)
    } else {
      await sb.from('products').insert([payload])
    }
    setShowForm(false)
    setEditProduct(null)
    resetForm()
    fetchProducts()
  }

  async function toggleVisible(p: Product) {
    const sb = getClient()
    await sb.from('products').update({ is_visible: !p.is_visible }).eq('id', p.id)
    fetchProducts()
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return
    const sb = getClient()
    await sb.from('products').delete().eq('id', id)
    fetchProducts()
  }

  function editClick(p: Product) {
    setEditProduct(p)
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      sub_category: p.sub_category || '',
      model_number: p.model_number || '',
      description: p.description || '',
      tags: (p.tags || []).join(', '),
      badge: p.badge || '',
      is_featured: p.is_featured,
      is_visible: p.is_visible,
      specs: JSON.stringify(p.specs || {}, null, 2)
    })
    setShowForm(true)
  }

  function resetForm() {
    setForm({ name:'', slug:'', category:'', sub_category:'', model_number:'', description:'', tags:'', badge:'', is_featured:false, is_visible:true, specs:'' })
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <div className="relative z-10">
        <div className="flex items-center justify-between px-8 py-4 border-b border-cyan/10 bg-blue-dark/80">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-text-muted hover:text-cyan transition-colors">
              <ArrowLeft size={18}/>
            </Link>
            <div className="font-orbitron text-sm font-bold tracking-widest">
              DRON<span className="text-cyan">EDGE</span>
              <span className="text-text-muted text-xs ml-3">/ Products</span>
            </div>
          </div>
          <button onClick={() => { resetForm(); setEditProduct(null); setShowForm(true) }}
            className="flex items-center gap-2 bg-cyan text-blue-deep font-orbitron text-xs tracking-widest uppercase px-4 py-2 rounded font-bold hover:bg-cyan-dim transition-colors">
            <Plus size={14}/> Add Product
          </button>
        </div>

        <div className="p-8">
          <div className="relative mb-6 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-blue-mid/50 border border-cyan/10 rounded px-4 py-2.5 pl-9 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-cyan/40 transition-colors"/>
          </div>

          {loading ? (
            <div className="text-center py-20 text-text-muted">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="mx-auto mb-4 text-text-muted opacity-30" size={48}/>
              <p className="text-text-muted">No products yet. Add your first product!</p>
            </div>
          ) : (
            <div className="bg-blue-mid/40 border border-cyan/08 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-cyan/05 border-b border-cyan/10">
                    {['Product Name','Category','Model','Badge','Status','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-cyan font-orbitron font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id} className="border-b border-cyan/05 hover:bg-cyan/02 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm text-white">{p.name}</div>
                        <div className="text-xs text-text-muted">{p.slug}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-muted">{p.category}</td>
                      <td className="px-4 py-3 text-xs text-text-muted font-orbitron">{p.model_number || '—'}</td>
                      <td className="px-4 py-3">
                        {p.badge && <span className="text-[10px] px-2 py-0.5 border border-cyan/25 text-cyan rounded">{p.badge}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded ${p.is_visible ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {p.is_visible ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => editClick(p)} className="text-text-muted hover:text-cyan transition-colors"><Edit2 size={14}/></button>
                          <button onClick={() => toggleVisible(p)} className="text-text-muted hover:text-cyan transition-colors">
                            {p.is_visible ? <Eye size={14}/> : <EyeOff size={14}/>}
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-blue-deep/95 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-blue-mid border border-cyan/15 rounded-lg w-full max-w-2xl p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60"/>
            <h2 className="font-orbitron text-lg font-bold mb-6">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Product Name *', key: 'name', placeholder: 'DE-SW-48P PoE Switch' },
                { label: 'Slug *', key: 'slug', placeholder: 'de-sw-48p-poe-switch' },
                { label: 'Model Number', key: 'model_number', placeholder: 'DE-SW-48P' },
                { label: 'Badge', key: 'badge', placeholder: 'New / Popular / RDSO' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    placeholder={f.placeholder}
                    className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-3 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
                </div>
              ))}
              <div>
                <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Category *</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan/40 transition-colors">
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Sub Category</label>
                <input value={form.sub_category} onChange={e => setForm({...form, sub_category: e.target.value})}
                  placeholder="Network Switches"
                  className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-3 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
                  placeholder="8 Port, Gigabit, Unmanaged"
                  className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-3 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors"/>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="Product description..." rows={3}
                  className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-3 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors resize-none"/>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitron mb-1.5">Specifications (JSON)</label>
                <textarea value={form.specs} onChange={e => setForm({...form, specs: e.target.value})}
                  placeholder={'{\n  "Ports": "48 x Gigabit RJ45"\n}'} rows={4}
                  className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-3 py-2.5 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-cyan/40 transition-colors font-mono text-xs resize-none"/>
              </div>
              <div className="col-span-2 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_visible} onChange={e => setForm({...form, is_visible: e.target.checked})} className="accent-cyan"/>
                  <span className="text-sm text-text-muted">Visible on website</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} className="accent-cyan"/>
                  <span className="text-sm text-text-muted">Featured product</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveProduct}
                className="flex-1 font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-3 rounded font-bold hover:bg-cyan-dim transition-colors">
                {editProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button onClick={() => { setShowForm(false); setEditProduct(null) }}
                className="px-6 border border-cyan/25 text-cyan text-xs tracking-widest uppercase font-orbitron rounded hover:bg-cyan/05 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
