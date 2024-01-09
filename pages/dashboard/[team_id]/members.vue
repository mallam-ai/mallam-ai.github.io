<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { data: team, refresh: refreshTeam } = await useCurrentTeam();
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-users"
    title-name="Members"
    :active-team-display-name="team.displayName"
  >
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
