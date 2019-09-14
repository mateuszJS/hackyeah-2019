import { Action } from 'redux';

export type ReducerState = {
  destinations?: string[]
};

export const accountInitialState = {
  destinations: undefined,
};

export const reducer = (
  state: ReducerState = accountInitialState,
  action: Action<string> & { payload: any }
): ReducerState => {
  switch (action.type) {
    case 'DESTINATIONS':
      return {
        ...state,
        destinations: action.payload,
      };
    default:
      return state;
  }
};
