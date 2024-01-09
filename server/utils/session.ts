import type { H3Event } from "h3";
import { useSession } from "h3";

export type AppSessionData = {
  userId?: string;
};

export async function useAppSession(event: H3Event): Promise<{
  readonly id: string | undefined;
  readonly data: AppSessionData;
  update: (update: any) => Promise<any>;
  clear: () => Promise<any>;
}> {
  const { session } = useRuntimeConfig();

  return await useSession<AppSessionData>(event, {
    maxAge: 3600 * 24 * 5,
    password: session.secretKey,
    sessionHeader: false,
    cookie: {
      maxAge: 3600 * 24 * 5,
      secure: false,
      httpOnly: true,
    },
  });
}
