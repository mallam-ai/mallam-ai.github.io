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
</script>

<template>
  <SkeletonDashboard
    page-icon="i-mdi-account-circle-outline"
    page-title="Profile"
  >
    <div class="flex flex-col">
      <article class="prose prose-sm dark:prose-invert">
        <p><b>User ID</b></p>
        <p>{{ user.id }}</p>
        <p><b>User Name</b></p>
        <p>{{ user.displayName }}</p>
        <p><b>Authentication Provider</b></p>
        <p>{{ user.vendor }}/{{ user.vendorUserId }}</p>
        <p><b>Member Since</b></p>
        <p>{{ user.createdAt }}</p>
      </article>
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
