import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dron Edge India — Network Infrastructure Solutions',
  description: 'India\'s trusted manufacturer & exporter of Optical Fiber Cables, Network Switches and Telecom Equipment. RDSO approved. Serving B2C, B2G, OEM and System Integrators.',
  keywords: 'optical fiber cable, network switch, ONT, OLT, RDSO approved, Noida, India',
  openGraph: {
    title: 'Dron Edge India — Network Infrastructure',
    description: 'Manufacturer & Exporter of OFC, Network Switches, Telecom Equipment',
    url: 'https://dronedge.in',
    siteName: 'Dron Edge India',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
