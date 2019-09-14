export interface ApiResultBase {
  success: boolean;
  error?: Error;
}

export interface Error {
  errorCode: number;
  messages: Array<string>;
}

export interface ApiResult<T> extends ApiResultBase {
  data: T;
}
