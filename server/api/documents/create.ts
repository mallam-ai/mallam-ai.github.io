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
    teamId,
  }: { title: string; content: string; teamId: string } = await readBody(event);
  if (!title) {
    throw createError({ statusCode: 400, message: "title is required" });
  }
  if (!content) {
    throw createError({ statusCode: 400, message: "content is required" });
  }

  const { document } = await invokeBackend(event, "document_create", {
    userId: user.id,
    teamId,
    title,
    content,
  });
  return document;
});
