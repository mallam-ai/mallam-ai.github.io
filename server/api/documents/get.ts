import { retrieveSessionUser } from "~/server/utils/user";
import { MDocument } from "~/utils/types";

export default defineEventHandler(async (event): Promise<MDocument> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const { documentId } = getQuery(event);

  const { document } = await invokeBackend(event, "document_get", {
    userId: user.id,
    documentId,
  });
  return document;
});
