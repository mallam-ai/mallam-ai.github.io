import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(async (event): Promise<{}> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { historyId }: { historyId: string } = await readBody(event);

  return await invokeBackend(event, "history_regenerate", {
    historyId,
    userId: user.id,
  });
});
