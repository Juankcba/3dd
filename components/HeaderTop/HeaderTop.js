import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Image,
  Menu,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import BasicModal from "../Modal/BasicModal";
import Auth from "../Auth/Auth";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import SearchTop from "./Search";
import { getMeApi } from "../../api/user";
export default function HeaderTop(props) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesión");
  const { auth, logout } = useAuth();
  const { productsCart } = useCart();
  const [user, setUser] = useState(undefined);
  const { isLoading, setLoading } = useState(false);
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const { visible, setVisible } = props;

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);

      setUser(response);
    })();
  }, [auth]);
  return (
    <>
      <Segment placeholder className="header-top">
        <Grid columns={3} relaxed="very" stackable>
          <Grid.Column textAlign="center">
            <Image src="/bladelink.png" size="small" centered />
            <p>Blade Link Argentina</p>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <SearchTop />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" className="account">
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
                productsCart={productsCart}
              />
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </>
  );
}

const options = [
  {
    key: "mispedidos",
    icon: "game",
    text: "Mis Pedidos",
    value: "mispedidos",
  },
  {
    key: "favoritos",
    icon: "heart outline",
    text: "Favoritos",
    value: "favoritos",
  },
];
function MenuOptions(props) {
  const { onShowModal, user, logout, productsCart } = props;
  const [value, setValue] = useState("");

  return (
    <>
      {user ? (
        <Button.Group color="teal" floated="right">
          <Dropdown
            className="button icon"
            pointing="right"
            floating
            options={options}
            trigger={<></>}
          />
          <Link href="/account">
            <Button icon labelPosition="left">
              <Icon name="user outline" />
              {user.username}
            </Button>
          </Link>
          <Link href="/cart">
            <Button>
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Button>
          </Link>
          <Button onClick={logout}>
            <Icon name="power off" />
          </Button>
        </Button.Group>
      ) : (
        <Menu secondary>
          <Menu.Item>
            <Button primary onClick={onShowModal}>
              <Icon name="user outline" />
              Mi Cuenta
            </Button>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
}
