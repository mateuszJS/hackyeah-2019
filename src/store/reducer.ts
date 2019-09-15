import { Action } from "redux";
import { Flight } from "../typedef";

export type ReducerState = {
  destinations?: string[];
  flights?: Flight[];
  loading: boolean | undefined;
  error: boolean | undefined;
};

export const accountInitialState = {
  destinations: undefined,
  flights: undefined,
  loading: undefined,
  error: undefined
};

export const reducer = (
  state: ReducerState = accountInitialState,
  action: Action<string> & { payload: any }
): ReducerState => {
  switch (action.type) {
    case "DESTINATIONS":
      return {
        ...state,
        destinations: action.payload
      };
    case "FLIGHTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: undefined
      };
    case "FLIGHTS_SUCCES":
      return {
        ...state,
        loading: false,
        flights: action.payload
      };
    case "FLIGHTS_FAILED":
      return {
        ...state,
        loading: false,
        error: true
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        loading: false,
        error: undefined
      };
    default:
      return state;
  }
};
