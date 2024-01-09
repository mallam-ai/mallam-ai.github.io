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
