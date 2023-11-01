<script setup lang="ts">
definePageMeta({
  titleLabel: "Debug",
  titleIcon: "i-mdi-toolbox",
});

const config = useRuntimeConfig()
const backendSecretKeySize = config.backend.secretKey.length
</script>
<template>
  <span>{{backendSecretKeySize}}</span>
</template>