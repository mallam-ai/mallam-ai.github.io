<script setup lang="ts">
definePageMeta({
  titleLabel: "Dataset",
  titleIcon: "i-mdi-database",
});

const items: Array<{
  name: string;
  version: string;
  cid: string;
  href: string;
}> = [
  {
    name: "marxists.org - marx",
    version: "snapshot-20231011",
    cid: "bafybeidtkoa2kw3xy4n4ndi7qsdb5nbshckx5y6eidsptrwkoguuz3cva4",
    href: "https://bafybeidtkoa2kw3xy4n4ndi7qsdb5nbshckx5y6eidsptrwkoguuz3cva4.ipfs.nftstorage.link/",
  },
];
</script>

<template>
  <div class="flex flex-col w-full md:w-3/4 lg:w-1/2">
    <div
      v-for="item of items"
      class="py-4 flex flex-row justify-between items-center"
    >
      <div class="flex flex-row justify-start items-center">
        <div class="w-1 h-16 bg-indigo-800 me-4"></div>

        <div class="flex flex-col justify-between">
          <div class="text-xl font-semibold mb-2">{{ item.name }}</div>

          <div class="flex flex-row justify-start items-center">
            <UIcon name="i-mdi-clock" class="me-1"></UIcon>
            <span class="font-mono text-sm">{{ item.version }}</span>
          </div>
        </div>
      </div>

      <UButton
        variant="ghost"
        :to="item.href"
        target="_blank"
        icon="i-mdi-archive-arrow-down"
        size="xl"
      ></UButton>
    </div>
  </div>
</template>
