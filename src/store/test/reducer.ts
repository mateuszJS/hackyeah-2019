import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./constants";
import { Actions } from "./actions";
import { Account } from "../../typedef/account";

export type AccountState = {
  loading: boolean;
  loggedIn: boolean;
  user: Account;
  error: string | undefined;
};

export const accountInitialState = {
  loading: false,
  loggedIn: false,
  user: {
    id: "",
    login: "",
    password: "",
    rememberMe: false,
    firstName: "",
    lastName: ""
  },
  error: undefined
};

export const accountReducer = (
  state: AccountState = accountInitialState,
  action: Actions
): AccountState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        error: undefined,
        loading: true
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: {
          ...state.user,
          login: action.login
        }
      };
    }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
