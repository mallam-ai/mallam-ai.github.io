<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const fields = computed(() => [
  {
    name: "Team ID",
    content: team.value.id,
  },
  {
    name: "Team Name",
    content: team.value.displayName,
  },
  {
    name: "Team Creator",
    content: team.value.createdBy,
  },
  {
    name: "Team Created At",
    content: team.value.createdAt,
  },
]);
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-user-group"
    :title-name="'Team: ' + team.displayName"
    :active-team-display-name="team.displayName"
  >
    <div class="flex flex-col">
      <PlainFields :fields="fields"></PlainFields>
    </div>
  </SkeletonDashboard>
</template>
