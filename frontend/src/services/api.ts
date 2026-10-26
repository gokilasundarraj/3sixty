/**
 * src/services/api.ts
 * Central fetch helper for all backend calls.
 *
 * Rules:
 *  - Base URL always comes from VITE_API_URL (no hardcoding).
 *  - Only Content-Type: application/json is added (keeps preflight simple).
 *  - 30 s timeout via AbortController.
 *  - One automatic retry — Render free tier cold-starts can take 30-60 s.
 */

// ─── Base URL ─────────────────────────────────────────────────────────────────
// Strip any trailing slash so callers can safely prefix with "/endpoint".
function resolveBaseUrl(): string {
  const env = (import.meta.env.VITE_API_URL as string | undefined) ?? '';
  if (env) return env.replace(/\/+$/, '');
  // Fallback: same origin (only works when backend serves the frontend build)
  return '/api';
}

export const API_BASE_URL = resolveBaseUrl();

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
  /** Set to true when the request had to retry due to a cold-start timeout */
  retried?: boolean;
}

// ─── Core fetch helper ────────────────────────────────────────────────────────
const TIMEOUT_MS = 30_000; // 30 seconds

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * apiRequest — wraps fetch with:
 *  - Correct base URL
 *  - Automatic Content-Type header for JSON bodies
 *  - 30 s timeout
 *  - 1 automatic retry (for Render cold-start)
 *  - Structured error categorisation
 *
 * @param onColdStart  Optional callback fired before the retry so the UI can
 *                     show "Server is waking up, please wait…"
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  onColdStart?: () => void,
): Promise<ApiResponse<T>> {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${path}`;

  // Only inject Content-Type for non-FormData JSON bodies
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const requestInit: RequestInit = {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string> | undefined) },
  };

  let lastError: unknown;
  let retried = false;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(url, requestInit, TIMEOUT_MS);

      // Parse body (may be empty on some 204s)
      const text = await res.text();
      let json: Record<string, unknown> = {};
      try {
        json = text ? (JSON.parse(text) as Record<string, unknown>) : {};
      } catch {
        // Non-JSON response (e.g. HTML error page from proxy)
        console.error(`[API] Non-JSON response from ${endpoint}:`, text.slice(0, 300));
      }

      console.log(`[API] ${options.method ?? 'GET'} ${endpoint} → ${res.status}`, json);

      if (!res.ok) {
        const message =
          (json.message as string | undefined) ||
          `Server returned ${res.status} ${res.statusText}`;
        return {
          success: false,
          message,
          errors: json.errors,
          data: json.data as T | undefined,
          retried,
        };
      }
      return { ...(json as unknown as ApiResponse<T>), retried };
    } catch (err: unknown) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError';
      const isNetworkErr = err instanceof TypeError;

      if (attempt === 0 && (isAbort || isNetworkErr)) {
        // First failure — likely a cold start. Fire the callback and retry once.
        retried = true;
        console.warn(`[API] ${endpoint} attempt 1 failed (${isAbort ? 'timeout' : 'network'}). Retrying…`);
        onColdStart?.();
        continue;
      }

      // Second failure — give up
      break;
    }
  }

  // Build a human-readable error from the last exception
  const isAbort = lastError instanceof DOMException && (lastError as DOMException).name === 'AbortError';
  const message = isAbort
    ? 'Request timed out. The server may still be waking up — please try again in a moment.'
    : lastError instanceof Error
      ? `Network error: ${lastError.message}`
      : 'Network error or backend unreachable. Please try again.';

  console.error(`[API] ${endpoint} failed after retry:`, lastError);

  return { success: false, message, retried };
}

export default apiRequest;
