/**
 * Makmai — Tailwind config snippet
 * Drop the `theme.extend` block into your existing tailwind.config.js.
 *
 * Fonts: load Bai Jamjuree + IBM Plex Sans Thai Looped via Google Fonts
 * in your <head> or index.css (see colors_and_type.css for the @import).
 */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#EAF3EE',
          100: '#CFE4D8',
          200: '#9CC8B0',
          300: '#6BAC89',
          400: '#3B9162',
          500: '#006030',   // brand primary — from logo
          600: '#00532A',
          700: '#004523',
          800: '#00351B',
          900: '#002413',
          DEFAULT: '#006030',
        },
        bark: {
          50:  '#F7EFE3',
          100: '#EAD3B0',
          200: '#D0A87A',
          300: '#A87445',
          400: '#7E4A1A',
          500: '#603000',   // brand secondary — from logo
          600: '#532900',
          700: '#432100',
          800: '#331900',
          900: '#221100',
          DEFAULT: '#603000',
        },
        citrus: {
          50:  '#FCF1E6',
          100: '#FADBBE',
          200: '#F5B785',
          300: '#EE934E',
          400: '#E07A2D',   // accent
          500: '#C8651D',
          600: '#A55117',
          DEFAULT: '#E07A2D',
        },
        berry: {
          400: '#C9514E',
          500: '#B33A3A',
          600: '#962A2A',
          DEFAULT: '#B33A3A',
        },
        cream: {
          50:  '#FDFAF2',   // page bg
          100: '#FAF6EC',   // card surface
          200: '#F4ECD8',
          300: '#E8DDC2',
          DEFAULT: '#FAF6EC',
        },
        sand:  { 400: '#C9BBA0', 500: '#A89A82' },
        ink:   {
          600: '#6B6357', // muted
          700: '#4A4339', // secondary
          800: '#2A2620', // body
          900: '#1A1815', // headline
          DEFAULT: '#1A1815',
        },
        night: { 600: '#3A3530', 700: '#2A2620', 800: '#1A1812', 900: '#11100C' },
      },
      fontFamily: {
        display: ['"Bai Jamjuree"', '"IBM Plex Sans Thai Looped"', 'system-ui', 'sans-serif'],
        sans:    ['"IBM Plex Sans Thai Looped"', '"Bai Jamjuree"', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px', '2xl': '32px', pill: '999px',
      },
      boxShadow: {
        // warm-tinted shadows, never blue-gray
        xs: '0 1px 2px rgb(64 40 16 / 0.06)',
        sm: '0 2px 6px rgb(64 40 16 / 0.06), 0 1px 2px rgb(64 40 16 / 0.04)',
        md: '0 6px 18px rgb(64 40 16 / 0.08), 0 2px 4px rgb(64 40 16 / 0.04)',
        lg: '0 16px 36px rgb(64 40 16 / 0.10), 0 4px 10px rgb(64 40 16 / 0.05)',
        xl: '0 24px 60px rgb(64 40 16 / 0.14), 0 8px 16px rgb(64 40 16 / 0.06)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
};
