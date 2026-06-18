/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        surface: '#1e293b',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
        textMain: '#f8fafc',
        textMuted: '#94a3b8',
        border: '#334155'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
