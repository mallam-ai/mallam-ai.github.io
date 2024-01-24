export const useChat = (id: string) => {
  return useAsyncData(
    `chat-${id}`,
    () =>
      $fetch("/api/chats/get", {
        query: {
          chatId: id,
        },
        headers: decorateHeaders(),
      }),
    {
      default() {
        return defaultChat();
      },
    }
  );
};
