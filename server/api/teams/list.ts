import { retrieveSessionUser } from "~/server/utils/user";
import { Team } from "~/utils/types";

export default defineEventHandler(async (event): Promise<Array<Team>> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { teams } = await invokeBackend(event, "team_list", {
    userId: user.id,
  });
  return teams;
});
