<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { data: team, refresh: refreshTeam } = await useCurrentTeam();
</script>

<template>
  <SkeletonDashboard
    page-icon="i-heroicons-user-group"
    :page-title="'Team: ' + team.displayName"
    :active-team-display-name="team.displayName"
  >
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
