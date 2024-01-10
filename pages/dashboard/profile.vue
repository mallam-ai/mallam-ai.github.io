<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: user, refresh: refreshUser } = await useUser();

async function doSignOut() {
  await $fetch("/api/auth/clear");
  await refreshUser();
  navigateTo({ name: "index" });
}

const fields = computed(() => [
  {
    name: "User ID",
    content: user.value.id,
  },
  {
    name: "User Name",
    content: user.value.displayName,
  },
  {
    name: "Authentication Provider",
    content: user.value.vendor + "/" + user.value.vendorUserId,
  },
  {
    name: "Member Since",
    content: user.value.createdAt,
  },
]);
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-account-circle-outline"
    title-name="Profile"
  >
    <div class="flex flex-col">
      <PlainFields :fields="fields"></PlainFields>
      <div class="pt-6">
        <UButton
          size="sm"
          color="red"
          label="Sign out"
          icon="i-mdi-logout"
          @click.prevent="doSignOut"
        >
        </UButton>
      </div>
    </div>
  </SkeletonDashboard>
</template>
