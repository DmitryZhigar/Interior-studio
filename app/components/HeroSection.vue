<script setup lang="ts">
const images = [
'/hero-1.jpg',
'/hero-2.jpg',
'/hero-3.jpg'
]
const current = ref(0)
onMounted(() => {
setInterval(() => {
current.value = (current.value + 1) % images.length
}, 6000)
})
</script>
<template>
<section
class="relative h-screen overflow-hidden"
>
<!-- BACKGROUND IMAGES -->
<TransitionGroup name="fade">
<img
v-for="(image, index) in images"
v-show="index === current"
:key="image"
:src="image"
class="absolute inset-0 w-full h-full object-cover scale-105 animateslow-zoom"
/>
</TransitionGroup>
<!-- DARK OVERLAY -->
<div
class="absolute inset-0 bg-black/50"
1
/>
<!-- GRADIENT -->
<div
class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-
[#0b0b0c]"
/>
<!-- GLOW -->
<div
class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d6c2a2]/10 blur-
[160px] rounded-full"
/>
<!-- CONTENT -->
<div
class="relative z-10 h-full flex items-end"
>
<div
class="max-w-7xl mx-auto px-6 lg:px-10 pb-24 w-full"
>
<div
class="max-w-5xl"
>
<p
class="uppercase tracking-[0.5em] text-neutral-400 mb-8"
>
 Interior Design Studio
</p>
<h1
class="text-6xl md:text-8xl lg:text-[140px] leading-[0.9] fontblack mb-10"
>
 Spaces<br />
 that inspire.
</h1>
<p
class="max-w-2xl text-lg md:text-xl text-neutral-300 leadingrelaxed mb-12"
>
 Luxury residential and commercial interiors
 designed with architectural precision,
 emotional depth, and timeless aesthetics.
2
</p>
<div
class="flex flex-wrap gap-6"
>
<NuxtLink
to="/projects"
class="px-10 py-5 bg-white text-black rounded-full fontsemibold hover:scale-105 transition"
>
 View Projects
</NuxtLink>
<NuxtLink
to="/contact"
class="px-10 py-5 border border-white/20 rounded-full hover:bgwhite/10 transition"
>
 Contact Studio
</NuxtLink>
</div>
</div>
</div>
</div>
<!-- SCROLL INDICATOR -->
<div
class="absolute bottom-10 right-10 flex flex-col items-center gap-4
text-neutral-400"
>
<div
class="w-px h-20 bg-white/20"
/>
<p
class="uppercase tracking-[0.4em] text-xs rotate-90 origin-center"
>
 Scroll
</p>
</div>
</section>
3
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
opacity: 0;
}
@keyframes slowZoom {
0% {
transform: scale(1);
}
100% {
transform: scale(1.08);
}
}
.animate-slow-zoom {
animation: slowZoom 8s ease forwards;
}
</style>
