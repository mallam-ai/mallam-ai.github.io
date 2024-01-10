<script setup lang="ts">
const props = defineProps<{
  titleName: string;
  titleIcon: string;
  activeTeamDisplayName?: string;
}>();

const { data: user } = await useUser();

const links = computed(() => {
  const team_id = useRoute().params.team_id || "";
  if (team_id) {
    return [
      [
        {
          label: props.activeTeamDisplayName || "(Current Team)",
          icon: "i-heroicons-user-group",
          to: {
            name: "dashboard-team_id",
            params: {
              team_id,
            },
          },
        },
        {
          label: "Chat",
          icon: "i-heroicons-chat-bubble-left-right",
          to: {
            name: "dashboard-team_id-chat",
            params: {
              team_id,
            },
          },
        },
        {
          label: "Documents",
          icon: "i-heroicons-document-text",
          to: {
            name: "dashboard-team_id-documents",
            params: {
              team_id,
            },
          },
        },
        {
          label: "Members",
          icon: "i-heroicons-users",
          to: {
            name: "dashboard-team_id-members",
            params: {
              team_id,
            },
          },
        },
      ],
      [
        {
          label: "Go Back",
          icon: "i-heroicons-arrow-left-end-on-rectangle",
          to: {
            name: "dashboard",
          },
        },
      ],
    ];
  } else {
    return [
      [
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
            src: createUserAvatarURL(
              user.value.vendor,
              user.value.vendorUserId
            ),
          },
          to: {
            name: "dashboard-profile",
          },
        },
      ],
    ];
  }
});
</script>

<template>
  <div class="flex flex-col md:flex-row my-6">
    <Head>
      <Title>MALLAM - {{ titleName }}</Title>
    </Head>

    <div
      class="w-full md:w-1/3 lg:w-1/5 px-3 py-6 flex flex-col items-center md:items-end"
    >
      <div class="mb-8 me-4">
        <ULink :to="{ name: 'index' }">
          <img src="~/assets/img/mallam-logo.png" class="w-12 rounded-sm" />
        </ULink>
      </div>

      <UVerticalNavigation
        class="w-full"
        :ui="{ size: 'text-lg' }"
        :links="links"
      />
    </div>

    <div class="w-full md:w-2/3 lg:w-4/5 px-12 py-6">
      <div class="flex flex-row items-center">
        <UIcon
          :name="titleIcon"
          class="text-2xl font-semibold me-2"
          size="lg"
        ></UIcon>
        <span class="text-2xl font-semibold">{{ titleName }}</span>
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
