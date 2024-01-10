import { retrieveSessionUser } from "~/server/utils/user";
import { User, emptyUser } from "~/utils/types";

export default defineEventHandler(async (event): Promise<User> => {
  return retrieveSessionUser(event);
});
