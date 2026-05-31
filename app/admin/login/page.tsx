'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Server, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-deep relative overflow-hidden">
      <div className="bg-grid"/>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center animate-pulse-glow"
              style={{background:'linear-gradient(135deg,#0055bb,#0099dd)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)'}}>
              <Server size={22} color="#e8f8ff" strokeWidth={2.2}/>
            </div>
            <div className="font-orbitron text-2xl font-bold tracking-widest">
              DRON<span className="text-cyan">EDGE</span>
            </div>
          </div>
          <p className="text-xs tracking-[0.28em] uppercase text-text-muted">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-blue-mid/60 border border-cyan/12 rounded-lg p-9 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60"/>

          <h2 className="font-orbitron text-lg font-bold mb-2">Sign In</h2>
          <p className="text-sm text-text-muted font-light mb-7">Enter your credentials to access the admin panel.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-text-muted font-orbitron mb-2">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@dronedge.in" required
                className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors"/>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-text-muted font-orbitron mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full bg-blue-deep/80 border border-cyan/12 rounded px-4 py-3 pr-10 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors"/>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-cyan">
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full font-orbitron text-xs tracking-widest uppercase bg-cyan text-blue-deep py-3.5 rounded font-bold hover:bg-cyan-dim transition-colors disabled:opacity-50 mt-2">
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted/40 mt-6 font-orbitron tracking-widest">
          DRON EDGE INDIA PVT. LTD.
        </p>
      </div>
    </div>
  )
}
