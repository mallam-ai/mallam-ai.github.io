export default defineEventHandler(async (event): Promise<{}> => {
  const user = await retrieveSessionUser(event);
  if (!user.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const { content, chatId }: { content: string; chatId: string } =
    await readBody(event);

  await invokeBackend(event, "chat_input", {
    userId: user.id,
    chatId,
    content,
  });

  return {};
});
