import { fridgeApi } from "../../Hosts";
import { getCookie } from "../../CookieService/CookieService";

const jsonContentType = "application/json";

export const signIn = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(data),
  };
  return await send(`${fridgeApi}/signIn`, requestOptions);
};

export const signUp = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(data),
  };
  return await send(`${fridgeApi}/signUp`, options);
};

export const getAllFridges = async () => await send(`${fridgeApi}/api/fridges`);

export const createFridge = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(data),
  };
  return await send(`${fridgeApi}/api/fridges`, options);
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
    headers: { "Content-Type": jsonContentType },
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
    headers: { "Content-Type": jsonContentType },
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

export const addRole = async (userId, roleToAdd) => {
  const content = {
    role: roleToAdd
  }
  const options = {
    method: "PATCH",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(content),
  };
  return await send(`${fridgeApi}/api/users/${userId}/addRole`, options);
};

export const removeRole = async (userId, roleToRemove) => {
  const content = {
    role: roleToRemove,
  };
  const options = {
    method: "PATCH",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(content),
  };
  return await send(`${fridgeApi}/api/users/${userId}/removeRole`, options);
};

export const changeStatus = async (userId, newStatus) => {
  const content = {
    status: newStatus,
  };
  const options = {
    method: "PATCH",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(content),
  };
  return await send(`${fridgeApi}/api/users/${userId}/changeStatus`, options);
};

export const getUserById = async (userId) =>
  await send(`${fridgeApi}/api/users/${userId}`);

export const updateUser = async (formData) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": jsonContentType },
    body: JSON.stringify(formData),
  };
  return await send(`${fridgeApi}/api/users/${formData.id}`, options);
};

const send = async (uri, fetchRequestOptions) => {
  const authToken = "Bearer " + getCookie("accessToken");
   
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
