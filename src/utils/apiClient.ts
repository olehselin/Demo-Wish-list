import { API_BASE_URL } from '../constants';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiError extends Error {
  status?: number;
  response?: Response;

  constructor(message: string, status?: number, response?: Response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

const buildUrl = (
  endpoint: string,
  params?: Record<string, string>
): string => {
  // If endpoint is already a full URL, use it directly
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    const url = new URL(endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  // If API_BASE_URL is empty, use relative URL
  if (!API_BASE_URL) {
    const url = new URL(endpoint, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.pathname + url.search;
  }

  // Use API_BASE_URL as base
  // API_BASE_URL already includes /api, so use it directly
  const url = new URL(endpoint, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMessage = `Failed to ${response.status === 404 ? 'find' : response.status < 500 ? 'process' : 'complete'} request`;
    throw new ApiError(errorMessage, response.status, response);
  }
  return response.json();
};

export const apiClient = {
  get: async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);

    const response = await fetch(url, {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    return handleResponse<T>(response);
  },

  post: async <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);
    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse<T>(response);
  },

  put: async <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);
    const response = await fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);
    const response = await fetch(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);
    const response = await fetch(url, {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    return handleResponse<T>(response);
  },
};

export { ApiError };
