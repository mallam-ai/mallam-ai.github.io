<template>
  <div class="flex flex-col lg:flex-row my-12">
    <div class="w-full lg:w-1/3 flex flex-col items-end">
      <slot name="left"></slot>
    </div>
    <div class="w-full lg:w-2/3">
      <slot></slot>
    </div>
  </div>
</template>
