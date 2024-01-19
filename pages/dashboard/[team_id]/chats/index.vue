<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { data: team, refresh: refreshTeam } = await useCurrentTeam();
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-chat-bubble-left-right"
    title-name="Chat with AI"
    :active-team-display-name="team.displayName"
  >
    <div>
      <UButton
        label="New Conversation"
        icon="i-mdi-chat-plus-outline"
        :to="{
          name: 'dashboard-team_id-chats-new',
          params: {
            team_id: team.id,
          },
        }"
      ></UButton>
    </div>

    <UnderDevelopment class="mt-6"></UnderDevelopment>
  </SkeletonDashboard>
</template>
