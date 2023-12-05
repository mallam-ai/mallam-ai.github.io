<script setup lang="ts">
import imgHFLogo from "~/assets/img/hf-logo.svg";

definePageMeta({
  layout: "fullscreen",
});

const items = [
  {
    label: "GitHub",
    icon: "i-mdi-github",
    to: "https://github.com/mallam-ai",
    target: "_blank",
    trailingIcon: "i-mdi-arrow-top-right-bold-box-outline",
  },
  {
    label: "Hugging Face",
    icon: "i-noto-v1-hugging-face",
    to: "https://huggingface.co/mallam-ai",
    target: "_blank",
    trailingIcon: "i-mdi-arrow-top-right-bold-box-outline",
  },
];
</script>

<template>
  <Head>
    <Title>MALLAM</Title>
  </Head>

  <div class="flex flex-row justify-center items-center pr-4">
    <div class="me-6">
      <img src="~/assets/img/mallam-logo.png" class="rounded w-16 h-16" />
    </div>
    <div class="font-semibold text-3xl">MALLAM</div>
  </div>

  <div class="mt-8 flex flex-col lg:flex-row">
    <UButton
      v-for="item in items"
      variant="ghost"
      :to="item.to"
      :target="item.target"
      :label="item.label"
      :icon="item.icon"
      :trailing-icon="item.trailingIcon"
      size="lg"
      class="mb-1 lg:mb-0 lg:me-2"
    ></UButton>
  </div>
</template>
