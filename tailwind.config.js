/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
         prata: ['Prata', 'serif'],
    },
    
     animation: {
        fadeInSlide: 'fadeInSlide 0.5s ease forwards',
         'fade-in': 'fadeIn 0.4s ease-out',
         'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'slide-in-left': 'slideInLeft 1s ease-out both',
        'slide-in-right': 'slideInRight 1s ease-out both',
        'fade-up': 'fadeUp 0.9s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        
      },
      keyframes: {
        fadeInSlide: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
         fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
         fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        
      },
  },
  plugins: [],
  }
  
}