// import { accountConstants } from "./constants";
import { ThunkDispatch } from "redux-thunk";
import { accountService } from "../../services/account.service";
import { AppState } from "../configureStore";
import { Actions, loginFailure, loginRequest, loginSuccess } from "./actions";

export const loginUser = (username: string, password: string) => async (
  dispatch: ThunkDispatch<AppState, {}, Actions>
) => {
  dispatch(loginRequest());

  accountService.login(username, password).then(
    result => {
      if (result.data) {
        dispatch(loginSuccess(username));
      }
    },
    error => {
      dispatch(loginFailure(""));
    }
  );
};