import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { ComponentType } from "react";
import { connect as ReduxConnect, MapDispatchToPropsParam } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer, ReducerState } from "./reducer";

export const myAppHistory = createBrowserHistory();

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    reducer,
  });

export type AppState = {
  reducer: ReducerState;
};

export function connect({
  mapStateToProps,
  mapDispatchToProps
}: {
  mapStateToProps: (state: AppState) => object;
  mapDispatchToProps: MapDispatchToPropsParam<{}, {}>;
}): any {
  return function (target: ComponentType<never>) {
    return ReduxConnect(mapStateToProps, mapDispatchToProps)(target) as any;
  };
}

export default createStore(
  rootReducer(myAppHistory),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(myAppHistory), // for dispatching history actions
      thunk
    )
  )
);
