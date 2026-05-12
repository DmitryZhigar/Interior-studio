<template>

  <div class="min-h-screen bg-black text-white p-10">

    <div class="mb-16">

      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-4">
        CMS
      </p>

      <h1 class="text-6xl font-black">
        Dashboard
      </h1>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <NuxtLink
        to="/admin/projects"
        class="bg-white/5 border border-white/10 rounded-[32px] p-10 hover:bg-white hover:text-black transition"
      >

        <h2 class="text-3xl font-bold mb-4">
          Projects
        </h2>

        <p class="text-neutral-400">
          Manage portfolio projects
        </p>

      </NuxtLink>

      <NuxtLink
        to="/admin/categories"
        class="bg-white/5 border border-white/10 rounded-[32px] p-10 hover:bg-white hover:text-black transition"
      >

        <h2 class="text-3xl font-bold mb-4">
          Categories
        </h2>

        <p class="text-neutral-400">
          Manage project categories
        </p>

      </NuxtLink>

    </div>

  </div>

</template>