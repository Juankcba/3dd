import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeaderTop from "../components/HeaderTop";
import Navigation from "../components/Navigation/Navigation";
import {
  Container,
  GridRow,
  Header,
  Content,
  Sidebar,
  Icon,
  Menu,
  Segment,
  Button,
} from "semantic-ui-react";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullCarrousel from "../components/FullCarrousel";
export default function BasicLayout(props) {
  const { children, className, title } = props;
  const [visible, setVisible] = useState(true);
  const onShow = () => {
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  return (
    <div className="basic-layout">
      <div className="body">
        <Container className="container">
          <HeaderTop />
          <FullCarrousel />
        </Container>
      </div>
    </div>
  );
}
