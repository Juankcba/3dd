import React, { useMemo, useState, useEffect } from "react";
import Router from "next/router";
import "../styles/global/globals.css";
import "semantic-ui-css/semantic.min.css";

import "../styles/sass/main.scss";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { setToken, getUid, removeToken } from "../api/token";
import {
  getProductsCart,
  addProductCart,
  countProductCart,
  removeProductCart,
  removeAllProductsCart,
} from "../api/cart";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  useEffect(() => {
    const token = getUid();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);
  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };
  useEffect(() => {
    setTotalProductsCart(countProductCart());
    setReloadCart(false);
  }, [reloadCart, auth]);
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      //      firebase.cerrarSesion();
      Router.push("/");
    }
  };
  const addProduct = (product) => {
    const uid = getUid();
    if (uid) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un juego tiene que iniciar sesión");
    }
  };
  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
