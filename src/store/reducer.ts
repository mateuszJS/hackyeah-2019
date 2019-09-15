import { Action } from "redux";
import { Flight } from "../typedef";

export type ReducerState = {
  destinations?: string[];
  flights?: Flight[];
};

export const accountInitialState = {
  destinations: undefined,
  flights: undefined
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
    case "FLIGHTS":
      return {
        ...state,
        flights: action.payload
      };
    default:
      return state;
  }
};
