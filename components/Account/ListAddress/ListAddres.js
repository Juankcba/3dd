import React, { useState, useEffect } from "react";
import { getAddressapi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { map, size } from "lodash";
import { Grid, Button } from "semantic-ui-react";
export default function ListAddres(props) {
  const { reloadAddreses, setReloadAddreses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressapi(auth.idUser, logout);
      if (response != null) {
        setAddresses(response || []);
        setReloadAddreses(false);
      }
    })();
  }, [reloadAddreses]);
  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección creada</h3>
      ) : (
        <Grid>
          {addresses.map((address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                setReloadAddreses={setReloadAddreses}
                openModal={openModal}
                logout={logout}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address, setReloadAddreses, openModal, logout } = props;

  const [loadingDelete, setLoadingDelete] = useState(false);
  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response === true) setReloadAddreses(true);
    setLoadingDelete(false);
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
