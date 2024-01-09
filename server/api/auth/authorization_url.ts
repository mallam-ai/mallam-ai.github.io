import { createCanonicalAuthorizationCallbackURL } from "~/server/utils/url";

export default defineEventHandler(async (event) => {
  const { vendor } = await readBody(event);
  return await invokeBackend(event, "oauth_create_authorization_uri", {
    vendor,
    redirect_uri: createCanonicalAuthorizationCallbackURL(event),
  });
});
