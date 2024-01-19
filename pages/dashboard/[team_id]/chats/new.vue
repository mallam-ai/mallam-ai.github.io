<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { data: team, refresh: refreshTeam } = await useCurrentTeam();
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-chat-plus-outline"
    title-name="New Conversation with AI"
    :active-team-display-name="team.displayName"
  >
    <UnderDevelopment></UnderDevelopment>
  </SkeletonDashboard>
</template>
