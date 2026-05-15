import type { AttendanceRecordInput, HifzRecordInput } from '@skooly/shared';

export type ApiClientOptions = {
  baseUrl: string;
  getAuthToken?: () => string | Promise<string | null> | null;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createApiClient(options: ApiClientOptions) {
  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = (await options.getAuthToken?.()) ?? null;
    const headers = new Headers(init.headers);
    headers.set('content-type', 'application/json');
    if (token) headers.set('authorization', `Bearer ${token}`);

    const res = await fetch(`${options.baseUrl}${path}`, { ...init, headers });
    const body = res.headers.get('content-type')?.includes('application/json')
      ? await res.json()
      : await res.text();
    if (!res.ok) throw new ApiError(`Request failed: ${res.status}`, res.status, body);
    return body as T;
  }

  return {
    hifz: {
      create(input: HifzRecordInput) {
        return request<{ id: string }>('/api/hifz', {
          method: 'POST',
          body: JSON.stringify(input),
        });
      },
    },
    attendance: {
      create(input: AttendanceRecordInput) {
        return request<{ id: string }>('/api/attendance', {
          method: 'POST',
          body: JSON.stringify(input),
        });
      },
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
