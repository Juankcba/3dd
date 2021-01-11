import React, { useEffect, useState } from "react";
import {
  Card,
  Icon,
  Image,
  Dimmer,
  Loader,
  Segment,
  AccordionTitle,
} from "semantic-ui-react";
export default function CardComponent(props) {
  const { title, picture_url, description, quantity } = props.producto;
  return (
    <Card>
      <Image
        src="https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
}
