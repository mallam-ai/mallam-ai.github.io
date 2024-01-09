import { User, emptyUser } from "~/utils/types";

export async function retrieveSessionUser(event: any): Promise<User> {
  const session = await useAppSession(event);
  const id = session.data.userId || "";
  if (id) {
    const { user } = await invokeBackend(event, "user_get", { id });
    return user;
  } else {
    return emptyUser();
  }
}
