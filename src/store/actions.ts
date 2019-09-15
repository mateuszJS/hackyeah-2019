import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import Routes from "../routes/urls";
import { Destination, FetchFlightsParams } from "../typedef";
import { myAppHistory } from "./configureStore";

export const fetchDestinations = async (dispatch: Dispatch<AnyAction>) => {
  const response = await axios.get<{ data: Destination[] }>(
    "https://hy19.azurewebsites.net/dej/lotniska"
  );
  dispatch({
    type: "DESTINATIONS",
    payload: response.data
  });
};

export const fetchFlights = async ({
  dispatch,
  params
}: {
  dispatch: Dispatch<AnyAction>;
  params: FetchFlightsParams;
}) => {
  try {
    dispatch({
      type: "FLIGHTS_REQUEST"
    });

    const responseToken = await axios.get<any>(
      "https://hy19.azurewebsites.net/token/new"
    );

    axios.defaults.headers["Authorization"] = responseToken.data;
    axios.defaults.headers["X-Api-Key"] =
      "9YFNNKS31u9gCFKPetPWdAAjEXnED0B3K18AeYgg";
    const response = await axios.post<any>(
      "https://api.lot.com/flights-dev/v2/booking/availability",
      params
    );

    if (response.data.status === "200") {
      dispatch({
        type: "FLIGHTS_SUCCES",
        payload: response.data.data
      });
      myAppHistory.push(Routes.Flights);
    }
  } catch (error) {
    dispatch({
      type: "FLIGHTS_FAILED"
    });
  }
};

export const closeSnackbar = async ({
  dispatch
}: {
  dispatch: Dispatch<AnyAction>;
}) => {
  dispatch({
    type: "CLOSE_SNACKBAR"
  });
};
