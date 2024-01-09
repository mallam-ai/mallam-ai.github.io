<script setup lang="ts">
const { titleName, titleIcon } = defineProps<{
  titleName: string;
  titleIcon: string;
}>();
</script>

<template>
  <Head>
    <Title>MALLAM - {{ titleName }}</Title>
  </Head>

  <div class="flex flex-row justify-center items-center py-8">
    <ULink :to="{ name: 'index' }" class="flex flex-row items-center">
      <img src="~/assets/img/mallam-logo.png" class="rounded w-6 h-6" />
    </ULink>
    <UIcon class="mx-2" name="i-mdi-chevron-right"></UIcon>
    <UIcon class="font-semibold text-xl me-2" :name="titleIcon"></UIcon>
    <span class="font-semibold text-xl">{{ titleName }}</span>
  </div>

  <div class="flex flex-col items-center py-4">
    <slot></slot>
  </div>

  <div class="flex flex-col items-center py-8">
    <Footer></Footer>
  </div>
</template>
