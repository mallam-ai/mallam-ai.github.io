import { User, emptyUser } from "~/utils/types";

export async function retrieveSessionUser(event: any): Promise<User> {
  const session = await useAppSession(event);
  const userId = session.data.userId || "";
  if (userId) {
    const { user } = await invokeBackend(event, "user_get", { userId });
    return user;
  } else {
    return emptyUser();
  }
}
