import { authFetch } from "../utils/fetch";

export async function createOrderApi(order, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    const response = await authFetch(url, params, logout);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getOrdenNumber(logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders/count`;
    const response = await authFetch(url, null, logout);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrderApi(idUser, logout) {
  try {
    const filterItem = `userID=${idUser}`;
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders?${filterItem}`;
    const response = await authFetch(url, null, logout);
    return response ? response : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getOrderAll(logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`;
    const response = await authFetch(url, null, logout);

    return response ? response : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOrderState(id, data, logout) {
  const dataForm = { estado: data };
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    };
    const response = await authFetch(url, params, logout);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
