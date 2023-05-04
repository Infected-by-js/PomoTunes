module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary-rgba) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary-rgba) / <alpha-value>)',
      },

      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },

      keyframes: {
        marquee: {
          '0%': {transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-100%)'},
        },
        marquee2: {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0%)'},
        },
      },

      backgroundImage: {
        gradient: 'var(--gradient)',
        'gradient-r': 'var(--gradient-r)',
        'gradient-half': 'var(--gradient-half)',
      },

      flexGrow: {
        2: 2,
        3: 3,
      },

      inset: {
        '1/10': '10%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
    },
  },
  plugins: [],
};
