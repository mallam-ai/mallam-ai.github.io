<script setup lang="ts">
import type { BadgeSize } from "@nuxt/ui/dist/runtime/types";

const props = defineProps<{
  document: MDocument;
  size?: BadgeSize;
}>();

const { document, size } = toRefs(props);

const sentencesTotal = computed(() => {
  return (document.value.sentences || []).length;
});

const sentencesAnalyzed = computed(() => {
  return (document.value.sentences || []).filter((s) => s.isAnalyzed).length;
});
</script>

<template>
  <template v-if="document.status === DocumentStatus.Analyzed">
    <UBadge
      v-if="document.sentences"
      :size="size"
      variant="subtle"
      color="lime"
    >
      <UIcon class="me-1" name="i-mdi-check"></UIcon>
      <span>Analyzed</span>
    </UBadge>
  </template>

  <UBadge
    :size="size"
    v-else-if="document.status === DocumentStatus.Failed"
    variant="subtle"
    color="red"
  >
    <UIcon class="me-1" name="i-mdi-alert"></UIcon>
    <span>Failed Analyzing</span>
  </UBadge>

  <UBadge
    :size="size"
    v-else-if="document.sentences"
    variant="subtle"
    color="amber"
  >
    <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
    <span>{{ sentencesAnalyzed }}/{{ sentencesTotal }} Analyzed</span>
  </UBadge>

  <UBadge :size="size" v-else variant="subtle" color="amber">
    <UIcon class="me-1" name="i-mdi-timer-sand"></UIcon>
    <span>Analyzing</span>
  </UBadge>
</template>
