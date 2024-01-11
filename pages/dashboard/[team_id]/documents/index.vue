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
    <div class="flex flex-row justify-center mb-4">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="total"
        :disabled="working"
      />
    </div>
    <div class="mb-8">
      <UTable :columns="columns" :rows="documents">
        <template #title-data="{ row }">
          <UButton
            v-if="row.isAnalyzed"
            variant="link"
            :to="{
              name: 'dashboard-team_id-documents-document_id',
              params: { team_id: team.id, document_id: row.id },
            }"
            :label="row.title"
            :padded="false"
          >
          </UButton>
          <UButton
            v-else
            variant="link"
            icon="i-mdi-timer-sand"
            :to="{
              name: 'dashboard-team_id-documents-document_id',
              params: { team_id: team.id, document_id: row.id },
            }"
            :label="row.title"
            :padded="false"
          >
          </UButton>
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
