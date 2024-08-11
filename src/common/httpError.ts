import { HttpStatus } from '@nestjs/common';

export class HttpError extends Error {
  constructor(
    msg: string,
    public readonly status: HttpStatus,
  ) {
    super(msg);

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
