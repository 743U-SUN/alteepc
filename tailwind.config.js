/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // 青
        secondary: '#10B981',  // 緑
        accent: '#F59E0B',     // オレンジ
        warning: '#EF4444',    // 赤
        background: '#F3F4F6', // ライトグレー
      },
    },
  },
  plugins: [],
}
