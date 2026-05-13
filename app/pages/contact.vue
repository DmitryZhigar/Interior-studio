<script setup lang="ts">

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)

const success = ref(false)

const sendRequest = async () => {

  try {

    loading.value = true

    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    success.value = true

    form.value = {
      name: '',
      email: '',
      message: ''
    }

  } catch (error) {

    console.error(error)

  } finally {

    loading.value = false

  }

}

</script>

<template>

  <div class="max-w-7xl mx-auto">

    <!-- HERO -->
    <section class="mb-24">

      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-6">
        Contact
      </p>

      <h1 class="text-5xl md:text-7xl lg:text-[110px] font-black leading-[0.9] mb-10">
        Let's create<br />
        something<br />
        exceptional.
      </h1>

    </section>

    <!-- CONTACT GRID -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-20">

      <!-- LEFT -->
      <div>

        <p class="uppercase tracking-[0.3em] text-neutral-500 mb-6">
          Information
        </p>

        <div class="space-y-10">

          <div>
            <p class="text-neutral-500 mb-2">
              Email
            </p>

            <p class="text-2xl font-semibold">
              hello@studio.com
            </p>
          </div>

          <div>
            <p class="text-neutral-500 mb-2">
              Phone
            </p>

            <p class="text-2xl font-semibold">
              +420 123 456 789
            </p>
          </div>

          <div>
            <p class="text-neutral-500 mb-2">
              Location
            </p>

            <p class="text-2xl font-semibold">
              Prague, Czech Republic
            </p>
          </div>

        </div>

      </div>

      <!-- RIGHT -->
      <div
        class="bg-white/5 border border-[var(--border-color)] rounded-[32px] p-8"
      >

        <form
          @submit.prevent="sendRequest"
          class="space-y-6"
        >

          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name"
            class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-6 py-5 outline-none"
          />

          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-6 py-5 outline-none"
          />

          <textarea
            v-model="form.message"
            rows="6"
            placeholder="Tell us about your project"
            class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-6 py-5 outline-none"
          />

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-white text-black py-5 rounded-2xl uppercase tracking-[0.3em] font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {{ loading ? 'Sending...' : 'Send Request' }}
          </button>

          <p
            v-if="success"
            class="text-green-500 text-sm"
          >
            Request sent successfully.
          </p>

        </form>

      </div>

    </section>

  </div>

</template>