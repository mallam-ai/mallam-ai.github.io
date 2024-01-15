<script setup lang="ts">
import type { MDocument } from "~/utils/types";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const working = ref(false);

const page = ref(1);
const pageCount = ref(20);
const total = ref(pageCount.value);

const documents = ref<Array<MDocument>>([]);

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
];

async function fetchDocuments() {
  working.value = true;
  try {
    const data = await $fetch("/api/documents/list", {
      query: {
        teamId: team.value.id,
        offset: (page.value - 1) * pageCount.value,
        limit: pageCount.value,
      },
      headers: decorateHeaders(),
    });
    total.value = data.total;
    documents.value = data.documents;
  } finally {
    working.value = false;
  }
}

await fetchDocuments();

watch([page, pageCount], fetchDocuments);
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-document-text"
    title-name="Documents"
    :active-team-display-name="team.displayName"
  >
    <div
      v-if="team.membershipRole === 'member' || team.membershipRole === 'admin'"
      class="mb-6"
    >
      <UButton
        icon="i-mdi-file-document-plus"
        label="New Document"
        :to="{
          name: 'dashboard-team_id-documents-new',
          params: { team_id: team.id },
        }"
      ></UButton>
    </div>
    <div class="mb-8">
      <UTable :columns="columns" :rows="documents">
        <template #title-data="{ row }">
          <UButton
            variant="link"
            :to="{
              name: 'dashboard-team_id-documents-document_id',
              params: { team_id: team.id, document_id: row.id },
            }"
            :label="row.title"
            :padded="false"
          >
          </UButton>

          <UBadge
            variant="subtle"
            size="xs"
            v-if="row.status === DocumentStatus.Failed"
            class="ms-2"
            color="red"
          >
            <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
            <span>Failed Analyzing</span>
          </UBadge>

          <UBadge
            variant="subtle"
            size="xs"
            v-else-if="row.status !== DocumentStatus.Analyzed"
            class="ms-2"
            color="amber"
          >
            <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
            <span>Analyzing</span>
          </UBadge>
        </template>
      </UTable>
    </div>
    <div class="flex flex-row justify-center mb-4">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="total"
        :disabled="working"
      />
    </div>
  </SkeletonDashboard>
</template>
