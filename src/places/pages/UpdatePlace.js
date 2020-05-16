import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

// Add some dum data
const DUMMY_PLACES = [
  {
    id: "id-1",
    title: "Pont Des Arts",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg/1024px-Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg",
    description:
      "Conecta el Quai Malaquais y el Quai Conti a la altura del Instituto de Francia, en el distrito VI, con el Quai François-Mitterrand y el Quai du Louvre a la altura del Cour Carrée del Palacio del Louvre (que se llamaba «Palais des Arts» durante el Primer Imperio), en el distrito I. ",
    address: "Pont des Arts, 75006 Paris, Francia",
    location: {
      lat: 48.8583424,
      lng: 2.3353197,
    },
    creator: "usr-1",
  },
  {
    id: "id-2",
    title: "Pont Neuf",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg/1024px-Pont_des_Arts%2C_6e_Arrondissement%2C_Paris_%28HDR%29_20140320_1.jpg",
    description:
      "Conecta el Quai Malaquais y el Quai Conti a la altura del Instituto de Francia, en el distrito VI, con el Quai François-Mitterrand y el Quai du Louvre a la altura del Cour Carrée del Palacio del Louvre (que se llamaba «Palais des Arts» durante el Primer Imperio), en el distrito I. ",
    address: "Pont des Arts, 75006 Paris, Francia",
    location: {
      lat: 48.8583424,
      lng: 2.3353197,
    },
    creator: "usr-2",
  },
];

const UpdatePlace = () => {
  // To pass params from outside (Route)
  const placeId = useParams().placeId;

  //   Find specfic place from data
  const identifiedPlace = DUMMY_PLACES.find((item) => item.id === placeId);

  // WE call useForm and pass the parameters:
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );

  // SUbmision
  const PlaceUpdateSubmit = (event) => {
    event.preventDefault()
    console.log(formState.inputs);
    
  }

  //   Handle place find success/fail
  if (!identifiedPlace) {
    return (
      <div>
        <h2>Could not find places!</h2>
      </div>
    );
  }

  // If we find that place (we want to update) lets RETURN a form to be updated:
  return (
    <form className="place-form">
      {/*Create an input to update title: */}
      <Input
        id="title"
        element="input"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter some valid value"
        label="Title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter some valid description (min. 5 characters)"
        label="Description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
