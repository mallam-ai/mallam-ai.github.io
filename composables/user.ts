import { decorateHeaders } from "~/utils/headers";
import { emptyUser } from "~/utils/types";

export const useUser = async () => {
  return useAsyncData(
    "user",
    () =>
      $fetch("/api/auth/check", {
        headers: decorateHeaders(),
      }),
    {
      default() {
        return emptyUser();
      },
    }
  );
};
