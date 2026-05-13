<template>

  <div class="bg-[var(--bg-main)] text-[var(--text-primary)] min-h-screen relative overflow-hidden">

    <!-- NOISE TEXTURE -->
   <div class="fixed inset-0 opacity-[0.015] pointer-events-none z-0">

  <div
    class="w-full h-full bg-repeat"
    style="background-image: url('/noise.png')"
  />

</div>

    <!-- CONTENT -->
    <div class="relative z-10">

      <!-- NAVBAR -->
      <Navbar />

      <!-- PAGE -->
      <main class="pt-32 px-4 lg:px-10 pb-20">

        <slot />

      </main>

      <Footer />

    </div>

  </div>

</template>