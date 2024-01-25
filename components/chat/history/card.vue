<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import type { MHistory } from "~/utils/types";

const props = defineProps<{
  item: MHistory;
}>();

const emit = defineEmits<{
  regenerated: [historyId: string];
}>();

const timeAgo = computed(() => {
  return formatTimeAgo(new Date(props.item.createdAt));
});

const ui = computed(() => {
  const background = (function () {
    switch (props.item.role) {
      case "assistant":
        return "bg-white dark:bg-indigo-900";
      case "user":
        return "bg-white dark:bg-lime-900";
      default:
        return "bg-white dark:bg-gray-900";
    }
  })();
  return {
    background,
    header: {
      base: "flex flex-row justify-between items-center",
      padding: "px-2 py-1",
    },
  };
});

const regenerating = ref(false);

const generating = computed(() => {
  return props.item.status === "generating";
});

async function regenerateHistory() {
  regenerating.value = true;
  try {
    await $fetch("/api/chats/retry", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ historyId: props.item.id }),
    });
    props.item.status = "generating";
    emit("regenerated", props.item.id);
  } catch (error) {
    console.error(error);
  } finally {
    regenerating.value = false;
  }
}
</script>

<template>
  <UCard :ui="ui">
    <template #header>
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

        <UButton
          v-if="item.role === 'assistant' && item.status !== 'generating'"
          class="ms-2"
          variant="ghost"
          size="sm"
          icon="i-mdi-refresh"
          label="Regenerate"
          @click="regenerateHistory"
          :disabled="regenerating || generating"
          :working="regenerating"
        ></UButton>
      </div>
      <div class="text-slate-400 text-sm">
        <span>{{ timeAgo }}</span>
      </div>
    </template>

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
</template>
