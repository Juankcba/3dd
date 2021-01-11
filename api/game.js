import { authFetch } from "../utils/fetch";
export async function createGameApi(formData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getLastGameApi(limit, platform) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortIntems = "_sort=createAt:desc";
    const filterItem = `plataforma=${platform}`;
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games?${limitItems}&${sortIntems}&${filterItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllGameApi(
  plataforma,

  orderby,
  orderFilter,
  consola
) {
  try {
    const sortIntems = `_sort=${orderFilter}:${orderby}`;
    const filterItem = `plataforma=${plataforma}&consola=${consola}`;
    if (plataforma != "Celulares") {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games?${sortIntems}&${filterItem}`;

      const response = await fetch(url);
      const result = await response.json();

      return result;
    } else {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars?${sortIntems}`;
      const response = await fetch(url);
      const result = await response.json();

      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateGameFull(id, data, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games/${id}`;
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
export async function updateGame(id, data, logout) {
  const dataForm = { ["comentario"]: data };

  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games/${id}`;
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
export async function getAllProducts() {
  let games = [];
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games?`;

    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function UpdateStock(id, cantidad, logout) {
  const unidades = { ["unidades"]: cantidad };
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unidades),
    };
    const result = await authFetch(url, params, logout);

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function restartAllComentary(id, logout) {
  console.log(id, "aver id");
  const comentario = {
    ["comentario"]: {
      0: [
        {
          mensaje: "Dejanos tus comentarios",
          usuarioId: "5fcd3fd1cb63e807e88438a7",
          usuarioNombre: "Rgmmatrix ",
        },
      ],
    },
  };
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comentario),
    };
    const result = await authFetch(url, params, logout);

    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateVoteGame(id, data, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games/${id}`;
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
