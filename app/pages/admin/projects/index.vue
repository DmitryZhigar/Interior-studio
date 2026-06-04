<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

const { data: projects, refresh } = await useFetch('/api/projects')

const error = ref('')
const isDeleting = ref(false)
const projectToDelete = ref<any | null>(null)

const askDeleteProject = (project: any) => {
  projectToDelete.value = project
}

const cancelDeleteProject = () => {
  if (!isDeleting.value) {
    projectToDelete.value = null
  }
}

const deleteProject = async () => {
  if (!projectToDelete.value) {
    return
  }

  try {
    isDeleting.value = true

    await $fetch(`/api/projects/${projectToDelete.value.id}`, {
      method: 'DELETE'
    })

    await refresh()
    projectToDelete.value = null
  } catch (requestError: any) {
    error.value = getRequestErrorMessage(requestError, 'Failed to delete project')
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>

  <div class="min-h-screen bg-[var(--bg-main)] text-white p-10">

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

      <p
        v-if="error"
        class="mb-8 text-sm text-red-400"
      >
        {{ error }}
      </p>

<div class="space-y-6">

  <div
    v-for="project in projects"
    :key="project.id"
    class="border border-[var(--border-color)] rounded-3xl p-6 flex items-center justify-between"
  >

    <div class="flex items-center gap-6">

      <img
        :src="project.coverImage"
        class="w-24 h-24 object-cover rounded-2xl"
      >

      <div>

        <p class="uppercase tracking-[0.3em] text-xs text-neutral-500 mb-2">
          {{ project.category?.name }}
        </p>

        <h2 class="text-3xl font-bold">
          {{ project.title }}
        </h2>

      </div>

    </div>
    <div class="ml-auto flex items-center gap-4">

      <NuxtLink
        :to="`/admin/projects/${project.id}`"
        class="px-6 py-3 border border-white/20 rounded-full hover:border-white transition"
      >
        Edit
      </NuxtLink>

      <button
        @click="askDeleteProject(project)"
        class="px-6 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
      >
        Delete
      </button>

    </div>

  </div>

</div>
    </div>

  </div>

  <ConfirmDialog
    :open="Boolean(projectToDelete)"
    title="Delete project?"
    :message="`Project '${projectToDelete?.title || ''}' will be deleted completely.`"
    confirm-label="Да"
    cancel-label="Нет"
    :pending="isDeleting"
    @confirm="deleteProject"
    @cancel="cancelDeleteProject"
  />

</template>
