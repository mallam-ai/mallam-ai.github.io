<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const state = reactive({});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const { data: document, refresh: refreshDocument } = await useCurrentDocument();

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  if (!confirm("Confirm to delete document?")) {
    return;
  }
  working.value = true;
  try {
    await $fetch("/api/documents/destroy", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ documentId: document.value.id }),
    });
    navigateTo({
      name: "dashboard-team_id-documents",
      params: { team_id: team.value.id },
    });
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-trash"
    title-name="Delete Document"
    :active-team-display-name="team.displayName"
  >
    <UForm :state="state" class="space-y-4 w-160" @submit="onSubmit">
      <UFormGroup label="Document ID" name="id">
        <Label class="text-sm">{{ document.id }}</Label>
      </UFormGroup>
      <UFormGroup label="Document Title" name="title">
        <Label class="text-sm">{{ document.title }}</Label>
      </UFormGroup>

      <UButton
        type="submit"
        color="red"
        label="Delete"
        icon="i-heroicons-trash"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>
  </SkeletonDashboard>
</template>
