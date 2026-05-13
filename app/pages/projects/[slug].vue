<script setup lang="ts">

const route = useRoute()

const { data: project } = await useFetch(
 `/api/projects/by-slug/${route.params.slug}`
)

</script>

<template>

  <div
    v-if="project"
    class="min-h-screen bg-black text-white"
  >

    <img
      :src="project.coverImage"
      class="w-full h-[500px] object-cover"
    />

    <div class="max-w-6xl mx-auto px-10 py-20">

      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
        {{ project.category.name }}
      </p>

      <p
        v-if="project.category?.description"
        class="text-neutral-400 text-lg leading-relaxed max-w-3xl mb-8"
      >
        {{ project.category.description }}
      </p>

      <h1 class="text-6xl font-black mb-6">
        {{ project.title }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <img
          v-for="image in project.images"
          :key="image.id"
          :src="image.url"
          class="w-full h-[400px] object-cover rounded-3xl"
        />

      </div>

    </div>

  </div>

</template>