import React, { useState, useContext } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  // Bring th http HOOK data:
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // :LISTEN authContext to check if user is logged and show some content IF is log in
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmationModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmationModal(false);
  };

  const confirmDeleteHandler = async () => {
    console.log("Deleting...");
    // call the HTTP REQUEST to delete this
    try {
      await sendRequest(`http"//localhost:3001/api/places/${props.id}`, "DELETE");
      
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={15} />
        </div>
      </Modal>
      {/**Modal to ask if want to delete Place: */}
      <Modal
        show={showConfirmationModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place? This can't be undone after.</p>
      </Modal>
      {/**  List Items of places */}
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title}></img>
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                {" "}
                DELETE{" "}
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
