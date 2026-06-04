<script setup lang="ts">
import { ref } from 'vue'
const router = useRouter()
const { data: categories } = await useFetch('/api/categories')
definePageMeta({
  middleware: 'admin'
})

const form = ref({
  title: '',
  slug: '',
  description: '',
  coverImage: '',
  categoryId: ''
})
const galleryImages = ref<string[]>([])
const error = ref('')
const isSaving = ref(false)
const isUploading = ref(false)

const createProject = async () => {
  error.value = ''

  try {
    isSaving.value = true

    const project = await $fetch<{ id: number }>('/api/projects/create', {
      method: 'POST',
      body: form.value
    })

    for (const image of galleryImages.value) {
      await $fetch(`/api/projects/${project.id}/images`, {
        method: 'POST',
        body: {
          url: image
        }
      })
    }

    router.push('/admin/projects')
  } catch (requestError: any) {
    error.value = requestError?.statusMessage || 'Failed to create project'
  } finally {
    isSaving.value = false
  }


}
const uploadImage = async (event: Event) => {
  error.value = ''

  const target = event.target as HTMLInputElement

  if (!target.files?.length) {
    return
  }

  const file = target.files[0]!

  const formData = new FormData()

  formData.append('file', file)

  try {
    isUploading.value = true

    const response = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData
    })

    form.value.coverImage = response.url
  } catch (requestError: any) {
    error.value = requestError?.statusMessage || 'Failed to upload cover image'
  } finally {
    isUploading.value = false
  }

}

const uploadGalleryImage = async (event: Event) => {
  error.value = ''

  const target = event.target as HTMLInputElement

  if (!target.files?.length) {
    return
  }

  const file = target.files[0]!

  const formData = new FormData()

  formData.append('file', file)

  try {
    isUploading.value = true

    const response = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData
    })

    galleryImages.value.push(response.url)
  } catch (requestError: any) {
    error.value = requestError?.statusMessage || 'Failed to upload gallery image'
  } finally {
    isUploading.value = false
  }

}
</script>

<template>

  <div class="min-h-screen bg-[var(--bg-main)] text-white p-10">

    <div class="max-w-3xl mx-auto">

      <div class="mb-16">

        <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
          Admin
        </p>

        <h1 class="text-5xl font-black">
          Create Project
        </h1>

      </div>

      <div class="space-y-6">

        <input
          v-model="form.title"
          type="text"
          placeholder="Project title"
          class="w-full bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
        />

        <input
          v-model="form.slug"
          type="text"
          placeholder="Slug"
          class="w-full bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="6"
          class="w-full bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
        />

        <input
            type="file"
            @change="uploadImage"
            />
        <input
          type="file"
          multiple
          @change="uploadGalleryImage"
        />
        <select
          v-model="form.categoryId"
          class="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
        >

          <option value="">
            No category
          </option>

          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>

        </select>

        <button
          @click="createProject"
          :disabled="isSaving || isUploading"
          class="px-8 py-4 bg-white text-black rounded-full font-semibold hover:opacity-80 transition"
        >
          {{ isSaving ? 'Creating' : 'Create Project' }}
        </button>

        <p
          v-if="error"
          class="text-sm text-red-400"
        >
          {{ error }}
        </p>

      </div>

    </div>

  </div>

</template>
