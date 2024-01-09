<script setup lang="ts">
import { createUserAvatarURL } from "~/utils/types";

const { data: user, refresh: refreshUser } = await useUser();

const navigationLinks = computed(() => {
  return [
    {
      label: "Teams",
      icon: "i-heroicons-building-office-2",
      to: {
        name: "dashboard",
      },
    },
    {
      label: "Profile",
      avatar: {
        src: createUserAvatarURL(user.value),
      },
      to: {
        name: "dashboard-profile",
      },
    },
  ];
});
</script>

<template>
  <UContainer class="flex flex-col lg:flex-row my-12">
    <div>
      <UVerticalNavigation :ui="{ size: 'text-lg' }" :links="navigationLinks" />
    </div>
    <div>
      <slot></slot>
    </div>
  </UContainer>

  <div class="flex flex-col items-center my-8">
    <Footer></Footer>
  </div>

  <UNotifications />
</template>
