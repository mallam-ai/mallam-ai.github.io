<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const state = reactive({
  content: "",
  context: "",
});

const contextRows = ref(12);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.title) {
    errors.push({ path: "title", message: "Required" });
  }
  if (!state.content) {
    errors.push({ path: "content", message: "Required" });
  }
  if (state.content.length < 10) {
    errors.push({ path: "content", message: "Must be at least 10 characters" });
  }
  return errors;
};

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  working.value = true;
  try {
    const chat = await $fetch("/api/chats/create", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign(
          event.data,
          { teamId: team.value.id },
          { title: event.data.content }
        )
      ),
    });
    navigateTo({
      name: "dashboard-team_id-chats-chat_id",
      params: { team_id: team.value.id, chat_id: chat.id },
    });
  } finally {
    working.value = false;
  }
}

const showSearch = ref(false);

const sentenceIds = ref([]);

function onDocumentFetched(document: MDocument) {
  console.log("onDocumentFetched", document);
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-chat-plus-outline"
    title-name="New Conversation with AI"
    :active-team-display-name="team.displayName"
  >
    <div>
      <UButton
        class="ms-2"
        icon="i-mdi-search"
        label="Search Documents"
        @click="showSearch = !showSearch"
      ></UButton>
    </div>

    <div class="mt-6">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 w-full"
        @submit="onSubmit"
      >
        <UFormGroup label="Context" name="context">
          <UTextarea
            v-model="state.context"
            :rows="contextRows"
            :disabled="true"
          />
        </UFormGroup>

        <UFormGroup label="User Input" name="content">
          <UInput v-model="state.content" />
        </UFormGroup>

        <UButton
          type="submit"
          color="lime"
          label="Create"
          icon="i-mdi-chat-plus-outline"
          :loading="working"
          :disabled="working"
        ></UButton>
      </UForm>
    </div>
  </SkeletonDashboard>

  <UModal v-model="showSearch" class="w-full">
    <div class="flex flex-col p-6">
      <div class="mb-2 font-semibold flex flex-row items-center">
        <UIcon name="i-mdi-search" class="me-2"></UIcon>
        <span>Search Documents</span>
      </div>
      <div class="mb-2 text-sm">
        Check sentences that you want to add into conversation
      </div>
      <DocumentSearchBox
        :team-id="team.id"
        :allow-checking="true"
        v-model="sentenceIds"
        @document-fetched="onDocumentFetched"
      ></DocumentSearchBox>
    </div>
  </UModal>
</template>
