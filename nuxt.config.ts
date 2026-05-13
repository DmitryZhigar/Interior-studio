export default defineNuxtConfig({

  compatibilityDate: '2026-05-12',

  modules: ['@nuxtjs/tailwindcss'],

  vite: {
    optimizeDeps: {
      include: ['gsap']
    }
  },
    runtimeConfig: {

    adminLogin: process.env.ADMIN_LOGIN,

    adminPassword: process.env.ADMIN_PASSWORD,

    adminSessionSecret: process.env.ADMIN_SESSION_SECRET

    }
})