<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const state = reactive({
  displayName: "",
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
    const { team, membership } = await $fetch("/api/teams/create", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(event.data),
    });
    navigateTo({ name: "dashboard-team_id", params: { team_id: team.id } });
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-account-multiple-plus-outline"
    title-name="Create Team"
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
        label="Create Team"
        icon="i-mdi-account-multiple-plus-outline"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>
  </SkeletonDashboard>
</template>
