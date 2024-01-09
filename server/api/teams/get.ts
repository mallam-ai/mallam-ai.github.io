import { retrieveSessionUser } from "~/server/utils/user";
import { Team, emptyTeam } from "~/utils/types";

export default defineEventHandler(async (event): Promise<Team> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const { teamId } = getQuery(event);
  if (!teamId) {
    return emptyTeam();
  }

  const { team } = await invokeBackend(event, "team_get", {
    userId: user.id,
    teamId,
  });

  return team;
});
