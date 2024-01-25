<script setup lang="ts">
import { useInterval } from "@vueuse/core";
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const chatId = (useRoute().params.chat_id ?? "").toString();

const { data: chat, refresh: refreshChat } = await useChat(chatId);

const state = reactive({
  content: "",
});

const waiting = computed(() => {
  const histories = chat.value?.histories || [];
  if (histories.length === 0) {
    return true;
  }
  const history = histories[histories.length - 1];
  return (
    history.role === "assistant" &&
    history.status !== "generated" &&
    history.status !== "failed"
  );
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
    await $fetch("/api/chats/input", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign({}, event.data, {
          chatId: chat.value.id,
        })
      ),
    });
    await refreshChat();
    state.content = "";
  } finally {
    working.value = false;
  }
}

const refreshTimer = useInterval(5000);

watch(
  refreshTimer,
  () => {
    if (waiting.value) {
      refreshChat();
    }
  },
  { immediate: false }
);
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-chat-processing"
    :title-name="'Chat with AI: ' + chat.title"
    :active-team-display-name="team.displayName"
  >
    <div>
      <UCard class="mb-3" v-for="item in chat.histories" v-bind:key="item.id">
        <div class="font-semibold flex flex-row items-center my-2">
          <UIcon
            class="me-1"
            name="i-mdi-desktop-classic"
            v-if="item.role === 'system'"
          ></UIcon>
          <UIcon
            class="me-1"
            name="i-mdi-robot"
            v-else-if="item.role === 'assistant'"
          ></UIcon>
          <UIcon
            class="me-1"
            name="i-mdi-user"
            v-else-if="item.role === 'user'"
          ></UIcon>

          <span v-if="item.role === 'system'">System</span>
          <span v-else-if="item.role === 'assistant'">AI</span>
          <span v-else-if="item.role === 'user'">User</span>
        </div>

        <div
          v-if="
            item.role === 'assistant' &&
            (item.status === 'pending' || item.status === 'generating')
          "
          class="text-slate-400"
        >
          Waiting...
        </div>
        <div
          v-else-if="
            item.role === 'assistant' &&
            (item.status === 'failed' || item.status === 'none')
          "
          class="text-red-400"
        >
          Failed
        </div>
        <article
          v-else
          class="prose dark:prose-invert"
          v-html="item.contentHtml"
        ></article>
      </UCard>
    </div>
    <UCard class="mt-6">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 w-full"
        @submit="onSubmit"
      >
        <UFormGroup label="User Input" name="content">
          <UInput v-model="state.content" :disabled="working || waiting" />
        </UFormGroup>

        <UButton
          type="submit"
          color="lime"
          label="Submit"
          icon="i-mdi-chat-plus-outline"
          :loading="working"
          :disabled="working || waiting"
        ></UButton>
      </UForm>
    </UCard>
  </SkeletonDashboard>
</template>
