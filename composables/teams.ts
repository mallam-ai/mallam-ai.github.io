export const useCurrentTeam = () => {
  const teamId = useRoute().params.team_id as string;
  return useTeam(teamId);
};

export const useTeams = async () => {
  return useAsyncData(
    "teams",
    () =>
      $fetch("/api/teams/list", {
        headers: decorateHeaders(),
      }),
    {
      default() {
        return [];
      },
    }
  );
};

export const useTeam = async (teamId: string) => {
  return useAsyncData(
    "team-" + teamId,
    () =>
      $fetch("/api/teams/get", {
        query: { teamId },
        headers: decorateHeaders(),
      }),
    {
      default() {
        return emptyTeam();
      },
    }
  );
};
