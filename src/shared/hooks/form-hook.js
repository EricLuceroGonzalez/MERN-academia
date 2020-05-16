import { useCallback, useReducer } from "react";

// This hook manage all the FORM logic and Input change logic

// Adding the formReducer that was in NewPlace
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

export const useForm = (initialInputs, initialFormValidity) => {
  // To manage multiple states (changing) as the title input and others inputs changing
  // INITIAL STATE

  // Paste it from NewPlace.js
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  //   From NewPlace.js
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

  //   Return some
  return [formState, inputHandler];
};
