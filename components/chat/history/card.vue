<script setup lang="ts">
const props = defineProps<{
  item: History;
}>();

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
      padding: "px-2 py-1",
    },
  };
});
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
