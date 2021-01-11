import { authFetch } from "../utils/fetch";
export async function registerApi(formData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordApi(identifier) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(identifier),
    };
    const response = await fetch(url, params);
    const result = await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`;

    const result = await authFetch(url, null, logout);

    return result ? result : null;
  } catch (error) {
    return null;
  }
}
export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/${idUser}`;
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
export async function updateFavoritos(idUser, dataForm, logout) {
  const favoritos = {
    favoritos: dataForm,
  };

  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoritos),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserApi(userID, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/${userID}`;

    const result = await authFetch(url, null, logout);

    return result ? result : null;
  } catch (error) {
    return null;
  }
}
