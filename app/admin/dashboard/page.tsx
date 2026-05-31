'use client'
import Link from 'next/link'
import { Package, MessageSquare, Users, FileText, Settings, BarChart3, Download, Star } from 'lucide-react'

const stats = [
  { label: 'Total Products', value: '0', icon: Package, color: 'text-cyan' },
  { label: 'New Enquiries', value: '0', icon: MessageSquare, color: 'text-green-400' },
  { label: 'Datasheet Leads', value: '0', icon: Download, color: 'text-yellow-400' },
  { label: 'Team Members', value: '0', icon: Users, color: 'text-purple-400' },
]

const quickLinks = [
  { href: '/admin/products', icon: Package, label: 'Manage Products', desc: 'Add, edit or delete products & categories' },
  { href: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries', desc: 'View and respond to customer enquiries' },
  { href: '/admin/leads', icon: Download, label: 'Datasheet Leads', desc: 'View leads from datasheet downloads' },
  { href: '/admin/pages', icon: FileText, label: 'Page Content', desc: 'Edit homepage, about us, certifications text' },
  { href: '/admin/team', icon: Users, label: 'Team Members', desc: 'Manage team profiles and photos' },
  { href: '/admin/settings', icon: Settings, label: 'Settings', desc: 'Contact info, social links, site settings' },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-blue-deep">
      <div className="bg-grid"/>
      <div className="relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-cyan/10 bg-blue-dark/80">
          <div className="font-orbitron text-base font-bold tracking-widest">
            DRON<span className="text-cyan">EDGE</span>
            <span className="text-text-muted text-xs ml-3 font-light tracking-wider">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-xs text-text-muted hover:text-cyan transition-colors tracking-wider">
              View Website ↗
            </Link>
            <button onClick={async () => {
              const { createClient } = await import('@supabase/supabase-js')
              const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
              )
              await supabase.auth.signOut()
              window.location.href = '/admin/login'
            }} className="text-xs text-red-400 hover:text-red-300 transition-colors tracking-wider">
              Sign Out
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Welcome */}
          <div className="mb-8">
            <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-2">Dashboard</div>
            <h1 className="font-orbitron text-2xl font-bold">Welcome Back 👋</h1>
            <p className="text-text-muted text-sm mt-1">Manage your website content from here.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map(stat => (
              <div key={stat.label}
                className="bg-blue-mid/60 border border-cyan/10 rounded-lg p-5 hover:border-cyan/25 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon size={20} className={stat.color}/>
                  <span className={`font-orbitron text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
                <div className="text-xs text-text-muted tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="text-xs tracking-[0.3em] uppercase text-cyan mb-4">Quick Actions</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="bg-blue-mid/50 border border-cyan/08 rounded-lg p-5 hover:border-cyan/30 hover:-translate-y-1 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 border border-cyan/20 rounded flex items-center justify-center bg-cyan/05 group-hover:bg-cyan/10 group-hover:border-cyan/40 transition-all">
                    <link.icon size={18} className="text-cyan"/>
                  </div>
                  <div className="font-orbitron text-sm font-semibold">{link.label}</div>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
