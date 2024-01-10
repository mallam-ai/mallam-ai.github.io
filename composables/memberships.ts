export const useTeamMemberships = async (teamId: string) => {
  return useAsyncData(
    "team-memberships-" + teamId,
    () =>
      $fetch("/api/memberships/list", {
        query: { teamId },
        headers: decorateHeaders(),
      }),
    {
      default() {
        return [];
      },
    }
  );
};
