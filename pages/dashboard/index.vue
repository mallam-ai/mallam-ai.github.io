<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";

definePageMeta({
  middleware: ["auth"],
});

const { data: teams, refresh: refreshTeams } = await useTeams();
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-account-group-outline"
    title-name="Teams"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MCard>
        <p class="text-xl font-bold mb-2">Create Team</p>
        <p>Create a team to collaborate with your friends and colleagues.</p>
        <template #button>
          <UButton
            :to="{ name: 'dashboard-teams-new' }"
            :block="true"
            color="lime"
            label="New Team"
            icon="i-mdi-account-multiple-plus-outline"
          ></UButton>
        </template>
      </MCard>

      <MCard v-for="item of teams" v-bind:key="item.id">
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
      </MCard>
    </div>
  </SkeletonDashboard>
</template>
