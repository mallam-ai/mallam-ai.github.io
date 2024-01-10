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
  {
    name: "My Role in Team",
    content: team.value.membershipRole,
  },
  {
    name: "Joined At",
    content: team.value.membershipCreatedAt,
  },
]);
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-user-group"
    :title-name="'Team: ' + team.displayName"
    :active-team-display-name="team.displayName"
  >
    <div class="flex flex-col mb-6">
      <PlainFields :fields="fields"></PlainFields>
    </div>
    <div class="flex flex-row items-center">
      <UButton
        class="me-8"
        icon="i-heroicons-arrow-left-end-on-rectangle"
        label="Leave Team"
        color="red"
        v-if="team.membershipRole !== 'admin'"
        :to="{ name: 'dashboard-team_id-leave', params: { team_id: team.id } }"
      ></UButton>
      <UButton
        class="me-8"
        icon="i-heroicons-pencil-square"
        label="Edit Team"
        color="primary"
        v-if="team.membershipRole == 'admin'"
        :to="{ name: 'dashboard-team_id-edit', params: { team_id: team.id } }"
      ></UButton>
      <UButton
        label="Delete Team"
        icon="i-heroicons-trash"
        color="red"
        v-if="team.membershipRole == 'admin'"
        :to="{ name: 'dashboard-team_id-delete', params: { team_id: team.id } }"
      ></UButton>
    </div>
  </SkeletonDashboard>
</template>
