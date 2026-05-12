<script setup lang="ts">
const { data: projects, refresh } = await useFetch('/api/projects')

const deleteProject = async (id: number) => {

  await $fetch(`/api/projects/${id}`, {
    method: 'DELETE'
  })

  refresh()
}
</script>

<template>

  <div class="min-h-screen bg-black text-white p-10">

    <div class="max-w-5xl mx-auto">

      <div class="flex items-center justify-between mb-16">

        <div>
          <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
            Admin
          </p>

          <h1 class="text-5xl font-black">
            Projects
          </h1>
        </div>

        <NuxtLink
          to="/admin/projects/create"
          class="px-8 py-4 bg-white text-black rounded-full font-semibold"
        >
          Create Project
        </NuxtLink>

      </div>
<div class="space-y-6">

  <div
    v-for="project in projects"
    :key="project.id"
    class="border border-white/10 rounded-3xl p-6 flex items-center justify-between"
  >

    <div class="flex items-center gap-6">

      <img
        :src="project.coverImage"
        class="w-24 h-24 object-cover rounded-2xl"
      >

      <div>

        <p class="uppercase tracking-[0.3em] text-xs text-neutral-500 mb-2">
          {{ project.category.name }}
        </p>

        <h2 class="text-3xl font-bold">
          {{ project.title }}
        </h2>

      </div>

    </div>

    <button
      @click="deleteProject(project.id)"
      class="px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
    >
      Delete
    </button>

  </div>

</div>
    </div>

  </div>

</template>