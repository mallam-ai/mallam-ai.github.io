import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const {
    teamId,
    role,
    userId,
  }: { teamId: string; role: string; userId: string } = await readBody(event);

  return await invokeBackend(event, "membership_add", {
    teamId,
    userId: user.id,
    role,
    targetUserId: userId.trim(),
  });
});
