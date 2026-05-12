export default defineNuxtConfig({

  compatibilityDate: '2026-05-12',

  modules: ['@nuxtjs/tailwindcss'],

  vite: {
    optimizeDeps: {
      include: ['gsap']
    }
  }

})