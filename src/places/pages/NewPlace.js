import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// Import validators from input
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

// Moved formReducer to hooks/form-hook

const NewPlace = () => {
  // To manage multiple states (changing) as the title input and others inputs changing
  // INITIAL STATE -->> function copied to form-hooks


  // Funcition
  const inputHandler = useCallback((id, value, isValid) => {
    // Use Callback hook to stop the infinite loop create function of functions (reuse)
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  // manage Submint of the form:
  const newPlaceSumbitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <form className="place-form" onSubmit={newPlaceSumbitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid title"
        onInput={inputHandler}
      ></Input>
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      ></Input>
      <Input
      id="address"
      element="input"
      type="text"
      label="Address"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid address"
      onInput={inputHandler}
    ></Input>
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
