export function decorateHeaders(
  extras?: Record<string, string>
): Record<string, string> {
  const headers: Record<string, string> = useRequestHeaders(["Cookie"]);
  for (const key in extras) {
    headers[key] = extras[key];
  }
  return headers;
}
