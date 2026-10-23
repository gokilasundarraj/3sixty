/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070504',
        surface: {
          DEFAULT: '#0d0a08',
          card: 'rgba(18, 14, 11, 0.75)',
          hover: 'rgba(28, 20, 16, 0.85)',
          glass: 'rgba(18, 13, 10, 0.65)',
        },
        copper: {
          light: '#ffc7a6',
          DEFAULT: '#f0a07a',
          dark: '#c8714d',
          deep: '#934825',
          glow: 'rgba(240, 160, 122, 0.35)',
        },
        text: {
          primary: '#f6e9e1',
          muted: '#b99a8b',
          dim: '#856c60',
        },
        accent: {
          green: '#25D366', // WhatsApp
          google: '#4285F4',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'copper-sm': '0 0 15px -3px rgba(240, 160, 122, 0.25)',
        'copper-md': '0 0 25px -4px rgba(240, 160, 122, 0.35)',
        'copper-lg': '0 0 50px -5px rgba(240, 160, 122, 0.45)',
        'copper-glow': '0 0 35px 2px rgba(240, 160, 122, 0.3)',
      },
      backgroundImage: {
        'copper-gradient': 'linear-gradient(135deg, #ffc7a6 0%, #f0a07a 50%, #c8714d 100%)',
        'copper-gradient-hover': 'linear-gradient(135deg, #ffe0cf 0%, #ffa782 50%, #d87d57 100%)',
        'copper-gradient-subtle': 'linear-gradient(180deg, rgba(240, 160, 122, 0.15) 0%, rgba(200, 113, 77, 0.05) 100%)',
        'card-dark': 'linear-gradient(145deg, rgba(25, 18, 14, 0.8) 0%, rgba(10, 7, 6, 0.95) 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'shine': 'shine 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px 2px rgba(240, 160, 122, 0.25)' },
          '50%': { boxShadow: '0 0 40px 6px rgba(240, 160, 122, 0.55)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}
