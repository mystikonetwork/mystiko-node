import { api } from '@mystikonetwork/protos';

export class MystikoError extends Error {
  readonly code: api.v1.StatusCode;

  constructor(message: string, code: api.v1.StatusCode) {
    super(message);
    this.code = code;
  }
}

export function createError(message: string, code: api.v1.StatusCode): MystikoError {
  return new MystikoError(message, code);
}

export function createErrorPromise(message: string, code: api.v1.StatusCode): Promise<any> {
  return Promise.reject(createError(message, code));
}

export function buildErrorResponse(response: api.v1.ApiResponse): MystikoError {
  const code =
    response.code ??
    new api.v1.StatusCode({
      success: false,
      error: {
        case: undefined,
        value: undefined,
      },
    });

  const message =
    response.result.case === 'errorMessage'
      ? response.result.value
      : response.result.case === undefined
        ? 'undefined'
        : '';

  return createError(message, code);
}

export function buildEmptyDataResponse(): MystikoError {
  const code = new api.v1.StatusCode({
    success: false,
    error: {
      case: undefined,
      value: undefined,
    },
  });
  const message = 'empty data error';
  return createError(message, code);
}
