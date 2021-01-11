import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { Card, Icon, Image, Dimmer, Loader, Segment } from "semantic-ui-react";
import { getAllProductos } from "../../../api/product";
import CardComponent from "./CardComponent";
export default function ListProductos() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getAllProductos();
      if (response != null) {
        setProductos(response || []);
      }
    })();
  }, []);
  console.log("productos", productos);
  return (
    <div className="list-productos">
      <Segment compact>
        {size(productos) === 0 ? (
          <Dimmer active>
            <Loader indeterminate>Preparing Files</Loader>
          </Dimmer>
        ) : (
          productos.map((producto, index) => (
            <CardComponent producto={producto} key={index} />
          ))
        )}
      </Segment>
    </div>
  );
}
