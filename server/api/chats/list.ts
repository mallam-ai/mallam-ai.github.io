import { retrieveSessionUser } from "~/server/utils/user";
import { Chat } from "~/utils/types";

export default defineEventHandler(
  async (
    event
  ): Promise<{
    chats: Array<Chat>;
    offset: number;
    limit: number;
    total: number;
  }> => {
    const user = await retrieveSessionUser(event);
    if (!user.id) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }
    const { teamId, offset, limit } = getQuery(event);

    return await invokeBackend(event, "chat_list", {
      teamId,
      userId: user.id,
      offset: parseInt(offset?.toString() || "0"),
      limit: parseInt(limit?.toString() || "20"),
    });
  }
);
