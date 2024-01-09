<template>
  <div
    class="flex flex-col justify-between px-4 py-6 outline outline-2 rounded-md outline-slate-700"
  >
    <div class="flex flex-col pb-6 h-40">
      <slot></slot>
    </div>
    <div>
      <slot name="button"></slot>
    </div>
  </div>
</template>
