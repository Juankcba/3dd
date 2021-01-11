import React from "react";

import BasicLayout from "../Layout/BasicLayout";
import { Header } from "semantic-ui-react";
export default function mundo() {
  return (
    <BasicLayout>
      <Header as="h3">Application Content Mundo</Header>
      <div className="content">
        <h2>Contenido</h2>
      </div>
    </BasicLayout>
  );
}
