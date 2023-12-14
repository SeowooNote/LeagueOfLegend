/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'lol-header-black' : '#111',
        'lol-header-text-color' : '#f9f9f9',
        'lol-text-color1' : '#F0E6D2',
        'lol-text-color2' : '#A09B8C',
        'lol-header-gray-hover' : '#e5e7eb',
        'lol-sky-blue' : 'rgb(11, 198, 227)',
        'lol-sky-blue-hover' : 'rgba(11, 198, 227, 0.5)',
        'lol-dark-blue' : '#091428',
        'lol-dark-blue-hover' : 'rgba(9, 20, 40, 0.1)',
        'lol-gold' : '#F0E6D2',
        'lol-gold1': '#C8AA6E',
        'lol-gold2': '#785A28',
      },
      width: {
        'lol-main-button' : '195px',
        'lol-main-logo-width' : '600px',
      },
      height: {
        'lol-main-button' : '56px',
      },
      transitionDuration: {
        'lol-animation-duration' : '1000ms',
      },
      transitionDelay: {
        'lol-animation-delay' : '1400ms',
      },
      transitionTimingFunction: {
        'lol-animation-timing-function' : 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      margin: {
        '10px' : '10px',
        '15px' : '15px',
        '20px' : '20px'
      }
    },
  },
  plugins: [],
}

