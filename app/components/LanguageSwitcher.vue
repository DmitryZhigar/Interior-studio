<script setup lang="ts">
import type { LocaleCode } from '~/composables/useLocale'

const { currentLocale, locales, setLocale, t } = useLocale()

const isOpen = ref(false)
const switcherRef = ref<HTMLElement | null>(null)

const chooseLocale = (code: LocaleCode) => {
  setLocale(code)
  isOpen.value = false
}

const closeOnOutsideClick = (event: MouseEvent) => {
  if (!switcherRef.value?.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeOnOutsideClick)
})
</script>

<template>
  <div
    ref="switcherRef"
    class="relative"
    dir="ltr"
  >
    <button
      type="button"
      class="inline-flex h-11 w-[78px] items-center justify-center gap-2 rounded-md border border-[var(--border-color)] bg-white/[0.04] px-3 text-sm font-bold text-white shadow-sm transition hover:border-white/20 hover:bg-white/10 sm:h-12"
      :aria-label="t('nav.language')"
      :aria-expanded="isOpen"
      @click.stop="isOpen = !isOpen"
    >
      <span
        class="flag"
        :class="currentLocale.flagClass"
        aria-hidden="true"
      />
      <span>{{ currentLocale.label }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[#111113]/95 py-2 shadow-2xl backdrop-blur-xl"
    >
      <button
        v-for="item in locales"
        :key="item.code"
        type="button"
        class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
        :class="item.code === currentLocale.code ? 'bg-white/10' : ''"
        @click="chooseLocale(item.code)"
      >
        <span
          class="flag"
          :class="item.flagClass"
          aria-hidden="true"
        />
        <span class="flex-1">{{ item.name }}</span>
        <span class="text-xs font-bold text-neutral-500">{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.flag {
  display: inline-block;
  width: 24px;
  height: 16px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.12);
}

.flag-ru {
  background: linear-gradient(#fff 0 33.33%, #1c57a7 33.33% 66.66%, #d52b1e 66.66%);
}

.flag-he {
  background: linear-gradient(#1f5fbf 0 18%, #fff 18% 82%, #1f5fbf 82%);
}

.flag-ka {
  background:
    linear-gradient(90deg, transparent 42%, #e31b23 42% 58%, transparent 58%),
    linear-gradient(transparent 42%, #e31b23 42% 58%, transparent 58%),
    #fff;
}

.flag-en {
  background:
    linear-gradient(90deg, transparent 42%, #c8102e 42% 58%, transparent 58%),
    linear-gradient(transparent 42%, #c8102e 42% 58%, transparent 58%),
    #012169;
}
</style>
