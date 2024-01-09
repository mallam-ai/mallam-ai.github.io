<script setup lang="ts">
const titleLabel = computed(() => {
  const route = useRoute();
  return route.meta.titleLabel || "noname";
});

const titleIcon = computed(() => {
  const route = useRoute();
  return route.meta.titleIcon || "i-heroicons-home";
});
</script>

<template>
  <Head>
    <Title>MALLAM - {{ titleLabel }}</Title>
  </Head>

  <div class="flex flex-row justify-center items-center py-8">
    <ULink :to="{ name: 'index' }" class="flex flex-row items-center">
      <img src="~/assets/img/mallam-logo.png" class="rounded w-6 h-6" />
    </ULink>
    <UIcon class="mx-2" name="i-mdi-chevron-right"></UIcon>
    <UIcon class="font-semibold text-xl me-2" :name="titleIcon"></UIcon>
    <span class="font-semibold text-xl">{{ titleLabel }}</span>
  </div>

  <div class="flex flex-col items-center py-4">
    <slot></slot>
  </div>

  <div class="flex flex-col items-center py-8">
    <Footer></Footer>
  </div>

  <UNotifications />
</template>
