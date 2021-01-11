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

export default function BasicLayout(props) {
  const { children, className, title } = props;
  const [visible, setVisible] = useState(true);

  return (
    <div className="basic-layout">
      <div className="body">
        <Container className="container">
          <HeaderTop setVisible={setVisible} visible={visible} />

          <Sidebar.Pushable
            as={Segment}
            style={{ overflow: "hidden", height: "100hv", marginTop: "-1rem" }}
          >
            <Sidebar
              as={Menu}
              animation="scale down"
              direction="left"
              icon="labeled"
              inverted
              vertical
              visible={visible}
              width="thin"
            >
              <Navigation />
            </Sidebar>
            <Sidebar.Pusher dimmed={false && visible}>
              <Segment fluid>{children}</Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </div>
    </div>
  );
}
