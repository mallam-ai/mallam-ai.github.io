<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const state = reactive({
  displayName: team.value.displayName,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.displayName) {
    errors.push({ path: "displayName", message: "Required" });
  }
  if (state.displayName.length > 50) {
    errors.push({ path: "displayName", message: "Too long" });
  }
  if (state.displayName.length < 4) {
    errors.push({ path: "displayName", message: "Too short" });
  }
  return errors;
};

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  working.value = true;
  try {
    await $fetch("/api/teams/update", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign({}, event.data, {
          teamId: team.value.id,
        })
      ),
    });
    navigateTo({
      name: "dashboard-team_id",
      params: { team_id: team.value.id },
    });
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-heroicons-pencil-square"
    :title-name="'Edit Team: ' + team.displayName"
    :active-team-display-name="team.displayName"
  >
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 w-80"
      @submit="onSubmit"
    >
      <UFormGroup label="Display Name" name="displayName">
        <UInput v-model="state.displayName" />
      </UFormGroup>

      <UButton
        type="submit"
        color="lime"
        label="Update Team"
        icon="i-heroicons-pencil-square"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>
  </SkeletonDashboard>
</template>
