<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'

const { t } = useLocale()

const heroRef = ref<HTMLElement | null>(null)
const isEstimateOpen = ref(false)
const estimateLoading = ref(false)
const estimateSuccess = ref(false)

const estimateForm = ref({
  name: '',
  phone: '',
  consent: true
})

const openEstimate = () => {
  estimateSuccess.value = false
  isEstimateOpen.value = true
}

const closeEstimate = () => {
  if (!estimateLoading.value) {
    isEstimateOpen.value = false
  }
}

const submitEstimateRequest = async () => {
  if (!estimateForm.value.consent) {
    return
  }

  try {
    estimateLoading.value = true

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: estimateForm.value.name,
        phone: estimateForm.value.phone,
        message: t('estimate.message')
      }
    })

    estimateSuccess.value = true
    estimateForm.value = {
      name: '',
      phone: '',
      consent: true
    }
  } catch (error) {
    console.error(error)
  } finally {
    estimateLoading.value = false
  }
}

const closeOnEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeEstimate()
  }
}

onMounted(() => {
  if (heroRef.value) {
    useReveal(heroRef.value)
  }

if (projectsRef.value) {
    useReveal(projectsRef.value)
  }
  document.addEventListener('keydown', closeOnEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <section
      ref="heroRef"
      class="min-h-[90vh] flex flex-col justify-center"
    >
      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-8">
        {{ t('home.eyebrow') }}
      </p>

      <h1 class="text-6xl md:text-8xl lg:text-[140px] font-black leading-[0.9] mb-10">
        {{ t('home.titleLine1') }}<br />
        {{ t('home.titleLine2') }}<br />
        {{ t('home.titleLine3') }}
      </h1>

      <div class="max-w-2xl">
        <p class="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-10">
          {{ t('home.intro') }}
        </p>

        <button
          type="button"
          class="inline-flex h-14 items-center justify-center rounded-md border border-[var(--border-color)] bg-white/[0.06] px-8 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/20 hover:bg-white/[0.12]"
          @click="openEstimate"
        >
          {{ t('home.estimateCta') }}
        </button>
        
        <NuxtLink
          to="/projects"
          style="margin-left: 10px;"
          class="inline-flex h-14 items-center justify-center rounded-md border border-[var(--border-color)] bg-white/[0.06] px-8 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/20 hover:bg-white/[0.12]"
        >
          {{ t('home.cta') }}
        </NuxtLink>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="estimate-modal">
        <div
          v-if="isEstimateOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
          @click.self="closeEstimate"
        >
          <div class="w-full max-w-xl rounded-lg border border-[var(--border-color)] bg-[#11100e] p-6 shadow-2xl sm:p-10">
            <div class="mb-8 flex items-start justify-between gap-6">
              <div>
                <p class="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
                  {{ t('estimate.eyebrow') }}
                </p>

                <h2 class="text-3xl font-black text-white">
                  {{ t('estimate.title') }}
                </h2>

                <p class="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
                  {{ t('estimate.subtitle') }}
                </p>
              </div>

              <button
                type="button"
                class="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--border-color)] text-neutral-400 transition hover:border-white/20 hover:text-white"
                :aria-label="t('estimate.close')"
                @click="closeEstimate"
              >
                ×
              </button>
            </div>

            <form
              class="space-y-5"
              @submit.prevent="submitEstimateRequest"
            >
              <label class="block">
                <span class="mb-2 block text-sm text-neutral-300">
                  {{ t('estimate.nameLabel') }}
                </span>

                <input
                  v-model="estimateForm.name"
                  type="text"
                  required
                  :placeholder="t('estimate.namePlaceholder')"
                  class="h-14 w-full rounded-md border border-[var(--border-color)] bg-white/[0.04] px-5 text-white outline-none transition placeholder:text-neutral-600 focus:border-white/30"
                />
              </label>

              <label class="block">
                <span class="mb-2 block text-sm text-neutral-300">
                  {{ t('estimate.phoneLabel') }}
                </span>

                <input
                  v-model="estimateForm.phone"
                  type="tel"
                  required
                  inputmode="tel"
                  :placeholder="t('estimate.phonePlaceholder')"
                  class="h-14 w-full rounded-md border border-[var(--border-color)] bg-white/[0.04] px-5 text-white outline-none transition placeholder:text-neutral-600 focus:border-white/30"
                />
              </label>

              <label class="flex items-start gap-3 text-sm leading-relaxed text-neutral-400">
                <input
                  v-model="estimateForm.consent"
                  type="checkbox"
                  required
                  class="mt-1 h-4 w-4 rounded border-[var(--border-color)] accent-white"
                />
                <span>{{ t('estimate.consent') }}</span>
              </label>

              <button
                type="submit"
                :disabled="estimateLoading || !estimateForm.consent"
                class="h-14 w-full rounded-md bg-white text-sm font-black uppercase tracking-[0.22em] text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{ estimateLoading ? t('estimate.sending') : t('estimate.submit') }}
              </button>

              <p
                v-if="estimateSuccess"
                class="text-sm text-green-400"
              >
                {{ t('estimate.success') }}
              </p>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.estimate-modal-enter-active,
.estimate-modal-leave-active {
  transition: opacity 0.2s ease;
}

.estimate-modal-enter-from,
.estimate-modal-leave-to {
  opacity: 0;
}
</style>
