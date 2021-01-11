import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterFrom from "./RegisterForm";
export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);
  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Iniciar Sesión");
  };

  const showRegisterForm = () => {
    setShowLogin(false);
    setTitleModal("Crear Nueva Cuenta");
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterFrom showLoginForm={showLoginForm} />
  );
}
