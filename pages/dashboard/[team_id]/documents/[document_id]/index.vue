<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const { data: document, refresh: refreshDocument } = await useCurrentDocument();

const contentHTML = computed(() => {
  return sanitizeHtml(marked.parse(document.value.content));
});
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-document-text"
    :title-name="document.title"
    :active-team-display-name="team.displayName"
  >
    <div class="flex flex-row items-center mb-4">
      <UButton
        v-if="
          team.membershipRole === 'member' || team.membershipRole === 'admin'
        "
        class="me-2"
        size="xs"
        icon="i-mdi-pencil-box-outline"
        label="Edit Document"
        :to="{
          name: 'dashboard-team_id-documents-document_id-edit',
          params: { team_id: team.id, document_id: document.id },
        }"
      ></UButton>

      <UButton
        v-if="
          team.membershipRole === 'member' || team.membershipRole === 'admin'
        "
        class="me-2"
        color="red"
        size="xs"
        icon="i-mdi-trash"
        label="Delete Document"
        :to="{
          name: 'dashboard-team_id-documents-document_id-delete',
          params: { team_id: team.id, document_id: document.id },
        }"
      ></UButton>

      <div>
        <UBadge size="lg" class="me-2" variant="subtle">
          <UIcon class="me-1" name="i-mdi-clock"></UIcon>
          <span>{{ document.createdAt }}</span>
        </UBadge>

        <UBadge
          size="lg"
          v-if="document.isAnalyzed"
          variant="subtle"
          color="lime"
        >
          <UIcon class="me-1" name="i-mdi-check"></UIcon>
          <span>Analyzed</span>
        </UBadge>

        <UBadge size="lg" v-else variant="subtle" color="amber">
          <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
          <span>Analyzing</span>
        </UBadge>
      </div>
    </div>
    <article class="prose dark:prose-invert" v-html="contentHTML"></article>
  </SkeletonDashboard>
</template>
