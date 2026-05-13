<template>

  <footer
    class="border-t border-white/10 mt-40"
  >

    <div
      class="max-w-7xl mx-auto px-6 lg:px-10 py-20"
    >

      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-16"
      >

        <!-- BRAND -->
        <div>

          <p
            class="text-3xl font-black tracking-tight mb-6"
          >
            INTERIOR
          </p>

          <p
            class="text-neutral-500 leading-relaxed max-w-sm"
          >
            Premium interior design studio creating
            timeless residential and commercial spaces.
          </p>

        </div>

        <!-- CONTACT -->
        <div>

          <p
            class="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-6"
          >
            Contact
          </p>

          <div class="space-y-4">

            <p class="text-lg">
              hello@studio.com
            </p>

            <p class="text-lg">
              +420 123 456 789
            </p>

            <p class="text-lg text-neutral-400">
              Prague, Czech Republic
            </p>

          </div>

        </div>

        <!-- NAV -->
        <div>

          <p
            class="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-6"
          >
            Navigation
          </p>

          <div
            class="flex flex-col gap-4"
          >

            <NuxtLink
              to="/"
              class="hover:text-neutral-400 transition"
            >
              Home
            </NuxtLink>

            <NuxtLink
              to="/projects"
              class="hover:text-neutral-400 transition"
            >
              Projects
            </NuxtLink>

            <NuxtLink
              to="/studio"
              class="hover:text-neutral-400 transition"
            >
              Studio
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="hover:text-neutral-400 transition"
            >
              Contact
            </NuxtLink>

          </div>

        </div>

      </div>

      <!-- BOTTOM -->

      <div
        class="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500"
      >

        <p>
          © 2026 INTERIOR Studio. All rights reserved.
        </p>

        <p>
          Designed with precision.
        </p>

      </div>

    </div>

  </footer>

</template>