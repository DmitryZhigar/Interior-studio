<script setup lang="ts">

definePageMeta({
  middleware: 'admin'
})

const { data: categories, refresh } = await useFetch('/api/categories')

const form = ref({
  name: '',
  description: ''
})

const createCategory = async () => {

  if (!form.value.name) {
    return
  }

  await $fetch('/api/categories/create', {
    method: 'POST',
    body: form.value
  })

  form.value.name = ''

  refresh()

}

const deleteCategory = async (id: number) => {

  await $fetch(`/api/categories/${id}`, {
    method: 'DELETE'
  })

  refresh()

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
          Categories
        </h1>

      </div>

      <div class="flex gap-4 mb-10">

        <input
          v-model="form.name"
          type="text"
          placeholder="Category name"
          class="flex-1 bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
        />
        <textarea
          v-model="form.description"
          placeholder="Category description"
          rows="4"
          class="w-full bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
        />
        <button
          @click="createCategory"
          class="px-8 bg-white text-black rounded-2xl font-semibold"
        >
          Add
        </button>

      </div>

      <div class="space-y-4">

        <div
  v-for="category in categories"
  :key="category.id"
  class="border border-[var(--border-color)] rounded-2xl p-6 flex items-start justify-between"
>

  <div>

    <h3 class="text-xl font-semibold mb-2">
      {{ category.name }}
    </h3>

    <p
      v-if="category.description"
      class="text-neutral-500 text-sm max-w-xl"
    >
      {{ category.description }}
    </p>

  </div>

  <button
    @click="deleteCategory(category.id)"
    class="text-red-500 hover:text-red-400"
  >
    Delete
  </button>

</div>
      </div>

    </div>

  </div>

</template>