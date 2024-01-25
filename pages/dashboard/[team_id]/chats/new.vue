<script setup lang="ts">
import { uniqBy, sortBy, cloneDeep } from "lodash";
import type { FormError, FormSubmitEvent } from "#ui/types";
import { _textDecorationColor } from "#tailwind-config/theme";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const state = reactive({
  content: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
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
    const context = selectedDocuments.value
      .map((d) => {
        return (
          'In document: "' +
          (d.title || "").replaceAll('"', "") +
          '"\n' +
          (d.sentences || []).map((s) => `- ${s.content}`).join("\n") +
          "\n"
        );
      })
      .join("\n");
    const chat = await $fetch("/api/chats/create", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign({}, event.data, {
          teamId: team.value.id,
          title: event.data.content,
          context,
        })
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

const sentenceIds = ref<Array<string>>([]);

const database = ref<Record<string, MDocument>>({});

const selectedDocuments = computed(() => {
  const result: MDocument[] = [];
  for (let [id, doc] of Object.entries(database.value)) {
    doc = cloneDeep(doc);
    doc.sentences = (doc.sentences || []).filter((s) =>
      sentenceIds.value.includes(s.id)
    );
    if (doc.sentences.length > 0) {
      result.push(doc);
    }
  }
  return result;
});

function removeSelectedSentence(id: string) {
  const _sentenceIds = cloneDeep(sentenceIds.value);
  const index = _sentenceIds.indexOf(id);
  if (index >= 0) {
    _sentenceIds.splice(index, 1);
  }
  sentenceIds.value = _sentenceIds;
}

function removeSelectedDocument(id: string) {
  const doc = database.value[id];
  const _sentenceIds = cloneDeep(sentenceIds.value);
  if (doc) {
    doc.sentences?.forEach((s) => {
      const index = _sentenceIds.indexOf(s.id);
      if (index >= 0) {
        _sentenceIds.splice(index, 1);
      }
    });
  }
  sentenceIds.value = _sentenceIds;
}

function onDocumentFetched(doc: MDocument) {
  const _database = cloneDeep(database.value);

  if (_database[doc.id]) {
    const _doc = _database[doc.id];
    if (!_doc.sentences || _doc.sentences.length === 0) {
      _doc.sentences = doc.sentences || [];
    } else {
      _doc.sentences = _doc.sentences.concat(doc.sentences ?? []);
    }
    _doc.sentences = uniqBy(_doc.sentences, "id");
    _doc.sentences = sortBy(_doc.sentences, "sequenceId");
  } else {
    _database[doc.id] = doc;
  }

  database.value = _database;
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-chat-plus-outline"
    title-name="New Conversation with AI"
    :active-team-display-name="team.displayName"
  >
    <div class="flex flex-row items-center mb-4">
      <div
        class="flex flex-row justify-center items-center text-lg font-semibold"
      >
        <UIcon name="i-mdi-file-cabinet" class="me-2"></UIcon>
        <span>Attached Documents</span>
      </div>
      <div>
        <UButton
          class="ms-2"
          size="xs"
          icon="i-mdi-search"
          label="Search Documents"
          @click="showSearch = !showSearch"
        ></UButton>
      </div>
    </div>

    <div v-if="selectedDocuments.length === 0">
      <span class="text-slate-400 py-2">No Documents Attached</span>
    </div>

    <div v-for="document in selectedDocuments" class="mb-4">
      <div class="flex flex-row items-center">
        <UIcon name="i-mdi-file-document" class="me-2"></UIcon>
        <span class="font-medium">{{ document.title }}</span>
        <UButton
          icon="i-mdi-trash"
          color="red"
          size="xs"
          variant="ghost"
          class="ms-2"
          @click="removeSelectedDocument(document.id)"
        ></UButton>
      </div>
      <div v-for="sentence in document.sentences">
        <span class="text-slate-400">{{ sentence.content }}</span>
        <UButton
          icon="i-mdi-trash"
          color="red"
          size="xs"
          variant="ghost"
          class="ms-2"
          @click="removeSelectedSentence(sentence.id)"
        ></UButton>
      </div>
    </div>

    <div class="mt-6">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 w-full"
        @submit="onSubmit"
      >
        <UFormGroup label="User Input" name="content">
          <UInput
            v-model="state.content"
            :disabled="working"
            placeholder="Input here..."
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="lime"
          label="Submit"
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
