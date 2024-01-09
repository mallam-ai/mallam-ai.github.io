<script setup lang="ts">
const route = useRoute();
const teamId = route.params.team_id as string;

definePageMeta({
  layout: "dashboard",
  titleLabel: "Current Team",
  titleIcon: "i-heroicons-user-group",
});
</script>

<template>
  <UnderDevelopment></UnderDevelopment>
</template>
