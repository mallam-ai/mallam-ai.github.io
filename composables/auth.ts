import { passthroughHeaders } from "~/utils/headers";

export const useUser = async () => {
  return useAsyncData(
    "user",
    () =>
      $fetch("/api/auth/check", {
        headers: passthroughHeaders(),
      }),
    {
      default() {
        return { userId: "", userName: "" };
      },
    }
  );
};
