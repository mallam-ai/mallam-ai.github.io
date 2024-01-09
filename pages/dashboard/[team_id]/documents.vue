<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { data: team, refresh: refreshTeam } = await useCurrentTeam();
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-document-text"
    title-name="Documents"
    :active-team-display-name="team.displayName"
  >
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
