<script setup lang="ts">
const props = defineProps<{
    activeTeamDisplayName?: string;
}>();

const { data: user } = await useUser();

const links = computed(() => {
    const team_id = useRoute().params.team_id || '';
    if (team_id) {
        return [
            [
                {
                    label: props.activeTeamDisplayName || 'Current Team',
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
                        src: createUserAvatarURL(user.value),
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
    <UVerticalNavigation class="w-full" :ui="{ size: 'text-lg' }" :links="links" />
</template>