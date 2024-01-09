<script setup lang="ts">
const props = defineProps<{
  pageTitle: string;
  pageIcon: string;
  activeTeamDisplayName?: string;
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row my-6">
    <Head>
      <Title>MALLAM - {{ pageTitle }}</Title>
    </Head>

    <div
      class="w-full md:w-1/3 lg:w-1/5 px-3 py-6 flex flex-col items-center md:items-end"
    >
      <div class="mb-8 me-4">
        <ULink :to="{ name: 'index' }">
          <img src="~/assets/img/mallam-logo.png" class="w-12 rounded-sm" />
        </ULink>
      </div>
      <DashboardNavigation
        :active-team-display-name="activeTeamDisplayName"
      ></DashboardNavigation>
    </div>

    <div class="w-full md:w-2/3 lg:w-4/5 px-12 py-6">
      <div class="flex flex-row items-center">
        <UIcon
          :name="pageIcon"
          class="text-2xl font-semibold me-2"
          size="lg"
        ></UIcon>
        <span class="text-2xl font-semibold">{{ pageTitle }}</span>
      </div>
      <div class="flex flex-col mt-8 px-1">
        <slot></slot>
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center my-12">
    <Footer></Footer>
  </div>
</template>
