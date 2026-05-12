<script setup lang="ts">
defineProps({
  project: {
    type: Object,
    required: true
  }
})

const randomHeight = () => {
  const heights = [
    'h-[420px]',
    'h-[520px]',
    'h-[620px]'
  ]

  return heights[Math.floor(Math.random() * heights.length)]
}
</script>

<template>

  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group block mb-10 break-inside-avoid"
  >

    <div class="overflow-hidden rounded-[28px] mb-6">

      <img
        :src="project.coverImage"
        :class="[
          randomHeight(),
          'w-full object-cover transition duration-700 group-hover:scale-[1.03]'
        ]"
      />

    </div>

    <p class="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-3">
      {{ project.category.name }}
    </p>

    <h2 class="text-3xl font-bold mb-4 leading-tight">
      {{ project.title }}
    </h2>

  </NuxtLink>

</template>