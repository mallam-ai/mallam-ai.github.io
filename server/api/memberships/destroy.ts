import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { teamId, userId }: { teamId: string; userId: string } = await readBody(
    event
  );

  return await invokeBackend(event, "membership_remove", {
    teamId,
    userId: user.id,
    targetUserId: userId,
  });
});
