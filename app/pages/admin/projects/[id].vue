<script setup lang="ts">

definePageMeta({
  middleware: 'admin'
})

const route = useRoute()

const router = useRouter()

const { data: categories } = await useFetch('/api/categories')

const { data: project } = await useFetch<any>(
  `/api/projects/${route.params.id}`
)
const form = ref({
  title: '',
  slug: '',
  description: '',
  coverImage: '',
  categoryId: ''
})
const galleryImages = ref<string[]>([])

watchEffect(() => {

  if (!project.value) {
    return
  }

  form.value = {

    title: project.value?.title || '',

    slug: project.value?.slug || '',

    description: project.value?.description || '',

    coverImage: project.value?.coverImage || '',

    categoryId: project.value?.categoryId || ''

  }

  galleryImages.value =
    project.value.images?.map((x: any) => x.url) || []
})

const updateProject = async () => {

    await $fetch(`/api/projects/${route.params.id}.update`, {
        method: 'PUT',
        body: {
            ...form.value,
            galleryImages: galleryImages.value
        }
    })

  router.push('/admin/projects')

}
</script>

<template>

  <div class="min-h-screen bg-black text-white p-10">

    <div class="max-w-3xl mx-auto">

      <div class="mb-16">

        <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
          Admin
        </p>

        <h1 class="text-5xl font-black">
          Edit Project
        </h1>

      </div>

      <div class="space-y-6">

        <input
          v-model="form.title"
          type="text"
          placeholder="Project title"
          class="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none"
        />

        <input
          v-model="form.slug"
          type="text"
          placeholder="Slug"
          class="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="6"
          class="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none"
        />

        <input
          v-model="form.coverImage"
          type="text"
          placeholder="Cover image URL"
          class="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none"
        />
<div class="space-y-4">

  <div
    v-for="(image, index) in galleryImages"
    :key="index"
    class="space-y-3 border border-white/10 rounded-3xl p-4"
  >

    <input
      v-model="galleryImages[index]"
      type="text"
      class="w-full bg-transparent border border-white/10 rounded-3xl px-6 py-4 outline-none"
    />

    <img
      :src="galleryImages[index]"
      class="w-40 h-40 object-cover rounded-2xl border border-white/10"
    />

    <button
      @click="galleryImages.splice(index, 1)"
      class="text-red-500 text-sm"
    >
      Remove
    </button>

  </div>

  <button
    @click="galleryImages.push('')"
    class="px-6 py-3 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition"
  >
    Add Gallery Image
  </button>

</div>
        <select
          v-model="form.categoryId"
          class="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none"
        >

          <option disabled value="">
            Select category
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
          @click="updateProject"
          class="px-8 py-4 bg-white text-black rounded-full font-semibold hover:opacity-80 transition"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>

</template>