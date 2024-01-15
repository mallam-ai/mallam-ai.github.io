<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

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

const documents = ref<MDocument[]>([]);

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  working.value = true;
  try {
    const { documents: data } = await $fetch("/api/documents/search", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign(event.data, { teamId: team.value.id })
      ),
    });
    documents.value = data;
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-search"
    title-name="Search Document"
    :active-team-display-name="team.displayName"
  >
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 w-full"
      @submit="onSubmit"
    >
      <UFormGroup label="Content" name="content">
        <UTextarea v-model="state.content" :rows="2" :disabled="working" />
      </UFormGroup>

      <UButton
        type="submit"
        label="Search"
        icon="i-mdi-search"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>

    <div class="flex flex-col mt-6">
      <div
        v-for="(document, idx) of documents"
        v-bind:key="document.id"
        class="flex flex-col mb-4"
      >
        <UButton
          variant="link"
          :padded="false"
          size="lg"
          icon="i-mdi-file-document"
          :label="document.title"
          :to="{
            name: 'dashboard-team_id-documents-document_id',
            params: { team_id: team.id, document_id: document.id },
          }"
          class="mb-2"
        ></UButton>

        <p
          :class="{
            'text-slate-400': !sentence.highlighted,
            'text-amber-400': !!sentence.highlighted,
          }"
          v-for="sentence of document.sentences"
          v-bind:key="sentence.id"
        >
          {{ sentence.content }}
        </p>
      </div>
    </div>
  </SkeletonDashboard>
</template>
