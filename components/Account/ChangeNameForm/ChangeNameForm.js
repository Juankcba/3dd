import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
//import firebase from "../../../firebase/firebase";
import { updateNameApi, resetPasswordApi } from "../../../api/user";
export default function ChangeNameForm(props) {
  const { usuario, setReloadUser, logout } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(usuario.username, usuario.dni, usuario.email),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      const response = await updateNameApi(usuario.id, formData, logout);

      if (!response) {
        toast.error("Error al actualizar los datos");
      } else {
        toast.success("Datos actualizados");
        setReloadUser(true);
      }
      setLoading(false);
      /* para FIREBASE 
      if (formData.name) {
        const dato = {
          name: formData.name,
          creado: Date.now(),
        }; 
        try {
          await firebase.db
            .collection("Users")
            .doc(usuario.uid)
            .update(dato)
            .then(function () {
              toast.success("Nombre Actualizado");
              setReloadUser(true);
            });
        } catch (error) {
          toast.error("Hubo un error", error.menssage);
        }
      }
      if (formData.dni) {
        const dato = {
          dni: formData.dni,
          creado: Date.now(),
        };
        /*
        try {
          await firebase.db
            .collection("Users")
            .doc(usuario.uid)
            .update(dato)
            .then(function () {
              toast.success("Dni Actualizado");
              setReloadUser(true);
            });
        } catch (error) {
          toast.error("Hubo un error", error.menssage);
        }
        
      }*/
    },
  });
  function resetearPass() {
    const fn = async () => {
      try {
        const identifier = usuario.email;
        await resetPasswordApi(identifier);
        // await firebase.resetear(email);
        toast.success("Se ha enviado un Correo de recuperación");
      } catch (error) {
        toast.error(error.message);
      }
    };
    fn();
    /*
    const fn = async () => {
  /*    try {
        await firebase.resetear(usuario.email);
        const mensaje =
          "Se ha enviado un Correo de recuperación a: " + usuario.email;
        toast.success(mensaje);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fn();*/
  }
  return (
    <div className="change-name-form">
      <h4> Cambia los datos de tu cuenta</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="username"
            placeholder="Tu nuevo Nombre"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.errors.username}
          />
          <Form.Input
            name="dni"
            placeholder="Tu nuevo DNI"
            onChange={formik.handleChange}
            value={formik.values.dni}
            error={formik.errors.dni}
          />
        </Form.Group>
        <Form.Input
          name="email"
          placeholder="Cambiar tu email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <div className="accions">
          <Button className="submit" loading={loading}>
            Actualizar
          </Button>
          <Button className="primary" onClick={resetearPass}>
            Resetear Contraseña
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues(username, dni, email) {
  return {
    username: username || "",
    dni: dni || "",
    email: email || "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required(false),
    dni: Yup.string().required(false),
    email: Yup.string().required(false),
  };
}
