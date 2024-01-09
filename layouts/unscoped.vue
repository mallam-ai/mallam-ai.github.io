<script setup lang="ts">
const { data: user, refresh: refreshUser } = await useUser();

const navigationLinks = computed(() => {
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
      label: "Teams",
      icon: "i-heroicons-building-office-2",
      to: {
        name: "dashboard",
      },
    },
    {
      label: "Profile",
      avatar: {
        src: avatarURL,
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
