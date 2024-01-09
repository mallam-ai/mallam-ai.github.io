import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { displayName }: { displayName: string } = await readBody(event);
  if (!displayName) {
    throw createError({ statusCode: 400, message: "displayName is required" });
  }
  if (displayName.length > 50) {
    throw createError({ statusCode: 400, message: "displayName is too long" });
  }
  if (displayName.length < 4) {
    throw createError({ statusCode: 400, message: "displayName is too short" });
  }

  return await invokeBackend(event, "team_create", {
    displayName,
    userId: user.id,
  });
});
