<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <SkeletonDashboard page-icon="i-heroicons-users" page-title="Members">
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
