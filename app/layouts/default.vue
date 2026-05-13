<template>

  <div class="bg-[var(--bg-main)] text-[var(--text-primary)] min-h-screen">

    <!-- NAVBAR -->
    <Navbar />

    <!-- PAGE -->
    <main class="pt-32 px-4 lg:px-10 pb-20">

      <slot />

    </main>
    <Footer />
  </div>

</template>