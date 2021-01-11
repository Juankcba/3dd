export async function MPOAuth(client, code, redirect) {
  const url = `https://api.mercadopago.com/oauth/token?client_secret=APP_USR-6374600551447054-011009-ae0e68ba3979866eedd44c3b66bbdf3c-92629576&grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`;
  try {
    const params = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
    };
    console.log("despse api", url);
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
