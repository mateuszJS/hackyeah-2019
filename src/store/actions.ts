import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import { Destination } from '../typedef';

export const fetchDestinations = async (dispatch: Dispatch<AnyAction>) => {
  const response = await axios.get<{ data: Destination[] }>('https://hy19.azurewebsites.net/dej/lotniska')
  dispatch({
    type: 'DESTINATIONS',
    payload: response.data,
  });
};
