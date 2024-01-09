<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <SkeletonDashboard
    page-icon="i-heroicons-document-text"
    page-title="Documents"
  >
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
