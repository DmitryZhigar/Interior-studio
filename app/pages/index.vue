<script setup lang="ts">
//import { projects } from '~/data/projects'
const { data: projects } = await useFetch('/api/projects')
import { useReveal } from '~/composables/useReveal'
const heroRef = ref<HTMLElement | null>(null)

const projectsRef = ref<HTMLElement | null>(null)
onMounted(() => {

  if (heroRef.value) {
    useReveal(heroRef.value)
  }

  if (projectsRef.value) {
    useReveal(projectsRef.value)
  }

})
</script>

<template>

  <div class="max-w-7xl mx-auto">

    <!-- HERO -->
    <section
        ref="heroRef"
        class="min-h-[90vh] flex flex-col justify-center"
        >

      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-8">
        Interior Studio
      </p>

      <h1
        class="text-6xl md:text-8xl lg:text-[140px] font-black leading-[0.9] mb-10"
      >
        Cinematic<br />
        Interior<br />
        Design
      </h1>

      <div class="max-w-2xl">

        <p class="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-10">
          Premium interiors for hotels, offices,
          residential and hospitality environments.
        </p>

        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-semibold hover:scale-105 transition"
        >
          View Projects
        </NuxtLink>

      </div>

    </section>

    <!-- FEATURED -->
    <section
        ref="projectsRef"
        class="pb-32"
        >

      <div class="flex items-end justify-between mb-16">

        <div>

          <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
            Selected Work
          </p>

          <h2 class="text-5xl font-black">
            Featured Projects
          </h2>

        </div>

        <NuxtLink
          to="/projects"
          class="hidden md:block text-neutral-400 hover:text-white transition"
        >
          View All →
        </NuxtLink>

      </div>

      <!-- GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <NuxtLink
          v-for="project in projects?.slice(0, 2)"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          class="group block"
        >

          <div class="overflow-hidden rounded-[36px] mb-6">

            <img
              :src="project.coverImage"
              class="w-full h-[700px] object-cover group-hover:scale-105 transition duration-700"
            />

          </div>

          <p class="uppercase tracking-[0.3em] text-neutral-500 mb-3 text-sm">
            {{ project.category.name }}
          </p>

          <h3 class="text-4xl font-bold">
            {{ project.title }}
          </h3>

        </NuxtLink>

      </div>

    </section>

  </div>

</template>