<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
  >
    <slot></slot>
  </div>

  <div class="absolute bottom-0 left-0 w-full flex flex-col items-center pb-8">
    <Footer></Footer>
  </div>
</template>
