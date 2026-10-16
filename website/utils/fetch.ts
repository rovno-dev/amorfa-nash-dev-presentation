import { toast } from "sonner";

export interface FetchResult {
  response?: Response;
  json?: any;
}

interface FetchOptions {
  method?: string;
  body?: BodyInit | null;
  isToast?: boolean;
  headers?: Record<string, string>;
}

export async function $fetch(
  route: string,
  { method = "GET", body = null, isToast = true, headers = {} }: FetchOptions = {},
): Promise<FetchResult> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const url = `${apiBase}${route}`;

  const response = await fetch(url, {
    method,
    body,
    headers: { Accept: "application/json", ...headers },
  });

  let json: any;
  try {
    json = await response.json();
  } catch {
    json = undefined;
  }

  const message = json?.detail ?? json?.message;
  if (message && isToast) {
    if (response.ok) toast.success(message);
    else toast.error(message);
  }

  return { response, json };
}
