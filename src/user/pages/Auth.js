import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  // LOGIN or SIGNUP state mode
  const [isLoginMode, setIsLoginMode] = useState(true);
  // is Loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // Initialize state with form-hook
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  //   To switch this LOGIN-mode component to the SIGNUP-mode component
  const switchModeHandler = () => {
    console.log(`isLoginMode: ${isLoginMode}`);

    //   If we are on SIGNUP, add the name field and data to STATE
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(`name: ${formState.inputs.name.value}`);

    if (isLoginMode) {
      console.log(`isLoginMode: ${isLoginMode}`);
    } else {
      // HTTP Request: fetch()
      try {
        // ON the loading state:
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        // ---> Return the fetched signup data
        const responseData = await response.json();
        // Check if response from server is OK (no 400's code or 500's code):
        if (response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        // login has terminated so:
        setIsLoading(false);
        // Change the state of Context
        auth.login();
      } catch (err) {
        console.log(`Error: ${err}`);
        // login has terminadet so:
        setIsLoading(false);
        setError(err.message || "Some error ocurred, please try again.");
      }
    }
  };
  return (
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        ></Input>
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password. Min Length (6)"
          onInput={inputHandler}
        ></Input>
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
