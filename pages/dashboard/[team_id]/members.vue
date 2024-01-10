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
  {
    key: "actions",
  },
];

const addFormUserId = ref("");
const addFormRole = ref("member");
const addFormRoles = ["member", "viewer"];

const working = ref(false);

async function addMember() {
  working.value = true;
  try {
    await $fetch("/api/memberships/create", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        teamId: team.value.id,
        userId: addFormUserId.value,
        role: addFormRole.value,
      }),
    });
    addFormUserId.value = "";
    await refreshMemberships();
  } finally {
    working.value = false;
  }
}

async function removeMember(userId: string) {
  working.value = true;
  try {
    await $fetch("/api/memberships/destroy", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        teamId: team.value.id,
        userId: userId,
      }),
    });
    addFormUserId.value = "";
    await refreshMemberships();
  } finally {
    working.value = false;
  }
}

async function updateMember(userId: string, role: string) {}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-users"
    title-name="Members"
    :active-team-display-name="team.displayName"
  >
    <div class="flex flex-row items-center mb-4">
      <UInput
        class="me-2 w-64"
        v-model="addFormUserId"
        placeholder="User ID"
      ></UInput>
      <USelect class="me-2" v-model="addFormRole" :options="addFormRoles" />
      <UButton
        label="Add / Update"
        icon="i-heroicons-user-plus"
        :disabled="working"
        :loading="working"
        size="xs"
        @click="addMember"
      ></UButton>
    </div>
    <UTable :columns="columns" :rows="memberships">
      <template #actions-data="{ row }">
        <UButton
          v-if="row.userId !== user.id && team.membershipRole === 'admin'"
          :disabled="working"
          @click="removeMember(row.userId)"
          size="sm"
          icon="i-heroicons-trash"
          variant="ghost"
          color="red"
          label="Remove"
        >
        </UButton>
      </template>
      <template #avatar-data="{ row }">
        <img
          class="w-8 h-8 rounded-full"
          :src="createUserAvatarURL(row.userVendor, row.userVendorUserId)"
        />
      </template>
    </UTable>
  </SkeletonDashboard>
</template>
