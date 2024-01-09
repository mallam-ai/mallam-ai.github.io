<script setup lang="ts">
import { createUserAvatarURL } from "~/utils/types";

const { data: user, refresh: refreshUser } = await useUser();

const navigationLinks = computed(() => {
  const route = useRoute();

  const org = route.params.org || "0";

  return [
    {
      label: "(Current Team)",
      icon: "i-heroicons-building-office-2",
      to: {
        name: "dashboard-org",
        params: {
          org,
        },
      },
    },
    {
      label: "Chat",
      icon: "i-heroicons-chat-bubble-left-right",
      to: {
        name: "dashboard-org-chat",
        params: {
          org,
        },
      },
    },
    {
      label: "Documents",
      icon: "i-heroicons-document-text",
      to: {
        name: "dashboard-org-documents",
        params: {
          org,
        },
      },
    },
    {
      label: "Members",
      icon: "i-heroicons-users",
      to: {
        name: "dashboard-org-members",
        params: {
          org,
        },
      },
    },
    {
      label: "Teams",
      icon: "i-heroicons-building-office-2",
      to: {
        name: "dashboard-org-teams",
      },
    },
    {
      label: "Profile",
      avatar: {
        src: createUserAvatarURL(user.value),
      },
      to: {
        name: "dashboard-org-profile",
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
