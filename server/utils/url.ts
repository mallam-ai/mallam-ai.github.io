export function createCanonicalAuthorizationCallbackURL(
  event: H3Event
): string {
  const u = new URL(getRequestURL(event).toString());
  u.pathname = "/auth/github/callback";
  return u.toString();
}
