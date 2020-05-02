import React from "react";

import Input from "../../shared/components/FormElements/Input";
// Import validators from input
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid title"
      ></Input>
    </form>
  );
};

export default NewPlace;
