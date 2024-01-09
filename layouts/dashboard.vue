<script setup lang="ts">
import { createUserAvatarURL } from "~/utils/types";

const titleLabel = computedTitleLabel();

const titleIcon = computedTitleIcon();

const { data: user, refresh: refreshUser } = await useUser();

const navigationLinks = computed(() => {
  const route = useRoute();
  const org = route.params.org || "";

  if (org) {
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
  } else {
    return [
      {
        label: "Teams",
        icon: "i-heroicons-user-group",
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
  }
});
</script>

<template>
  <Head>
    <Title>MALLAM - {{ titleLabel }}</Title>
  </Head>

  <div class="flex flex-col md:flex-row my-6">
    <div
      class="w-full md:w-1/3 lg:w-1/5 px-3 py-6 flex flex-col items-center md:items-end"
    >
      <div class="mb-8 me-4">
        <ULink :to="{ name: 'index' }">
          <img src="~/assets/img/mallam-logo.png" class="w-12 rounded-sm" />
        </ULink>
      </div>
      <UVerticalNavigation
        class="w-full md:w-2/3"
        :ui="{ size: 'text-lg' }"
        :links="navigationLinks"
      />
    </div>
    <div class="w-full md:w-2/3 lg:w-4/5 px-12 py-6">
      <div class="flex flex-row items-center">
        <UIcon
          :name="titleIcon"
          class="text-2xl font-semibold me-2"
          size="lg"
        ></UIcon>
        <span class="text-2xl font-semibold">{{ titleLabel }}</span>
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
