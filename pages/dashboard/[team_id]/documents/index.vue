<script setup lang="ts">
import type { MDocument } from "~/utils/types";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const working = ref(false);

const documents = ref<Array<MDocument>>([]);

const effectivePage = computed(() => {
  const route = useRoute();
  return route.query.page ? parseInt(route.query.page as string) : 1;
});

const effectivePageSize = computed(() => {
  const route = useRoute();
  return route.query.page_size ? parseInt(route.query.page_size as string) : 20;
});

const displayPage = ref(effectivePage.value);
const displayPageSize = ref(effectivePageSize.value);
const displayTotal = ref(displayPageSize.value);

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
        offset: (effectivePage.value - 1) * effectivePageSize.value,
        limit: effectivePageSize.value,
      },
      headers: decorateHeaders(),
    });
    displayTotal.value = data.total;
    documents.value = data.documents;
  } finally {
    working.value = false;
  }
}

await fetchDocuments();

watch([effectivePage, effectivePageSize], fetchDocuments);

watch([displayPage, displayPageSize], async function () {
  navigateTo({
    query: {
      page: displayPage.value,
      page_size: displayPageSize.value,
    },
  });
});

const retryWorking = ref(false);

async function retryFailed() {
  if (!confirm("Confim to reanalyze failed documents?")) {
    return;
  }

  retryWorking.value = true;

  try {
    await $fetch("/api/documents/retry", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        teamId: team.value.id,
      }),
    });
  } finally {
    retryWorking.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-document-text"
    title-name="Documents"
    :active-team-display-name="team.displayName"
  >
    <div class="mb-6 flex flex-row justify-between">
      <div>
        <UButton
          v-if="
            team.membershipRole === 'member' || team.membershipRole === 'admin'
          "
          icon="i-mdi-file-document-plus"
          label="New Document"
          :to="{
            name: 'dashboard-team_id-documents-new',
            params: { team_id: team.id },
          }"
        ></UButton>
        <UButton
          v-if="
            team.membershipRole === 'member' || team.membershipRole === 'admin'
          "
          class="ms-2"
          icon="i-mdi-cloud-refresh-variant"
          label="Retry Failed"
          @click="retryFailed"
          :disabled="retryWorking"
          :loading="retryWorking"
        ></UButton>
      </div>

      <UButton
        class="ms-2"
        icon="i-mdi-search"
        label="Search"
        :to="{
          name: 'dashboard-team_id-documents-search',
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

          <DocumentStatusBadge class="ms-2" :document="row" />
        </template>
      </UTable>
    </div>
    <div class="flex flex-row justify-center mb-4">
      <UPagination
        v-model="displayPage"
        :page-count="displayPageSize"
        :total="displayTotal"
        :disabled="working"
      />
    </div>
  </SkeletonDashboard>
</template>
