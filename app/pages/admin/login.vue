<template>

  <div class="min-h-screen bg-black flex items-center justify-center p-6">

    <div
      class="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-10"
    >

      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-6">
        Admin Access
      </p>

      <h1 class="text-4xl font-black mb-10">
        Sign In
      </h1>

      <form class="space-y-6">

        <input
          type="email"
          placeholder="Email"
          class="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          class="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
        />

        <button
          class="w-full bg-white text-black py-5 rounded-2xl uppercase tracking-[0.3em] font-semibold"
        >
          Login
        </button>

      </form>

    </div>

  </div>

</template>