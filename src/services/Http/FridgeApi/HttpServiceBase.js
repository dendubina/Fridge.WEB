import BaseHttpError from "../../../features/Errors/Http/BaseHttpError";
import UnathorizedAccessError from "../../../features/Errors/Http/UnathorizedAccessError";
import ForbiddenAccessError from "../../../features/Errors/Http/ForbiddenAccessError";
import ResourceNotFoundError from "../../../features/Errors/Http/ResourceNotFoundError";
import { getCookie } from "../../CookieService/CookieService";

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

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new UnathorizedAccessError();
      case 403:
        throw new ForbiddenAccessError();
      case 404:
        throw new ResourceNotFoundError();
      case 400:
        return await response.json();
      default:
        throw new BaseHttpError("Something went wrong", response.status);
    }
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return await response.json();
  }
};

export default BaseHttpService;
