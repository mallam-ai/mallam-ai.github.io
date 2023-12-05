export default defineEventHandler(async (event) => {
  const session = await useAppSession(event);
  return {
    userId: session.data.userId || "",
    userName: session.data.userName || "",
  };
});
