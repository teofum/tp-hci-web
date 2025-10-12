export class AuthError extends Error {
  constructor() {
    super('Invalid authorization');

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class APIError extends Error {
  public readonly status: string;
  public readonly statusCode: number;

  constructor(statusCode: number, status: string) {
    super(status);

    this.status = status;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
