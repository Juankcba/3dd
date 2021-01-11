//import firebase from "../firebase/firebase";
export async function getGameApi(code) {
  try {
    const filterItem = `code=${code}`;
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games?${filterItem}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.length != 0) {
      return result;
    } else {
      const urlcel = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars?${filterItem}`;
      const response2 = await fetch(urlcel);
      const result2 = await response2.json();
      return result2;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  /*let resultado = {};
  const result = await firebase.db
    .collection("productos")
    .doc(id)
    .get()
    .then((response) => {
      const data = response.data();
      resultado = data;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      return null;-
    });

  return resultado;*/
}
export async function searchGameApi(title) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/games?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.length != 0) {
      return result;
    } else {
      const urlcel = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/celulars?_q=${title}`;
      const response2 = await fetch(urlcel);
      const result2 = await response2.json();
      return result2;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
