import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";

const UpdatePlace = () => {
  // Point useContext to AuthContext:
  const auth = useContext(AuthContext);
  // Bring the HTTP-HOOK
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // Set the history Object
  const history = useHistory();

  // Initialize state
  const [loadedPlace, setLoadedPlace] = useState();
  // To pass params from outside (Route)
  const placeId = useParams().placeId;

  // WE call useForm and pass the parameters:
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // FETCH DATA
  useEffect(() => {
    const fetchedPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchedPlace();
  }, [sendRequest, placeId, setFormData]);

  // SUbmision
  const placeUpdateSubmit = async (event) => {
    event.preventDefault();
    // HTTP REQUEST to PATH the update:
    try {
      await sendRequest(
        `http://localhost:3001/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );
      // Push to the user's places page (give USERID from context)
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  };

  // Render form if there is data to:
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  //   Handle place find success/fail
  if (!loadedPlace && error) {
    return (
      <Card>
        <h2>Could not find places!</h2>
      </Card>
    );
  }
  // If we find that place (we want to update) lets RETURN a form to be updated:
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmit}>
          {/*Create an input to update title: */}
          <Input
            id="title"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter some valid value"
            label="Title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter some valid description (min. 5 characters)"
            label="Description"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
