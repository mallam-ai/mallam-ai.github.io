<template>
  <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">

    <div class="flex flex-row justify-center items-center pr-4">
      <div class="me-6">
        <img src="~/assets/img/mallam-logo.png" class="rounded w-16 h-16" />
      </div>
      <div class="font-semibold text-3xl">MALLAM AI</div>
    </div>

    <div class="mt-8 flex flex-row items-center">
      <UButton
        variant="link"
        to="https://github.com/mallam-ai"
        target="_blank"
        icon="i-simple-icons-github"
        trailing-icon="i-mdi-chevron-right"
        label="GitHub"
      ></UButton>

      <UButton
        variant="link"
        to="https://huggingface.co/mallam-ai"
        target="_blank"
        icon="i-noto-v1-hugging-face"
        trailing-icon="i-mdi-chevron-right"
        label="Hugging Face"
      ></UButton>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 w-full flex flex-col items-center pb-8">
    <span class="text-slate-400 text-sm">
      Copyright 2023 MALLAM Developers All Rights Reserved
    </span>
  </div>
</template>
