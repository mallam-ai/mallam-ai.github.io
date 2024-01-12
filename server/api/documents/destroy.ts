import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(async (event): Promise<{}> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { documentId }: { documentId: string } = await readBody(event);

  return await invokeBackend(event, "document_delete", {
    userId: user.id,
    documentId,
  });
});
