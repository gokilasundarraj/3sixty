const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
