import { retrieveSessionUser } from "~/server/utils/user";
import { MDocument } from "~/utils/types";

export default defineEventHandler(async (event): Promise<MDocument> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const {
    title,
    content,
    documentId,
  }: { title: string; content: string; documentId: string } = await readBody(
    event
  );
  if (!title) {
    throw createError({ statusCode: 400, message: "title is required" });
  }
  if (!content) {
    throw createError({ statusCode: 400, message: "content is required" });
  }

  const { document } = await invokeBackend(event, "document_update", {
    userId: user.id,
    documentId,
    title,
    content,
  });
  return document;
});
