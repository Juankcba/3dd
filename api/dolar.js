export async function getDolar() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/dolar`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
