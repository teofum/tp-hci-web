import { APIError, AuthError } from './error';

export const BASE_URL = 'http://localhost:8080/api/';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

export class API {
  private url: URL;
  private init: RequestInit;

  public static get(url: string) {
    return new API(url, 'GET');
  }

  public static post(url: string) {
    return new API(url, 'POST');
  }

  public static put(url: string) {
    return new API(url, 'PUT');
  }

  public static delete(url: string) {
    return new API(url, 'DELETE');
  }

  public static patch(url: string) {
    return new API(url, 'PATCH');
  }

  private constructor(url: string, method: RequestInit['method']) {
    this.url = new URL(url, BASE_URL);
    this.init = { method, headers: DEFAULT_HEADERS };
  }

  public withBody(body: unknown) {
    this.init.body = JSON.stringify(body);

    return this;
  }

  public withParams(params: Record<string, string>) {
    for (const [key, value] of Object.entries(params)) {
      this.url.searchParams.set(key, value);
    }

    return this;
  }

  public withAuth() {
    const token = localStorage.getItem('token');

    if (!token) throw new AuthError();

    this.init.headers = {
      ...this.init.headers,
      Authorization: `Bearer ${token}`,
    };

    return this;
  }

  public async send() {
    const res = await fetch(this.url, this.init);

    if (!res.ok) throw new APIError(res.status, res.statusText);

    return (await res.json()) as unknown;
  }
}
