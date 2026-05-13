<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})
</script>

<template>

  <div class="min-h-screen bg-black text-white p-10">

    <div class="flex items-center justify-between mb-16">

      <div>

        <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
          CMS
        </p>

        <h1 class="text-6xl font-black">
          Categories
        </h1>

      </div>

      <button
        class="bg-white text-black px-8 py-4 rounded-full font-semibold"
      >
        Add Category
      </button>

    </div>

  </div>

</template>