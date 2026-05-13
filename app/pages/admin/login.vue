<script setup lang="ts">
const router = useRouter()

const form = ref({
  login: '',
  password: ''
})

const error = ref('')

const signIn = async () => {

  try {

    await $fetch('/api/login', {
      method: 'POST',
      body: form.value
    })

    await navigateTo('/admin/')

  } catch {

    error.value = 'Invalid credentials'

  }

}
</script>

<template>

  <div class="min-h-screen bg-[var(--bg-main)] text-white flex items-center justify-center">
   <div class="w-full max-w-md">

      <h1 class="text-5xl font-black mb-10">
        Admin Login
      </h1>
        <div class="space-y-6">
          <input
            v-model="form.login"
            type="text"
            placeholder="Login"
            class="w-full bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full bg-transparent border border-[var(--border-color)] rounded-2xl px-6 py-4 outline-none"
          />
          <p
            v-if="error"
            class="text-red-500"
          >
            {{ error }}
          </p>
          <button
            @click="signIn"
            class="w-full px-8 py-4 bg-white text-black rounded-full font-semibold"
          >
            Sign In
          </button>
        </div>
    </div>
  </div>

</template>
