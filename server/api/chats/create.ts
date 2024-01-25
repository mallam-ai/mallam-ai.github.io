import { MChat } from "~/utils/types";

export default defineEventHandler(async (event): Promise<MChat> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const {
    title,
    context,
    content,
    teamId,
  }: { title: string; context: string; content: string; teamId: string } =
    await readBody(event);

  const { chat } = await invokeBackend(event, "chat_create", {
    userId: user.id,
    teamId,
    title,
    content,
    context,
  });

  return chat;
});
