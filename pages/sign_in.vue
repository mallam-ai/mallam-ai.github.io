<script lang="ts" setup>
definePageMeta({
  titleLabel: "Sign In with GitHub",
  titleIcon: "i-mdi-github",
});

setTimeout(async () => {
  const { url } = await $fetch("/api/auth/authorization_url", {
    method: "POST",
    body: { vendor: "github" },
  });
  navigateTo(url, { external: true });
}, 2000);
</script>

<template>
  <div class="py-8">
    <p class="font-bold text-lg">Please wait while we are redirecting you...</p>
  </div>
</template>
