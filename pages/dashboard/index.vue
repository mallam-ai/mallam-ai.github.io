<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";

definePageMeta({
  middleware: ["auth"],
});

const { data: teams, refresh: refreshTeams } = await useTeams();
</script>

<template>
  <SkeletonDashboard page-icon="i-mdi-account-group-outline" page-title="Teams">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardTeamCard>
        <p class="text-xl font-bold mb-2">Create Team</p>
        <p>Create a team to collaborate with your friends and colleagues.</p>
        <template #button>
          <UButton
            :to="{ name: 'dashboard-teams-create' }"
            :block="true"
            color="lime"
            label="Create Team"
            icon="i-mdi-account-multiple-plus-outline"
          ></UButton>
        </template>
      </DashboardTeamCard>

      <DashboardTeamCard v-for="item of teams" v-bind:key="item.id">
        <span class="text-xl font-bold mb-2 flex flex-row items-center">
          <UIcon name="i-mdi-account-group-outline" class="me-2"></UIcon>
          <span>{{ item.displayName }}</span>
        </span>
        <div>
          <UBadge
            color="green"
            class="me-2"
            variant="subtle"
            :label="item.membershipRole"
          ></UBadge>
          <UBadge
            variant="subtle"
            :label="
              'joined ' + formatTimeAgo(new Date(item.membershipCreatedAt))
            "
          ></UBadge>
        </div>
        <template #button>
          <UButton
            :to="{ name: 'dashboard-team_id', params: { team_id: item.id } }"
            label="Enter Team"
            :block="true"
            icon="i-heroicons-arrow-right-end-on-rectangle"
          ></UButton>
        </template>
      </DashboardTeamCard>
    </div>
  </SkeletonDashboard>
</template>
