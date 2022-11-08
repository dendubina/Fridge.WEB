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

export const getAllFridges = async () =>
  await BaseHttpService(`${fridgeApi}/api/fridges`);

export const createFridge = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return await BaseHttpService(`${fridgeApi}/api/Fridges`, options);
};

export const getFridgeById = async (fridgeId) =>
  await BaseHttpService(`${fridgeApi}/api/fridges/${fridgeId}`);

export const deleteFridge = async (fridgeId) => {
  const options = {
    method: "DELETE",
  };

  await BaseHttpService(`${fridgeApi}/api/fridges/${fridgeId}`, options);
};

export const updateFridge = async (fridge) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fridge),
  };

  await BaseHttpService(`${fridgeApi}/api/fridges/${fridge.id}`, options);
};

export const deleteProductFromFridge = async (fridgeId, productId) => {
  const options = {
    method: "DELETE",
  };

  await BaseHttpService(
    `${fridgeApi}/api/fridges/${fridgeId}/products/${productId}`,
    options
  );
};

export const getAllProducts = async () =>
  await BaseHttpService(`${fridgeApi}/api/products`);
