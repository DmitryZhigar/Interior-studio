<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <section class="mb-32">
      <p class="uppercase tracking-[0.4em] text-neutral-500 mb-6">
        {{ t('studio.eyebrow') }}
      </p>

      <h1 class="text-5xl md:text-7xl lg:text-[110px] font-black leading-[0.9] mb-10">
        {{ t('studio.titleLine1') }}<br />
        {{ t('studio.titleLine2') }}<br />
        {{ t('studio.titleLine3') }}
      </h1>

      <div class="max-w-3xl">
        <p class="text-xl md:text-2xl text-neutral-300 leading-relaxed">
          {{ t('studio.intro') }}
        </p>
      </div>
    </section>

    <section class="mb-32">
      <img
        src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop"
        class="w-full h-[400px] md:h-[800px] object-cover rounded-[40px]"
      />
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
      <div>
        <p class="uppercase tracking-[0.3em] text-neutral-500 mb-6">
          {{ t('studio.philosophy') }}
        </p>

        <h2 class="text-4xl md:text-5xl font-black mb-8">
          {{ t('studio.statementLine1') }}<br />
          {{ t('studio.statementLine2') }}<br />
          {{ t('studio.statementLine3') }}
        </h2>
      </div>

      <div>
        <p class="text-lg text-neutral-300 leading-relaxed mb-8">
          {{ t('studio.body1') }}
        </p>

        <p class="text-lg text-neutral-300 leading-relaxed">
          {{ t('studio.body2') }}
        </p>
      </div>
    </section>
  </div>
</template>
