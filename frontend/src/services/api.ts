const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // When running in production (e.g. Render) or any non-Vite port, use relative '/api'
  if (typeof window !== 'undefined' && window.location.port !== '5173') {
    return '/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; errors?: any }> {
  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  // If not FormData, default to application/json
  if (!(options.body instanceof FormData) && !('Content-Type' in headers)) {
    (headers as any)['Content-Type'] = 'application/json';
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: json.message || `Request failed with status ${res.status}`,
        errors: json.errors,
      };
    }

    return json;
  } catch (err: any) {
    console.warn(`[API Network Warning] Endpoint ${endpoint} unreachable:`, err.message);
    return {
      success: false,
      message: 'Network error or backend unreachable. Please try again.',
    };
  }
}

export default apiRequest;
