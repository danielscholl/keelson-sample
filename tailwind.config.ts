import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#03030a',
          card: '#0d0d1a',
          primary: '#f0f0ff',
          muted: '#94a3b8',
          border: 'rgba(255, 255, 255, 0.05)',
        },
        category: {
          planet: {
            text: '#f59e0b',
            bg: '#78350f',
          },
          moon: {
            text: '#94a3b8',
            bg: '#1e293b',
          },
          star: {
            text: '#fde68a',
            bg: '#78350f',
          },
          nebula: {
            text: '#c084fc',
            bg: '#3b0764',
          },
          galaxy: {
            text: '#818cf8',
            bg: '#1e1b4b',
          },
          blackhole: {
            text: '#f87171',
            bg: '#450a0a',
          },
          exoplanet: {
            text: '#2dd4bf',
            bg: '#042f2e',
          },
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Courier', 'monospace'],
      },
      animation: {
        'starfield-slow': 'drift 120s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'orbit-1': 'orbit 5s linear infinite',
        'orbit-2': 'orbit 8s linear infinite',
        'orbit-3': 'orbit 12s linear infinite',
        'orbit-4': 'orbit 16s linear infinite',
        'orbit-5': 'orbit 20s linear infinite',
        'orbit-6': 'orbit 25s linear infinite',
        'orbit-7': 'orbit 30s linear infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-1000px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
