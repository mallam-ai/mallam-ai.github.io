import { retrieveSessionUser } from "~/server/utils/user";
import { MChat, MHistory } from "~/utils/types";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

export default defineEventHandler(async (event): Promise<MChat> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const { chatId } = getQuery(event);

  const { chat } = await invokeBackend(event, "chat_get", {
    userId: user.id,
    chatId,
  });

  if (chat.histories) {
    for (const history of chat.histories) {
      try {
        history.contentHtml = sanitizeHtml(await marked.parse(history.content));
      } catch (_) {
        history.contentHtml = history.content;
      }
    }
  }

  return chat;
});
