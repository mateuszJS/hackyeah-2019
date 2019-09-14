import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';

export const fetchDestinations = async (dispatch: Dispatch<AnyAction>) => {
  const response = await axios.get<{ data: string[] }>('https://hy19.azurewebsites.net/dej/lotniska')
  console.log({ response, dispatch });
};
