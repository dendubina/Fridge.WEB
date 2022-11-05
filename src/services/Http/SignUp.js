import { fridgeApi } from "../Hosts";
import BaseHttpService from "./HttpServiceBase";

const SignUp = async (data) => {

   const options = {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   };
   
   return await BaseHttpService(`${fridgeApi}/SignUp`, options);
}

export default SignUp;