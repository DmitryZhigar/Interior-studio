<script setup lang="ts">
const props = withDefaults(defineProps<{
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  pending?: boolean
}>(), {
  confirmLabel: 'Yes',
  cancelLabel: 'No',
  pending: false
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const cancel = () => {
  if (!props.pending) {
    emit('cancel')
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (props.open && event.key === 'Escape') {
    cancel()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-dialog">
      <div
        v-if="open"
        class="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
        @click.self="cancel"
      >
        <div class="w-full max-w-md rounded-lg border border-[var(--border-color)] bg-[#11100e] p-6 shadow-2xl sm:p-8">
          <h2 class="text-2xl font-black text-white">
            {{ title }}
          </h2>

          <p class="mt-4 text-sm leading-relaxed text-neutral-400">
            {{ message }}
          </p>

          <div class="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="h-12 rounded-md border border-[var(--border-color)] text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pending"
              @click="cancel"
            >
              {{ cancelLabel }}
            </button>

            <button
              type="button"
              class="h-12 rounded-md bg-red-500 text-sm font-black text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pending"
              @click="emit('confirm')"
            >
              {{ pending ? 'Deleting' : confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-dialog-enter-active,
.confirm-dialog-leave-active {
  transition: opacity 0.2s ease;
}

.confirm-dialog-enter-from,
.confirm-dialog-leave-to {
  opacity: 0;
}
</style>
