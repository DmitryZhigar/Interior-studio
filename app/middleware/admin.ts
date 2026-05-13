export default defineNuxtRouteMiddleware((to, from) => {

  if (process.server) {

    const auth = useCookie('admin-auth')

    if (!auth.value) {
      return navigateTo('/admin/login')
    }

  }

})