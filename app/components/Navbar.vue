<script setup lang="ts">

const route = useRoute()

const authAdmin = useCookie('admin-auth')
const isAuthenticated = computed(() => !!authAdmin.value)
const isOpen = ref(false)

const logout = async () => {

  authAdmin.value = null

  await navigateTo('/admin/login')

}

</script>
<template>

  <header
    class="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/70 backdrop-blur-xl border-b border-[var(--border-color)]"
  >

    <div class="max-w-7xl mx-auto px-4 lg:px-10">

      <div class="h-24 flex items-center justify-between">

        <!-- LOGO -->
        <NuxtLink
          to="/"
          class="text-2xl font-black tracking-tight"
        >
          INTERIOR
        </NuxtLink>

        <!-- DESKTOP MENU -->
        <nav class="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em]">
          <NuxtLink
            to="/"
            :class="
              route.path === '/'
                ? 'text-white'
                : 'text-neutral-500 hover:text-white'
            "
          >
            Home
          </NuxtLink>

          <NuxtLink
            to="/projects"
            :class="
              route.path.includes('/projects')
                ? 'text-white'
                : 'text-neutral-500 hover:text-white'
            "
          >
            Projects
          </NuxtLink>

          <NuxtLink
            to="/studio"
            :class="
              route.path === '/studio'
                ? 'text-white'
                : 'text-neutral-500 hover:text-white'
            "
          >
            Studio
          </NuxtLink>

          <NuxtLink
            to="/contact"
            :class="
              route.path === '/contact'
                ? 'text-white'
                : 'text-neutral-500 hover:text-white'
            "
          >
            Contact
          </NuxtLink>
          <NuxtLink
              v-if="isAuthenticated"
              to="/admin/"
              class="text-neutral-500 hover:text-white"
            >
              Manage
            </NuxtLink>

            <button
              v-if="isAuthenticated"
              @click="logout"
              class="text-neutral-500 hover:text-white"
            >
              Logout
            </button>

            <NuxtLink
              v-else
              to="/admin/login"
              class="text-neutral-500 hover:text-white"
            >
              Login
            </NuxtLink>
        </nav>

        <!-- MOBILE BUTTON -->
        <button
          class="md:hidden text-white"
          @click="isOpen = !isOpen"
        >
          Menu
        </button>

      </div>

    </div>

    <!-- MOBILE MENU -->
    <div
      v-if="isOpen"
      class="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-main)]"
    >

      <nav class="flex flex-col p-6 gap-6 text-lg">

        <NuxtLink to="/" @click="isOpen = false">
          Home
        </NuxtLink>

        <NuxtLink to="/projects" @click="isOpen = false">
          Projects
        </NuxtLink>

        <NuxtLink to="/studio" @click="isOpen = false">
          Studio
        </NuxtLink>

        <NuxtLink to="/contact" @click="isOpen = false">
          Contact
        </NuxtLink>
        

      </nav>

    </div>

  </header>

</template>