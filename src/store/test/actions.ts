import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./constants";

export const loginRequest = () => ({
  type: LOGIN_REQUEST as typeof LOGIN_REQUEST
});

export const loginSuccess = (login: string) => ({
  type: LOGIN_SUCCESS as typeof LOGIN_SUCCESS,
  login
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE as typeof LOGIN_FAILURE,
  error
});

export type Actions =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>;
