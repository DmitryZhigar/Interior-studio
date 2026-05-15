<script setup lang="ts">
import ProjectCard from '~/components/ProjectCard.vue'

const { t } = useLocale()
const { data: projects } = await useFetch('/api/projects')

const allCategory = '__all'
const activeCategory = ref(allCategory)

const categories = computed(() => {
  if (!projects.value) {
    return [
      {
        id: allCategory,
        label: t('projects.all')
      }
    ]
  }

  const existingCategories = projects.value
    .filter(project => project.category)
    .map(project => project.category!.name)

  return [
    {
      id: allCategory,
      label: t('projects.all')
    },
    ...[...new Set(existingCategories)].map(category => ({
      id: category,
      label: category
    }))
  ]
})

const filteredProjects = computed(() => {
  if (!projects.value) {
    return []
  }

  if (activeCategory.value === allCategory) {
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
  <div class="min-h-screen bg-[var(--bg-main)] text-white p-10">
    <div class="mb-20">
      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
        {{ t('projects.eyebrow') }}
      </p>

      <h1 class="text-6xl font-black">
        {{ t('projects.title') }}
      </h1>
    </div>

    <div class="flex flex-wrap gap-4 mb-16">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="[
          'px-6 py-3 rounded-full transition border',
          activeCategory === category.id
            ? 'bg-white text-black border-white'
            : 'border-[var(--border-color)] text-white hover:bg-white hover:text-black'
        ]"
        @click="activeCategory = category.id"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="columns-1 md:columns-2 xl:columns-3 gap-10 space-y-10">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>
