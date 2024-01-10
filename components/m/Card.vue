<script setup lang="ts">
const props = defineProps<{
  bodyHeight?: number;
}>();

const bodyClass = computed(() => {
  return {
    "h-40": !props.bodyHeight,
    [`h-${props.bodyHeight}`]: !!props.bodyHeight,
    flex: true,
    "flex-col": true,
    "pb-6": true,
  };
});
</script>

<template>
  <div
    class="flex flex-col justify-between px-4 py-6 outline outline-2 rounded-md outline-slate-700"
  >
    <div :class="bodyClass">
      <slot></slot>
    </div>
    <div>
      <slot name="button"></slot>
    </div>
  </div>
</template>
