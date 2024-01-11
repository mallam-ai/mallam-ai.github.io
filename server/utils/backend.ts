import { H3Event } from "h3";

/**
 * This function try fetching backend service with cloudflare service binding named `BACKEND`.
 *
 * If not set, fallback to fetch with `debugBackend.url` from runtime config
 *
 * @param event H3Event
 * @param path
 * @param init
 * @returns
 */
async function fetchBackend(
  event: H3Event,
  path: string,
  init?: RequestInit
): Promise<Response> {
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  const BACKEND = event.context?.cloudflare?.env?.BACKEND;
  if (BACKEND) {
    return BACKEND.fetch("http://backend" + path, init);
  }
  return fetch("https://api.mallam.ai" + path, init);
}

/**
 *
 * @param event H3Event
 * @param method rpc method name
 * @param args  rpc arguments
 * @returns rpc response
 */
export async function invokeBackend(
  event: H3Event,
  method: string,
  args: any
): Promise<any> {
  const config = useRuntimeConfig();

  const res = await fetchBackend(event, `/invoke/${method}`, {
    method: "POST",
    headers: {
      "X-Secret-Key": config.backend.secretKey,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(args),
  });

  if (res.ok) {
    return res.json();
  }

  const { error } = await res.json();

  throw createError({ statusCode: res.status, message: error });
}
