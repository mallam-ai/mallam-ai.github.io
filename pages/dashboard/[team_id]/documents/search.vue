<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-search"
    title-name="Search Document"
    :active-team-display-name="team.displayName"
  >
    <DocumentSearchBox :team-id="team.id"></DocumentSearchBox>
  </SkeletonDashboard>
</template>
