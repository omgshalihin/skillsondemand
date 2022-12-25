/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
  ],
  plugins: [
    // eslint-disable-next-line global-require
    require('flowbite/plugin'),
  ],
  theme: {
    colors: {
      blue: '#0B4F6C',
      cyan: '#01BAEF',
      white: '#FBFBFF',
      primary: '#80858B',
      black: '#040F16',
    },
  },
};
