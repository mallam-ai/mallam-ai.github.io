<script lang="ts" setup>
definePageMeta({
  titleLabel: "Sign In with GitHub",
  titleIcon: "i-mdi-github",
});

setTimeout(async () => {
  const route = useRoute();
  const { code, state } = route.query;
  await $fetch("/api/auth/authorize", {
    method: "POST",
    body: {
      vendor: "github",
      state,
      code,
    },
  });
  navigateTo({ name: "index" });
}, 1000);
</script>

<template>
  <div class="py-8">
    <p class="font-bold text-lg">Please wait while we are signing you in...</p>
  </div>
</template>
