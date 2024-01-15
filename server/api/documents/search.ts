import { retrieveSessionUser } from "~/server/utils/user";
import { MDocument } from "~/utils/types";

export default defineEventHandler(
  async (event): Promise<{ documents: MDocument[] }> => {
    const user = await retrieveSessionUser(event);
    if (!user.id) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }

    const { content, teamId }: { content: string; teamId: string } =
      await readBody(event);
    if (!content) {
      throw createError({ statusCode: 400, message: "content is required" });
    }

    const { documents } = await invokeBackend(event, "document_search", {
      userId: user.id,
      teamId,
      content,
    });
    return { documents };
  }
);
