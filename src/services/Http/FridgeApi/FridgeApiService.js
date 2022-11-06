import { fridgeApi } from "../../Hosts";
import BaseHttpService from "./HttpServiceBase";

export const SignIn = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return await BaseHttpService(`${fridgeApi}/SignIn`, requestOptions);
};

export const SignUp = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return await BaseHttpService(`${fridgeApi}/SignUp`, options);
};

export const GetAllFridges = async () =>
  await BaseHttpService(`${fridgeApi}/api/fridges`);

export const CreateFridge = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return await BaseHttpService(`${fridgeApi}/api/Fridges`, requestOptions);
};

export const GetAllProducts = async () =>
  await BaseHttpService(`${fridgeApi}/api/products`);
