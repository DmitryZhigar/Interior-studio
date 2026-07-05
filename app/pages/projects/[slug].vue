<script setup lang="ts">

const route = useRoute()

const { data: project } = await useFetch(
 `/api/projects/by-slug/${route.params.slug}`
)

const projectImages = computed(() => {
  if (!project.value) {
    return []
  }

  const coverImage = project.value.coverImage
  const galleryImages =
    project.value.images
      ?.map((image: any) => image.url)
      .filter((url: string) => url && url !== coverImage) || []

  return [
    coverImage,
    ...galleryImages
  ]
})
</script>

<template>
  <div
    v-if="project"
    class="-mx-4 -mt-32 bg-[var(--bg-main)] text-white lg:-mx-10"
  >
    <section
      v-for="(image, index) in projectImages"
      :key="`${image}-${index}`"
      class="group relative h-screen min-h-[620px] overflow-hidden border-b border-[var(--border-color)]"
    >
      <img
        :src="image"
        :alt="index === 0 ? project.title : `${project.title} ${index}`"
        class="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />

      <div
        v-if="index === 0"
        class="absolute inset-x-0 bottom-0 px-6 pb-12 pt-36 sm:px-10 md:pb-16 lg:px-20"
      >
        <p
          v-if="project.category"
          class="mb-5 text-xs uppercase tracking-[0.4em] text-neutral-300"
        >
          {{ project.category?.name }}
        </p>

        <h1 class="max-w-5xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-8xl">
          {{ project.title }}
        </h1>

        <p
          v-if="project.description"
          class="mt-8 max-w-3xl text-base leading-relaxed text-neutral-200 sm:text-lg"
        >
          {{ project.description }}
        </p>
      </div>

      <div
        v-else
        class="absolute bottom-6 right-6 text-xs font-bold uppercase tracking-[0.3em] text-white/70 sm:bottom-10 sm:right-10"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </div>
    </section>
  </div>
</template>
