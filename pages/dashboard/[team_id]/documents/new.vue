<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const state = reactive({
  title: "",
  content: "",
});

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

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  working.value = true;
  try {
    const document = await $fetch("/api/documents/create", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign(event.data, { teamId: team.value.id })
      ),
    });
    navigateTo({
      name: "dashboard-team_id-documents-document_id",
      params: { team_id: team.value.id, document_id: document.id },
    });
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-file-document-plus"
    title-name="New Document"
  >
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 w-full"
      @submit="onSubmit"
    >
      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="Content" name="content">
        <UTextarea v-model="state.content" :rows="24" />
      </UFormGroup>

      <UButton
        type="submit"
        color="lime"
        label="Create"
        icon="i-mdi-file-document-plus"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>
  </SkeletonDashboard>
</template>
