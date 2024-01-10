<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const state = reactive({
  teamId: "",
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.teamId) {
    errors.push({ path: "teamId", message: "Required" });
  }
  if (state.teamId !== team.value.id) {
    errors.push({ path: "teamId", message: "Team ID Mismatch" });
  }
  return errors;
};

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  if (!confirm("Confirm to delete team?")) {
    return;
  }
  working.value = true;
  try {
    await $fetch("/api/teams/leave", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(event.data),
    });
    navigateTo({ name: "dashboard" });
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-trash"
    :title-name="'Delete Team: ' + team.displayName"
    :active-team-display-name="team.displayName"
  >
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 w-80"
      @submit="onSubmit"
    >
      <UFormGroup label="Team ID" name="teamId">
        <UInput v-model="state.teamId" />
      </UFormGroup>

      <UButton
        type="submit"
        color="red"
        label="Leave Team"
        icon="i-heroicons-arrow-left-end-on-rectangle"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>
  </SkeletonDashboard>
</template>
