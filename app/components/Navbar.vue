<script setup lang="ts">
const route = useRoute()
const { t, phoneNumber, phoneHref } = useLocale()

const authAdmin = useCookie('admin-auth')
const isAuthenticated = computed(() => !!authAdmin.value)
const isOpen = ref(false)

const logout = async () => {
  authAdmin.value = null
  isOpen.value = false

  await navigateTo('/admin/login')
}

const navLinkClass = (isActive: boolean) =>
  isActive
    ? 'text-white'
    : 'text-neutral-500 hover:text-white'
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/70 backdrop-blur-xl border-b border-[var(--border-color)]"
  >
    <div class="max-w-7xl mx-auto px-4 lg:px-10">
      <div class="h-24 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 xl:grid-cols-[minmax(280px,1fr)_auto_minmax(180px,1fr)]">
        <div class="flex min-w-0 items-center gap-3 justify-self-start">
          <NuxtLink
            to="/"
            class="shrink-0 text-xl font-black tracking-tight sm:text-2xl"
          >
            INTERIOR
          </NuxtLink>

          <a
            :href="phoneHref"
            :aria-label="phoneNumber"
            class="inline-flex h-11 w-16 shrink-0 items-center justify-center rounded-md border border-[var(--border-color)] bg-white/[0.04] px-2 text-[11px] font-bold text-white shadow-sm transition hover:border-white/20 hover:bg-white/10 sm:h-12 sm:w-[170px] sm:px-3 sm:text-sm"
          >
            <span class="hidden sm:inline">{{ phoneNumber }}</span>
            <span class="sm:hidden">+995</span>
          </a>
        </div>

        <nav class="hidden items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] xl:flex">
          <NuxtLink
            to="/"
            :class="['min-w-24 text-center transition', navLinkClass(route.path === '/')]"
          >
            {{ t('nav.home') }}
          </NuxtLink>

          <NuxtLink
            to="/projects"
            :class="['min-w-24 text-center transition', navLinkClass(route.path.includes('/projects'))]"
          >
            {{ t('nav.projects') }}
          </NuxtLink>

          <NuxtLink
            to="/studio"
            :class="['min-w-24 text-center transition', navLinkClass(route.path === '/studio')]"
          >
            {{ t('nav.studio') }}
          </NuxtLink>

          <NuxtLink
            to="/contact"
            :class="['min-w-24 text-center transition', navLinkClass(route.path === '/contact')]"
          >
            {{ t('nav.contact') }}
          </NuxtLink>
        </nav>

        <div class="flex min-w-0 items-center justify-end gap-2 justify-self-end sm:gap-3">
          <LanguageSwitcher />

          <div class="hidden items-center gap-4 text-xs uppercase tracking-[0.18em] xl:flex">
            <NuxtLink
              v-if="isAuthenticated"
              to="/admin/"
              class="min-w-28 text-center text-neutral-500 transition hover:text-white"
            >
              {{ t('nav.manage') }}
            </NuxtLink>

            <button
              v-if="isAuthenticated"
              class="min-w-20 text-center text-neutral-500 transition hover:text-white"
              @click="logout"
            >
              {{ t('nav.logout') }}
            </button>

            <NuxtLink
              v-else
              to="/admin/login"
              class="min-w-20 text-center text-neutral-500 transition hover:text-white"
            >
              {{ t('nav.login') }}
            </NuxtLink>
          </div>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border-color)] text-white xl:hidden"
            :aria-label="t('nav.menu')"
            @click="isOpen = !isOpen"
          >
            <span class="flex flex-col gap-1.5">
              <span class="block h-px w-5 bg-white" />
              <span class="block h-px w-5 bg-white" />
              <span class="block h-px w-5 bg-white" />
            </span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isOpen"
      class="xl:hidden border-t border-[var(--border-color)] bg-[var(--bg-main)]"
    >
      <nav class="flex flex-col p-6 gap-6 text-lg">
        <NuxtLink
          to="/"
          @click="isOpen = false"
        >
          {{ t('nav.home') }}
        </NuxtLink>

        <NuxtLink
          to="/projects"
          @click="isOpen = false"
        >
          {{ t('nav.projects') }}
        </NuxtLink>

        <NuxtLink
          to="/studio"
          @click="isOpen = false"
        >
          {{ t('nav.studio') }}
        </NuxtLink>

        <NuxtLink
          to="/contact"
          @click="isOpen = false"
        >
          {{ t('nav.contact') }}
        </NuxtLink>

        <NuxtLink
          v-if="isAuthenticated"
          to="/admin/"
          @click="isOpen = false"
        >
          {{ t('nav.manage') }}
        </NuxtLink>

        <button
          v-if="isAuthenticated"
          class="text-left"
          @click="logout"
        >
          {{ t('nav.logout') }}
        </button>

        <NuxtLink
          v-else
          to="/admin/login"
          @click="isOpen = false"
        >
          {{ t('nav.login') }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
