<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

definePageMeta({
  middleware: ["auth"],
});
const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const documentId = useRoute().params.document_id;

const { data: document, refresh: refreshDocument } = await useDocument(
  documentId
);

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
      <UBadge v-if="document.isAnalyzed" color="lime">
        <UIcon class="me-1" name="i-mdi-check"></UIcon>
        <span>Analyzed</span>
      </UBadge>

      <UBadge v-else color="amber">
        <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
        <span>Analyzing</span>
      </UBadge>

      <UBadge class="ms-2">
        <UIcon class="me-1" name="i-mdi-clock"></UIcon>
        <span>{{ document.createdAt }}</span>
      </UBadge>
    </div>
    <article class="prose dark:prose-invert" v-html="contentHTML"></article>
  </SkeletonDashboard>
</template>
