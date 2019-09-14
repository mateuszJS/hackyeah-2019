import { AxiosResponse } from "axios";
import { ApiResult } from "../typedef/apiResults";
import { LoginAccountResult } from "../typedef/account";

const login = () => {

}

// const login = async (
//   username: string,
//   password: string
// ): Promise<ApiResult<LoginAccountResult>> => {
//   let user = {
//     login: username.trim(),
//     password: password
//   };

//   let response: AxiosResponse<ApiResult<LoginAccountResult>> = await axios.post<
//     ApiResult<LoginAccountResult>
//   >("costamapi/endpoint/", user);
//   return response.data;
// };

export const accountService = {
  login
};
