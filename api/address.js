//import firebase from "../firebase/firebase";

import { authFetch } from "../utils/fetch";
export async function createAddressApi(address, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 200) throw "Error";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }

  /*
  try {
    const result = await firebase.db
      .collection("Direcciones")
      .doc()
      .set(address);
  } catch (error) {
    return error;
  }
  return true;*/
}

export async function getAddressapi(idUser, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "Error";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
  /*
  let array = [];
  
  const result = await firebase.db
    .collection("Direcciones")
    .where("uid", "==", idUser)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        array.push({
          ...doc.data(),
          id: doc.id,
        });
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      return null;
    });
  return array;*/
}
export async function getAddressApiFromID(idAddress, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/addresses?id=${idAddress}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "Error";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
  /* const result = await firebase.db
    .collection("Direcciones")
    .doc(formDataTemp.id)
    .set(formDataTemp);

  return result;*/
}

export async function deleteAddressApi(idAddress, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  /* const result = await firebase.db
    .collection("Direcciones")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
      return null;
    });
  return true;*/
}
