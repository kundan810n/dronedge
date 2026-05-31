'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Building2, Filter } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Enquiry } from '@/types'

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Enquiry | null>(null)

  useEffect(() => { fetchEnquiries() }, [])

  async function fetchEnquiries() {
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    setEnquiries(data || [])
    setLoading(false)
  }

  async function markRead(id: string) {
    await supabase.from('enquiries').update({ status: 'read' }).eq('id', id)
    fetchEnquiries()
  }

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter)
  const newCount = enquiries.filter(e => e.status === 'new').length

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
              <span className="text-text-muted text-xs ml-3">/ Enquiries</span>
            </div>
          </div>
          {newCount > 0 && (
            <div className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded font-orbitron">
              {newCount} New
            </div>
          )}
        </div>

        <div className="p-8">
          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['all','new','read','replied'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs tracking-widest uppercase px-4 py-2 rounded font-orbitron transition-all
                  ${filter === f ? 'bg-cyan text-blue-deep font-bold' : 'border border-cyan/15 text-text-muted hover:border-cyan/35 hover:text-cyan'}`}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16 text-text-muted">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-text-muted">No enquiries found.</div>
          ) : (
            <div className="grid gap-3">
              {filtered.map(enq => (
                <div key={enq.id}
                  onClick={() => { setSelected(enq); markRead(enq.id) }}
                  className={`bg-blue-mid/50 border rounded-lg p-5 cursor-pointer hover:border-cyan/30 transition-all
                    ${enq.status === 'new' ? 'border-cyan/25 bg-cyan/03' : 'border-cyan/08'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white">{enq.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-orbitron
                          ${enq.status === 'new' ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                          : enq.status === 'replied' ? 'bg-cyan/10 text-cyan border border-cyan/20'
                          : 'bg-text-muted/10 text-text-muted border border-text-muted/20'}`}>
                          {enq.status}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 border border-cyan/15 text-cyan rounded font-orbitron">{enq.division}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-muted mb-2">
                        <span className="flex items-center gap-1"><Mail size={11}/>{enq.email}</span>
                        <span className="flex items-center gap-1"><Phone size={11}/>{enq.phone}</span>
                        {enq.company && <span className="flex items-center gap-1"><Building2 size={11}/>{enq.company}</span>}
                      </div>
                      <p className="text-sm text-text-muted line-clamp-2">{enq.message}</p>
                    </div>
                    <div className="text-xs text-text-muted/50 text-right flex-shrink-0">
                      {new Date(enq.created_at).toLocaleDateString('en-IN')}
                      <br/>
                      {new Date(enq.created_at).toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-blue-deep/92 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}>
          <div className="bg-blue-mid border border-cyan/15 rounded-lg p-8 w-full max-w-lg relative"
            onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60"/>
            <h3 className="font-orbitron text-base font-bold mb-5">Enquiry Detail</h3>
            <table className="w-full mb-5">
              {[
                ['Name', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Company', selected.company || '—'],
                ['Division', selected.division],
                ['Product', selected.product || '—'],
                ['Date', new Date(selected.created_at).toLocaleString('en-IN')],
              ].map(([k,v]) => (
                <tr key={k} className="border-b border-cyan/06">
                  <td className="py-2 text-xs text-text-muted w-28">{k}</td>
                  <td className="py-2 text-sm text-white">{v}</td>
                </tr>
              ))}
            </table>
            <div className="mb-5">
              <div className="text-xs text-text-muted mb-2">Message</div>
              <div className="bg-cyan/04 border border-cyan/10 rounded p-3 text-sm text-white leading-relaxed">{selected.message}</div>
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${selected.email}?subject=Re: Your Enquiry — Dron Edge India`}
                className="flex-1 text-center font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-2.5 rounded font-bold hover:bg-cyan-dim transition-colors">
                Reply via Email
              </a>
              <a href={`tel:${selected.phone}`}
                className="px-5 border border-cyan/25 text-cyan text-xs tracking-widest uppercase font-orbitron rounded hover:bg-cyan/05 transition-colors flex items-center gap-2">
                <Phone size={12}/> Call
              </a>
              <button onClick={() => setSelected(null)}
                className="px-5 border border-text-muted/20 text-text-muted text-xs tracking-widest uppercase font-orbitron rounded hover:border-text-muted/40 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
