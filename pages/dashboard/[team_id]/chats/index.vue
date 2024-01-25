<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const working = ref(false);

const chats = ref<Array<Chat>>([]);

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

async function fetchChats() {
  working.value = true;
  try {
    const data = await $fetch("/api/chats/list", {
      query: {
        teamId: team.value.id,
        offset: (effectivePage.value - 1) * effectivePageSize.value,
        limit: effectivePageSize.value,
      },
      headers: decorateHeaders(),
    });
    displayTotal.value = data.total;
    chats.value = data.chats;
  } finally {
    working.value = false;
  }
}

await fetchChats();

watch([effectivePage, effectivePageSize], fetchChats);

watch([displayPage, displayPageSize], async function () {
  navigateTo({
    query: {
      page: displayPage.value,
      page_size: displayPageSize.value,
    },
  });
});
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-chat-bubble-left-right"
    title-name="Chats"
    :active-team-display-name="team.displayName"
  >
    <div class="mb-6 flex flex-row justify-between">
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
    </div>
    <div class="mb-8">
      <UTable :columns="columns" :rows="chats">
        <template #title-data="{ row }">
          <UButton
            variant="link"
            :to="{
              name: 'dashboard-team_id-chats-chat_id',
              params: { team_id: team.id, chat_id: row.id },
            }"
            :label="row.title"
            :padded="false"
          >
          </UButton>

          <ChatStatusBadge
            class="ms-2"
            v-if="row.status !== 'analyzed'"
            :chat="row"
          />
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
