<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: user } = await useUser();
const { data: team, refresh: refreshTeam } = await useCurrentTeam();
const { data: memberships, refresh: refreshMemberships } =
  await useTeamMemberships(team.value.id);

const columns = [
  {
    key: "avatar",
  },
  {
    key: "userId",
    label: "User ID",
  },
  {
    key: "userDisplayName",
    label: "User Display Name",
  },
  {
    key: "role",
    label: "Role",
  },
];
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-users"
    title-name="Members"
    :active-team-display-name="team.displayName"
  >
    <UTable :columns="columns" :rows="memberships">
      <template #avatar-data="{ row }">
        <img
          class="w-8 h-8 rounded-full"
          :src="createUserAvatarURL(row.userVendor, row.userVendorUserId)"
        />
      </template>
    </UTable>
  </SkeletonDashboard>
</template>
