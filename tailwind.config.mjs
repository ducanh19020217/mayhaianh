import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        accent: 'var(--color-accent)',
        ink: 'var(--color-ink)',
        bg: 'var(--color-bg)',
        soft: 'var(--color-text-soft)',
        line: 'var(--color-line)'
      },
      fontFamily: {
        serif: ['Fraunces', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter', 'IBM Plex Sans', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      borderRadius: {
        fine: '3px'
      }
    }
  },
  plugins: [typography]
};
