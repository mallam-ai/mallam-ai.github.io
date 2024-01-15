<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const { data: document, refresh: refreshDocument } = await useCurrentDocument();

const sentences = computed(() => {
  if (
    document.value.sentences &&
    (document.value.status === DocumentStatus.Segmented ||
      document.value.status === DocumentStatus.Analyzed)
  ) {
    return document.value.sentences.map((s) => s.trim());
  }
  return document.value.content
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
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
          v-if="document.status === DocumentStatus.Analyzed"
          variant="subtle"
          color="lime"
        >
          <UIcon class="me-1" name="i-mdi-check"></UIcon>
          <span>Analyzed</span>
        </UBadge>

        <UBadge
          size="lg"
          v-else-if="document.status === DocumentStatus.Failed"
          variant="subtle"
          color="red"
        >
          <UIcon class="me-1" name="i-mdi-check"></UIcon>
          <span>Failed Analyzing</span>
        </UBadge>

        <UBadge size="lg" v-else variant="subtle" color="amber">
          <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
          <span>Analyzing</span>
        </UBadge>
      </div>
    </div>
    <article class="prose dark:prose-invert">
      <p v-for="(sentence, index) in sentences" :key="index">
        {{ sentence }}
      </p>
    </article>
  </SkeletonDashboard>
</template>
