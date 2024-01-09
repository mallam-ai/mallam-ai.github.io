<script lang="ts" setup>
import { useTimeoutFn } from "@vueuse/core";

const toast = useToast();
const route = useRoute();
const { code, state } = route.query;

onMounted(() => {
  useTimeoutFn(async () => {
    try {
      await $fetch("/api/auth/authorize", {
        method: "POST",
        body: {
          vendor: "github",
          state,
          code,
        },
      });
    } catch (e) {
      toastError(toast, e);
    }
    navigateTo({ name: "dashboard" });
  }, 1000);
});
</script>

<template>
  <SkeletonDefault title-label="Sign in with GitHub" title-icon="i-mdi-github">
    <div class="py-8">
      <p class="font-bold text-lg">
        Please wait while we are signing you in...
      </p>
    </div>
  </SkeletonDefault>
</template>
