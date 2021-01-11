import { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hooks/useAuth";
import firebase from "../../../firebase/firebase";
import useWindowSize from "../../../hooks/useWindowSize";
import useCart from "../../../hooks/useCart";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../../utils/breakpoint";
export default function MenuWeb(props) {
  const { setUsuario } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesión");
  const { auth, logout } = useAuth();
  const [usuario, guardarUsuario] = useState({});
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const { width } = useWindowSize();
  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 2;
      case width > breakpointUpMd:
        return 1;
      case width > breakpointUpSm:
        return 1;
      default:
        return 1;
    }
  };

  useEffect(() => {
    if (auth) {
      const obtenerUsuario = () => {
        firebase.db
          .collection("Users")
          .doc(auth.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log("No such document!");
            } else {
              guardarUsuario(doc.data());
              setUsuario(doc.data());
            }
          })
          .catch((err) => {
            console.log("Error getting document", err);
          });
      };
      obtenerUsuario();
    } else {
      guardarUsuario("unlogged");
      setUsuario("unlogged");
    }
  }, [auth]);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__right" width={10}>
            {usuario !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                usuario={usuario}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}
function MenuPlatforms() {
  return (
    <Menu>
      <Link href="/games/PlayStation">
        <Menu.Item as="a">PlayStation 4</Menu.Item>
      </Link>
      <Link href="/games/PlayStation">
        <Menu.Item as="a">PlayStation 5</Menu.Item>
      </Link>
      <Link href="/games/Nintendo">
        <Menu.Item as="a">Nintendo Switch</Menu.Item>
      </Link>
      <Link href="/games/Celulares">
        <Menu.Item as="a">Celulares</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuPlatformsReduced() {
  return (
    <Menu>
      <Link href="/games/PlayStation">
        <Menu.Item as="a">PS4</Menu.Item>
      </Link>
      <Link href="/games/PlayStation">
        <Menu.Item as="a">PS5</Menu.Item>
      </Link>
      <Link href="/games/Nintendo">
        <Menu.Item as="a">Switch</Menu.Item>
      </Link>
      <Link href="/games/Celulares">
        <Menu.Item as="a">Celulares</Menu.Item>
      </Link>
    </Menu>
  );
}
function MenuOptionsReduced(props) {
  const { onShowModal, usuario, logout } = props;
  const { productsCart } = useCart();
  var bandera = false;
  if (usuario !== "unlogged") {
    bandera = true;
  } else {
    bandera = false;
  }

  const Logout = () => {
    firebase.cerrarSesion();
    logout;
  };
  return (
    <Menu>
      {bandera ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi Cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, usuario, logout } = props;
  const { productsCart } = useCart();
  var bandera = false;
  if (usuario !== "unlogged") {
    bandera = true;
  } else {
    bandera = false;
  }

  const Logout = () => {
    firebase.cerrarSesion();
    logout;
  };
  return (
    <Menu>
      {bandera ? (
        <>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {usuario.name}
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          - Debes de Logearte -
          <Icon name="user outline" />
        </Menu.Item>
      )}
    </Menu>
  );
}
