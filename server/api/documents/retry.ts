import { retrieveSessionUser } from "~/server/utils/user";
import { MDocument } from "~/utils/types";

export default defineEventHandler(async (event): Promise<MDocument> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { teamId }: { teamId: string } = await readBody(event);

  return await invokeBackend(event, "document_retry_failed", {
    teamId,
    userId: user.id,
  });
});
