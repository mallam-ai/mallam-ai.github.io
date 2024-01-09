import { User, emptyUser } from "~/utils/types";

export default defineEventHandler(async (event): Promise<User> => {
  const session = await useAppSession(event);
  const id = session.data.userId || "";
  if (id) {
    const { user } = await invokeBackend(event, "user_get", { id });
    return user;
  } else {
    return emptyUser();
  }
});
