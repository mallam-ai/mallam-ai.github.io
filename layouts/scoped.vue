<script setup lang="ts">
const { data: user, refresh: refreshUser } = await useUser();

const navigationLinks = computed(() => {
  const route = useRoute();

  const org = route.params.org || "0";

  // start with default avatar of mallam-ai org
  let avatarURL = "https://avatars.githubusercontent.com/u/51222892?v=4";

  if (user.value && user.value.userId) {
    const splits = user.value.userId.split("::");
    if (splits[0] == "github") {
      avatarURL = `https://avatars.githubusercontent.com/u/${splits[1]}?v=4`;
    }
  }

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
        src: avatarURL,
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
      <UVerticalNavigation :links="navigationLinks" />
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
