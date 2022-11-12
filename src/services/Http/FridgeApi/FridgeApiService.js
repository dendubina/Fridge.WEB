import { fridgeApi } from "../../Hosts";
import { getCookie } from "../../CookieService/CookieService";

export const signIn = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return await send(`${fridgeApi}/SignIn`, requestOptions);
};

export const signUp = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return await send(`${fridgeApi}/SignUp`, options);
};

export const getAllFridges = async () => await send(`${fridgeApi}/api/fridges`);

export const createFridge = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return await send(`${fridgeApi}/api/Fridges`, options);
};

export const getFridgeById = async (fridgeId) =>
  await send(`${fridgeApi}/api/fridges/${fridgeId}`);

export const deleteFridge = async (fridgeId) => {
  const options = {
    method: "DELETE",
  };
  return await send(`${fridgeApi}/api/fridges/${fridgeId}`, options);
};

export const updateFridge = async (fridge) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fridge),
  };
  return await send(`${fridgeApi}/api/fridges/${fridge.id}`, options);
};

export const deleteProductFromFridge = async (fridgeId, productId) => {
  const options = {
    method: "DELETE",
  };
  return await send(
    `${fridgeApi}/api/fridges/${fridgeId}/products/${productId}`,
    options
  );
};

export const addProductInFridge = async (fridgeId, formData) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  await send(`${fridgeApi}/api/fridges/${fridgeId}/products`, options);
};

export const getAllProducts = async () =>
  await send(`${fridgeApi}/api/products`);

export const createProduct = async (formData) => {
  const options = {
    method: "POST",
    body: formData,
  };
  return await send(`${fridgeApi}/api/products`, options);
};

export const deleteProduct = async (productId) => {
  const options = {
    method: "DELETE",
  };
  return await send(`${fridgeApi}/api/products/${productId}`, options);
};

export const getProductById = async (productId) =>
  await send(`${fridgeApi}/api/products/${productId}`);

export const updateProduct = async (productId, formData) => {
  const options = {
    method: "PUT",
    body: formData,
  };
  return await send(`${fridgeApi}/api/products/${productId}`, options);
};

export const getAllUsers = async () => send(`${fridgeApi}/api/users`);

export const addAdmin = async (userId) => {
  const options = {
    method: "PATCH",
  };
  return await send(`${fridgeApi}/api/users/${userId}/AddAdmin`, options);
};

export const removeAdmin = async (userId) =>{
  const options = {
    method: "PATCH",
  };
  return await send(`${fridgeApi}/api/users/${userId}/RemoveAdmin`, options);
}

export const blockUser = async (userId) =>{
  const options = {
    method: "PATCH",
  };
  return await send(`${fridgeApi}/api/users/${userId}/Block`, options);
}

export const unBlockUser = async (userId) => {
  const options = {
    method: "PATCH",
  };
  return await send(`${fridgeApi}/api/users/${userId}/UnBlock`, options);
};

const send = async (uri, fetchRequestOptions) => {
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

  return await fetch(uri, fetchRequestOptions);
};
