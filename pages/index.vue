<script setup lang="ts">
definePageMeta({
  layout: "fullscreen",
});

const showSignOut = ref(false);

const { data: user, refresh: refreshUser } = await useUser();

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

async function doSignOut() {
  await $fetch("/api/auth/clear");
  await refreshUser();
}
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

  <div class="mt-8 flex flex-col">
    <div v-if="user.id">
      <div class="text-sm flex flex-row justify-center items-center">
        <span class="text-gray-400">Signed in as</span>
        <UIcon v-if="user.vendor === 'github'" name="i-mdi-github" class="mx-1" />
        <span>{{ user.displayName }}</span>
      </div>
      <div
        class="mt-4 flex flex-row justify-between items-center"
        v-if="showSignOut"
      >
        <UButton
          size="xs"
          color="red"
          variant="ghost"
          icon="i-mdi-check-circle-outline"
          @click.prevent="doSignOut"
        >
          Confirm to Sign Out
        </UButton>
        <UButton
          size="xs"
          variant="ghost"
          icon="i-mdi-close-circle-outline"
          @click.prevent="showSignOut = false"
          class="ms-4"
        >
          Cancel
        </UButton>
      </div>
      <div class="mt-4 flex flex-row justify-center items-center" v-else>
        <UButton
          size="xs"
          color="red"
          icon="i-mdi-logout"
          variant="ghost"
          @click.prevent="showSignOut = true"
        >
          Sign Out
        </UButton>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>
