import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-deep': '#020b18',
        'blue-dark': '#040f20',
        'blue-mid': '#071a35',
        'cyan': '#00e5ff',
        'cyan-dim': '#00b8cc',
        'text-muted': '#5a9ab5',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        exo: ['Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
