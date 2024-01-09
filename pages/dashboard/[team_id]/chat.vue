<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <SkeletonDashboard
    page-icon="i-heroicons-chat-bubble-left-right"
    page-title="Chat"
  >
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
