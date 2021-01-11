import { authFetch } from "../utils/fetch";
export async function getLastCelApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortIntems = "_sort=createAt:desc";

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars?${limitItems}&${sortIntems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllCelularAPi(plataforma, orderby, orderFilter) {
  try {
    const sortIntems = `_sort=${orderFilter}:${orderby}`;
    const filterItem = `plataforma=${plataforma}`;
    var url = "";
    if (plataforma === "Celulares") {
      url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars?${sortIntems}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars?${sortIntems}&${filterItem}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateVoteCel(id, data, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateCel(id, data, logout) {
  const dataForm = { ["comentarios"]: data };

  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    };
    const result = await authFetch(url, params, logout);

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateCelFull(id, data, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
