<script setup lang="ts">
const { t, phoneNumber } = useLocale()
</script>

<template>
  <footer class="border-t border-[var(--border-color)] mt-40">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <p class="text-3xl font-black tracking-tight mb-6">
            INTERIOR
          </p>

          <p class="text-neutral-500 leading-relaxed max-w-sm">
            {{ t('footer.brandText') }}
          </p>
        </div>

        <div>
          <p class="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-6">
            {{ t('footer.contact') }}
          </p>

          <div class="space-y-4">
            <p class="text-lg">
              hello@studio.com
            </p>

            <p class="text-lg">
              {{ phoneNumber }}
            </p>

            <p class="text-lg text-neutral-400">
              {{ t('contact.locationValue') }}
            </p>
          </div>
        </div>

        <div>
          <p class="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-6">
            {{ t('footer.navigation') }}
          </p>

          <div class="flex flex-col gap-4">
            <NuxtLink
              to="/"
              class="hover:text-neutral-400 transition"
            >
              {{ t('nav.home') }}
            </NuxtLink>

            <NuxtLink
              to="/projects"
              class="hover:text-neutral-400 transition"
            >
              {{ t('nav.projects') }}
            </NuxtLink>

            <NuxtLink
              to="/studio"
              class="hover:text-neutral-400 transition"
            >
              {{ t('nav.studio') }}
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="hover:text-neutral-400 transition"
            >
              {{ t('nav.contact') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="border-t border-[var(--border-color)] mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
        <p>
          {{ t('footer.rights') }}
        </p>

        <p>
          {{ t('footer.precision') }}
        </p>
      </div>
    </div>
  </footer>
</template>
