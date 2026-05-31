'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const PAGE_SECTIONS = [
  {
    section: 'home',
    label: 'Home Page',
    fields: [
      { key: 'hero_title', label: 'Hero Main Title', type: 'text' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
      { key: 'stat_clients', label: 'Stat: Clients', type: 'text' },
      { key: 'stat_products', label: 'Stat: Products', type: 'text' },
      { key: 'stat_years', label: 'Stat: Years Experience', type: 'text' },
      { key: 'stat_turnover', label: 'Stat: Annual Turnover', type: 'text' },
    ]
  },
  {
    section: 'about',
    label: 'About Us Page',
    fields: [
      { key: 'company_story', label: 'Company Story', type: 'textarea' },
      { key: 'vision', label: 'Vision Statement', type: 'textarea' },
      { key: 'mission', label: 'Mission Statement', type: 'textarea' },
    ]
  },
  {
    section: 'contact',
    label: 'Contact Details',
    fields: [
      { key: 'phone', label: 'Phone Number', type: 'text' },
      { key: 'email', label: 'Email Address', type: 'text' },
      { key: 'address', label: 'Office Address', type: 'text' },
      { key: 'hours', label: 'Business Hours', type: 'text' },
      { key: 'whatsapp', label: 'WhatsApp Number (with country code)', type: 'text' },
    ]
  }
]

export default function AdminPages() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => { fetchContent() }, [])

  async function fetchContent() {
    const { data } = await supabase.from('site_content').select('*')
    const map: Record<string, string> = {}
    data?.forEach(row => { map[`${row.section}_${row.key}`] = row.value || '' })
    setContent(map)
    setLoading(false)
  }

  async function saveSection(section: string) {
    const sectionFields = PAGE_SECTIONS.find(s => s.section === section)?.fields || []
    const updates = sectionFields.map(f => ({
      section, key: f.key, value: content[`${section}_${f.key}`] || ''
    }))

    for (const u of updates) {
      await supabase.from('site_content')
        .upsert({ section: u.section, key: u.key, value: u.value }, { onConflict: 'section,key' })
    }

    setSaved(section)
    setTimeout(() => setSaved(null), 2500)
  }

  function updateField(section: string, key: string, value: string) {
    setContent(prev => ({ ...prev, [`${section}_${key}`]: value }))
  }

  const currentSection = PAGE_SECTIONS.find(s => s.section === activeSection)!

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
              <span className="text-text-muted text-xs ml-3">/ Page Content</span>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-4xl">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-2">Content Editor</div>
          <h1 className="font-orbitron text-xl font-bold mb-6">Edit Page Content</h1>

          {/* Section Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {PAGE_SECTIONS.map(s => (
              <button key={s.section} onClick={() => setActiveSection(s.section)}
                className={`font-orbitron text-xs tracking-widest uppercase px-4 py-2 rounded transition-all
                  ${activeSection === s.section
                    ? 'bg-cyan text-blue-deep font-bold'
                    : 'border border-cyan/20 text-text-muted hover:border-cyan/40 hover:text-cyan'}`}>
                {s.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-text-muted">Loading content...</div>
          ) : (
            <div className="bg-blue-mid/50 border border-cyan/10 rounded-lg p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40"/>
              <h2 className="font-orbitron text-base font-bold mb-6">{currentSection.label}</h2>

              <div className="space-y-5">
                {currentSection.fields.map(field => (
                  <div key={field.key}>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-text-muted font-orbitron mb-2">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={content[`${currentSection.section}_${field.key}`] || ''}
                        onChange={e => updateField(currentSection.section, field.key, e.target.value)}
                        rows={4}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-cyan/40 transition-colors resize-none leading-relaxed"/>
                    ) : (
                      <input
                        type="text"
                        value={content[`${currentSection.section}_${field.key}`] || ''}
                        onChange={e => updateField(currentSection.section, field.key, e.target.value)}
                        className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-cyan/40 transition-colors"/>
                    )}
                  </div>
                ))}
              </div>

              <button onClick={() => saveSection(currentSection.section)}
                className="mt-6 flex items-center gap-2 font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep px-6 py-3 rounded font-bold hover:bg-cyan-dim transition-colors">
                {saved === currentSection.section
                  ? <><Check size={14}/> Saved!</>
                  : <><Save size={14}/> Save Changes</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
