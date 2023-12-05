/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#413C69', 
        'currency-bars': '#585480', 
        'footer-nav': '#585480', 
        'dropdown-item': 'rgb(226 232 240)',
        'done-and-cancel': 'rgb(226 232 240)',
        'table-body': 'rgb(226 232 240)',
        'table-header': 'rgb(226 232 240)',
        'alert': 'rgb(254 226 226)', 
      },
      textColor: {
        'logo-title': '#413C69', 
        'main': 'rgb(226 232 240)',
        'alert': 'rgb(185 28 28)',
        'table-header': 'rgb(107 114 128)',
      },
      borderColor: {
        'main': 'rgb(226 232 240)',
        'dropdown-item': 'rgb(226 232 240)',
        'alert': 'rgb(185 28 28)',
        'table-header': 'rgb(107 114 128)',
        'table': 'rgb(226 232 240)',
      },
      fill: {
        'arrow-and-pencil': 'rgb(226 232 240)',
        'cancel': '#dc2626',
        'disabled-btn': '#6b7280',
        'success-btn': '#22c55e',
      }
    },
  },
  plugins: [],
}