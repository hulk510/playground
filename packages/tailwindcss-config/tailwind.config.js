/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/sandbox/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/playground/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
