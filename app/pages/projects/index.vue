<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '~/components/ProjectCard.vue'

const { data: projects } = await useFetch('/api/projects')

const activeCategory = ref('All')

const { data: categoryItems } = await useFetch('/api/categories')

const categories = computed(() => {

  if (!projects.value) {
    return ['All']
  }

  const existingCategories = projects.value
    .filter(project => project.category)
    .map(project => project.category.name)

  return [
    'All',
    ...new Set(existingCategories)
  ]

})
const filteredProjects = computed(() => {

  if (!projects.value) {
    return []
  }

  if (activeCategory.value === 'All') {
    return projects.value
  }

  return projects.value.filter(
  project =>
    project.category &&
    project.category.name === activeCategory.value
)

})
</script>
<template>
  <div class="min-h-screen bg-black text-white p-10">

    <div class="mb-20">
      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
        Portfolio
      </p>

      <h1 class="text-6xl font-black">
        Projects
      </h1>
    </div>

    <!-- FILTERS -->
    <div class="flex flex-wrap gap-4 mb-16">

      <button
        v-for="category in categories"
        :key="category"
        @click="activeCategory = category"
        :class="[
          'px-6 py-3 rounded-full transition border',
          activeCategory === category
            ? 'bg-white text-black border-white'
            : 'border-white/10 text-white hover:bg-white hover:text-black'
        ]"
      >
        {{ category }}
      </button>

    </div>

    <!-- GRID -->
      <div class="columns-1 md:columns-2 xl:columns-3 gap-10 space-y-10">

        <NuxtLink
          v-for="project in filteredProjects"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          class="block"
        >

          <ProjectCard
            :project="project"
          />

        </NuxtLink>

    </div>

  </div>
</template>