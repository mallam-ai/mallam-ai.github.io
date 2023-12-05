export function passthroughHeaders() {
  return useRequestHeaders(["Cookie"]);
}
