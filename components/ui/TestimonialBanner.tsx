'use client'

const defaultTestimonials = [
  { name: 'R.K. Sharma', role: 'Procurement Manager, Railways Contractor', text: 'Dron Edge has been our preferred supplier for optical fiber cables for over 3 years. RDSO-approved products pass all quality checks and delivery is always on time.', initials: 'RK' },
  { name: 'Amit Singh', role: 'Director, Regional ISP — UP', text: 'Excellent pricing, genuine products and their technical support team is very responsive. Highly recommended for network switches and ONT devices.', initials: 'AS' },
  { name: 'Priya Gupta', role: 'Projects Head, IT Integrator — Delhi NCR', text: 'As a system integrator, we need reliable partners. Dron Edge consistently delivers quality fiber and switching products with proper documentation.', initials: 'PG' },
  { name: 'Vijay Kumar', role: 'Project Manager, Smart City Project', text: 'We have been using Dron Edge switches for our smart city project. The build quality and after-sales support is top notch. Highly recommended!', initials: 'VK' },
  { name: 'S.K. Mishra', role: 'DGM Telecom, Infrastructure Projects', text: 'Their OFC cables have been deployed across multiple railway stations. Zero complaints in 2 years of operation. Truly RDSO grade quality.', initials: 'SK' },
]

export default function TestimonialBanner() {
  const doubled = [...defaultTestimonials, ...defaultTestimonials]

  return (
    <div className="overflow-hidden py-7 relative" style={{background:'rgba(4,15,32,0.8)',borderTop:'1px solid rgba(0,229,255,0.1)',borderBottom:'1px solid rgba(0,229,255,0.1)'}}>
      <div className="absolute top-0 bottom-0 left-0 w-28 z-10 pointer-events-none" style={{background:'linear-gradient(90deg,rgba(4,15,32,0.9),transparent)'}}/>
      <div className="absolute top-0 bottom-0 right-0 w-28 z-10 pointer-events-none" style={{background:'linear-gradient(270deg,rgba(4,15,32,0.9),transparent)'}}/>
      <div className="flex gap-6 w-max" style={{animation:'scrollBanner 45s linear infinite'}}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
        {doubled.map((t, i) => (
          <div key={i} className="flex-shrink-0 w-[360px] rounded-lg p-5"
            style={{background:'rgba(7,26,53,0.7)',border:'1px solid rgba(0,229,255,0.1)'}}>
            <div className="font-orbitron text-xl text-cyan mb-2" style={{opacity:0.25}}>"</div>
            <p className="text-xs text-text-muted font-light leading-relaxed italic mb-4" style={{display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{t.text}</p>
            <div className="flex items-center gap-3 pt-3" style={{borderTop:'1px solid rgba(0,229,255,0.08)'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-orbitron text-xs font-bold text-cyan flex-shrink-0"
                style={{background:'linear-gradient(135deg,rgba(0,80,180,0.5),rgba(0,229,255,0.2))',border:'1px solid rgba(0,229,255,0.2)'}}>
                {t.initials}
              </div>
              <div>
                <div className="font-orbitron text-xs font-semibold text-white">{t.name}</div>
                <div className="text-xs text-text-muted">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes scrollBanner{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
