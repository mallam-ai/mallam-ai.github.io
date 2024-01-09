<script lang="ts" setup>
import { useTimeoutFn } from "@vueuse/core";

const toast = useToast();

definePageMeta({
  titleLabel: "Sign In with GitHub",
  titleIcon: "i-mdi-github",
});

onMounted(() => {
  useTimeoutFn(async () => {
    try {
      const { url } = await $fetch("/api/auth/authorization_url", {
        method: "POST",
        body: { vendor: "github" },
      });
      navigateTo(url, { external: true });
    } catch (e) {
      toastError(toast, e);
    }
  }, 2000);
});
</script>

<template>
  <div class="py-8">
    <p class="font-bold text-lg">Please wait while we are redirecting you...</p>
  </div>
</template>
