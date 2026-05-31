'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/types'

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('leads').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setLeads(data || []); setLoading(false) })
  }, [])

  function downloadCSV() {
    const headers = ['Name','Email','Phone','Product','Date']
    const rows = leads.map(l => [l.name, l.email, l.phone, l.product, new Date(l.created_at).toLocaleDateString('en-IN')])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `dronedge-leads-${Date.now()}.csv`; a.click()
  }

  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <div className="relative z-10">
        <div className="flex items-center justify-between px-8 py-4 border-b border-cyan/10 bg-blue-dark/80">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-text-muted hover:text-cyan transition-colors"><ArrowLeft size={18}/></Link>
            <div className="font-orbitron text-sm font-bold tracking-widest">
              DRON<span className="text-cyan">EDGE</span>
              <span className="text-text-muted text-xs ml-3">/ Datasheet Leads</span>
            </div>
          </div>
          <button onClick={downloadCSV}
            className="flex items-center gap-2 border border-cyan/25 text-cyan font-orbitron text-xs tracking-widest uppercase px-4 py-2 rounded hover:bg-cyan/05 transition-colors">
            <Download size={13}/> Export CSV
          </button>
        </div>
        <div className="p-8">
          <div className="mb-4 text-sm text-text-muted">Total leads: <span className="text-cyan font-orbitron font-bold">{leads.length}</span></div>
          {loading ? (
            <div className="text-center py-16 text-text-muted">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-16 text-text-muted">No leads yet.</div>
          ) : (
            <div className="bg-blue-mid/40 border border-cyan/08 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-cyan/05 border-b border-cyan/10">
                    {['Name','Email','Phone','Product','Date'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-cyan font-orbitron">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map(l => (
                    <tr key={l.id} className="border-b border-cyan/05 hover:bg-cyan/02 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-white">{l.name}</td>
                      <td className="px-4 py-3 text-sm text-text-muted">{l.email}</td>
                      <td className="px-4 py-3 text-sm text-text-muted">{l.phone}</td>
                      <td className="px-4 py-3 text-sm text-cyan">{l.product}</td>
                      <td className="px-4 py-3 text-xs text-text-muted">{new Date(l.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
