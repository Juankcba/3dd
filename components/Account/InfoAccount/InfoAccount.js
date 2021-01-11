const { createFactory } = require("react");

import React from "react";
import { Icon } from "semantic-ui-react";
export default function InfoAccount(props) {
  const { usuario, setReloadUser } = props;

  return (
    <div>
      <h1>{usuario.username}</h1>
      <h3>
        <Icon name="address card" />
        {usuario.dni} <Icon name="envelope" /> {usuario.email}
      </h3>
    </div>
  );
}
