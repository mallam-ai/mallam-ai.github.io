<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const model = defineModel<Array<string>>();

const props = defineProps<{
  teamId: string;
  allowChecking?: boolean;
}>();

const emit = defineEmits<{
  "document-fetched": [document: MDocument];
}>();

const state = reactive({
  content: "",
});

const doneSearch = ref(false);

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

const documents = ref<MDocument[]>([]);

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  working.value = true;
  try {
    const { documents: data } = await $fetch("/api/documents/search", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(Object.assign(event.data, { teamId: props.teamId })),
    });
    data.forEach((x) => {
      emit("document-fetched", x);
    });
    documents.value = data;
  } finally {
    doneSearch.value = true;
    working.value = false;
  }
}

function onSentenceChecked(id: string, checked: boolean) {
  if (checked) {
    model.value = [...(model.value ?? []), id];
  } else {
    model.value = model.value?.filter((x) => x !== id) ?? [];
  }
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4 w-full"
    @submit="onSubmit"
  >
    <UFormGroup name="content">
      <UInput v-model="state.content" :disabled="working" />
    </UFormGroup>

    <UButton
      type="submit"
      label="Search"
      icon="i-mdi-search"
      :loading="working"
      :disabled="working"
    ></UButton>
  </UForm>

  <div v-if="doneSearch" class="flex flex-col mt-6">
    <div
      v-if="documents.length === 0"
      class="flex flex-row justify-center py-4"
    >
      <span>No Result</span>
    </div>
    <div
      v-for="(document, idx) of documents"
      v-bind:key="document.id"
      class="flex flex-col mb-4"
    >
      <div class="flex flex-row mb-2">
        <span class="font-semibold" v-if="allowChecking">{{
          document.title
        }}</span>
        <UButton
          v-else
          variant="link"
          :padded="false"
          size="lg"
          icon="i-mdi-file-document"
          :label="document.title"
          :to="{
            name: 'dashboard-team_id-documents-document_id',
            params: { team_id: props.teamId, document_id: document.id },
          }"
          class="mb-2"
        ></UButton>
      </div>

      <div
        v-for="sentence of document.sentences"
        v-bind:key="sentence.id"
        class="mb-1"
      >
        <UCheckbox
          class="inline-block me-2"
          v-if="allowChecking"
          :model-value="model?.includes(sentence.id)"
          @update:model-value="(value) => onSentenceChecked(sentence.id, value)"
        ></UCheckbox>
        <span
          :class="{
            'text-slate-400': !sentence.highlighted,
            'text-amber-400': !!sentence.highlighted,
          }"
          >{{ sentence.content }}</span
        >
      </div>
    </div>
  </div>
</template>
