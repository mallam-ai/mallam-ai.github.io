import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { teamId }: { teamId: string } = await readBody(event);

  return await invokeBackend(event, "team_delete", {
    teamId,
    userId: user.id,
  });
});
