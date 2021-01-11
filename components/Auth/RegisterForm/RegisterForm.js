import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import LoginForm from "../LoginForm";
import Auth from "../Auth";
import { registerApi } from "../../../api/user";
export default function RegisterForm(props) {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      const response = await registerApi(formData);

      if (response?.jwt) {
        toast.success("Registro Correcto");
        showLoginForm();
      } else {
        console.log("Error", response);
        toast.error("Error a registar este usuario ");
      }
      setLoading(false);
    },
  });
  async function crearCuenta(props) {
    const { dni, name, email, password, celular } = props;
    const favoritos = [];

    /* ESTO ES PARA USAR CON FIREBASE 
    try {
      await firebase.registrar(name, email, password);
      firebase.auth.onAuthStateChanged((user) => {
        if (user) {
          const usuario = {
            dni,
            name,
            email,
            favoritos: [],
            isAdmin: false,
            creado: Date.now(),
            uid: user.uid,
          };

          firebase.db.collection("Users").doc(user.uid).set(usuario);
        }
      });
      return "ok";
    } catch (error) {
      console.log("Hubo un error al crear el usuario", error.message);
      return error.message;
    }
    */
  }
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="dni"
        type="numeric"
        placeholder="DNI"
        onChange={formik.handleChange}
        error={formik.errors.dni}
      />
      <Form.Input
        name="celular"
        type="numeric"
        placeholder="CELULAR : La caracteristica sin 0 y el numero sin 15, sin puntos ni guiones."
        onChange={formik.handleChange}
        error={formik.errors.celular}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Constraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" secondary basic onClick={showLoginForm}>
          Iniciar Sesión
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    username: "",
    dni: "",
    celular: "",
    email: "",
    password: "",
    isAdmin: false,
  };
}

function validationSchema() {
  const digitsOnly = (value) => /^\d+$/.test(value);

  return {
    username: Yup.string().required("El nombre es obligatorio"),
    dni: Yup.string().test("Numeros Solamente", "Sin Puntos", digitsOnly),
    celular: Yup.string().test("Numeros Solamente", "Sin Puntos", digitsOnly),
    email: Yup.string()
      .email(true)
      .required("La direccion de correo es obligatoria"),
    password: Yup.string().required("Debes ingresar una contraseña"),
  };
}
