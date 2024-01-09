export default defineEventHandler(async (event) => {
  const { vendor, state, code } = await readBody(event);
  const redirect_uri = createCanonicalAuthorizationCallbackURL(event);
  const user_agent = getHeader(event, "user-agent") || "unknown";
  const { user } = await invokeBackend(event, "oauth_authorize_user", {
    vendor,
    redirect_uri,
    state,
    code,
    user_agent,
  });

  const session = await useAppSession(event);
  await session.update({
    userId: user.id,
    userName: user.name,
  });

  return {};
});
