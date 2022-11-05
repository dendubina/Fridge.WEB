import BaseHttpError from "../../features/Errors/Http/BaseHttpError";
import UnathorizedAccessError from "../../features/Errors/Http/UnathorizedAccessError";
import ForbiddenAccessError from "../../features/Errors/Http/ForbiddenAccessError";
import { getCookie } from "../CookieService/CookieService";

const BaseHttpService = async (uri, fetchRequestOptions) => {

const authToken = "Bearer " + getCookie("jwttoken");

  if (!fetchRequestOptions) {
    fetchRequestOptions = {
      headers: {
        Authorization: authToken,
      },
    };
  } else if (!fetchRequestOptions.headers) {
    fetchRequestOptions.headers = {
      Authorization: authToken,
    };
  } else if (fetchRequestOptions.headers) {
    fetchRequestOptions.headers["Authorization"] = authToken;
  }
  
  const response = await fetch(uri, fetchRequestOptions);

  if (response.status === 401) {
    throw new UnathorizedAccessError();
  }
  if (response.status === 403) {
    throw new ForbiddenAccessError();
  }
  if (response.status === 500) {
    throw new BaseHttpError("Server error", response.status);
  }

  const result = await response.json();

  return result;
};

export default BaseHttpService;
