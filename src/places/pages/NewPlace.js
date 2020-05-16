import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// Import validators from input
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

// Receives state and action and return new state
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      // Return new state accodung to the input is changing
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  // To manage multiple states (changing) as the title input and others inputs changing
  // INITIAL STATE
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

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
