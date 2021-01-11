import { authFetch } from "../utils/fetch";

export async function getAllProductos(
  plataforma,
  orderby,
  orderFilter,
  consola
) {
  try {
    const sortIntems = `_sort=${orderFilter}:${orderby}`;
    const filterItem = `plataforma=${plataforma}&consola=${consola}`;

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/productos?`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
