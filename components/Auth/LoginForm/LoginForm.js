import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

import Router from "next/router";
import { loginApi, resetPasswordApi } from "../../../api/user";
export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  const { auth, login } = useAuth();
  useEffect(() => {
    if (auth) {
      guardarUsuarioAutenticado(auth);
    } else {
      guardarUsuarioAutenticado(null);
    }
  }, [usuarioAutenticado]);

  /* PARA FIREBASE
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        guardarUsuarioAutenticado(user);
      } else {
        guardarUsuarioAutenticado(null);
      }
    });
    return () => unsuscribe();
  }, [usuarioAutenticado]);
  */
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);

      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
        toast.success("Login Correcto");
        setLoading(false);
      } else {
        toast.error("El email o la contraseña son incorrectas");
      }
      setLoading(false);
    },
  });
  /* PARA FIREBASE 
  async function iniciarSesion(props) {
    const { email, password } = props;
    try {
      await firebase.login(email, password);
      await firebase.auth.onAuthStateChanged((user) => {
        if (user) {
          login(user.uid);
        }
      });
      return "ok";
    } catch (error) {
      console.log("Hubo un error al iniciar la sesion", error.message);
      return error.message;
    }
  }
  */
  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string()
      .email()
      .required("La direccion de correo es obligatoria");
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      const fn = async () => {
        try {
          const identifier = formik.values.identifier;
          await resetPasswordApi(identifier);
          // await firebase.resetear(email);
          toast.success("Se ha enviado un Correo de recuperación");
        } catch (error) {
          toast.error(error.message);
        }
      };
      fn();
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button type="submit" className="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la constraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}
function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string()
      .email(true)
      .required("La direccion de correo es obligatoria"),
    password: Yup.string().required("Debes ingresar una contraseña"),
  };
}
