'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, ArrowLeft, Package } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import type { Product } from '@/types'

const getClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    const sb = getClient()
    const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false })
    console.log('Products fetch:', data, error)
    setProducts(data || [])
    setLoading(false)
  }

  async function saveProduct() {
    const sb = getClient()
    let specsObj: Record<string, string> = {}
    try { specsObj = JSON.parse(form.specs || '{}') } catch {}
    const payload = {
      ...form,
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
      name: p.name, slug: p.slug, category: p.category,
      sub_category: p.sub_category || '', model_number: p.model_number || '',
      description: p.description || '', tags: (p.tags || []).join(', '),
      badge: p.badge || '', is_featured: p.is_featured, is_visible: p.is_visible,
      specs: JSON.stringify(p.specs || {}, null, 2)
    })
    setShowForm(true)
  }

  function resetForm() {
    setForm({ name:'',slug:'',category:'',sub_category:'',model_number:'',description:'',tags:'',badge:'',is_featured:false,is_visible:true,specs:'' })
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )
}
  const categories = ['Fiber Optic Solutions', 'Network Solutions', 'Other Solutions']

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
                  <label className="block text-[10px] tracking-[0.18em] uppercase text-text-muted font-orbitro
