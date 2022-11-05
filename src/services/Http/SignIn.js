import { fridgeApi } from "../Hosts";
import BaseHttpService from "./HttpServiceBase";

const SignIn = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return await BaseHttpService(`${fridgeApi}/SignIn`, requestOptions);
};

export default SignIn;
