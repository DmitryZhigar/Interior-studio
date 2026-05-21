export default defineNuxtConfig({

  compatibilityDate: '2026-05-12',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],

  vite: {
    optimizeDeps: {
      include: ['gsap']
    }
  },
  runtimeConfig: {
    adminLogin: '',
    adminPassword: '',
    adminSessionSecret: '',
    resendApiKey: ''
  }
})
