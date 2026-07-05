<script setup lang="ts">

const route = useRoute()

const { data: project } = await useFetch(
 `/api/projects/by-slug/${route.params.slug}`
)

const galleryImages = computed(() => {
  if (!project.value) {
    return []
  }

  const coverImage = project.value.coverImage

  return project.value.images
    ?.map((image: any) => image.url)
    .filter((url: string) => url && url !== coverImage) || []
})
</script>

<template>
  <div
    v-if="project"
    class="text-white"
  >
    <section class="-mx-4 overflow-hidden lg:-mx-10">
      <div
        class="group relative overflow-hidden border-y border-[var(--border-color)] bg-neutral-950"
      >
        <img
          :src="project.coverImage"
          :alt="project.title"
          class="h-[52vh] min-h-[340px] max-h-[580px] w-full object-cover transition duration-[1000ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    </section>

    <section class="mx-auto mt-14 max-w-5xl sm:mt-20">
      <p
        v-if="project.category"
        class="mb-5 text-xs uppercase tracking-[0.4em] text-neutral-500"
      >
        {{ project.category?.name }}
      </p>

      <h1 class="text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
        {{ project.title }}
      </h1>

      <p
        v-if="project.description"
        class="mt-8 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg"
      >
        {{ project.description }}
      </p>
    </section>

    <section
      v-if="galleryImages.length"
      class="-mx-4 mt-14 lg:-mx-10"
    >
      <div class="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-10">
        <figure
          v-for="(image, index) in galleryImages"
          :key="`${image}-${index}`"
          class="group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-neutral-950 sm:aspect-[16/11] lg:aspect-[16/10]"
        >
          <img
            :src="image"
            :alt="`${project.title} ${index + 1}`"
            loading="lazy"
            class="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </figure>
      </div>
    </section>
  </div>
</template>
