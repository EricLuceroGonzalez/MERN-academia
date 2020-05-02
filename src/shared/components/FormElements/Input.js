import React from "react";

import "./Input.css";

const Input = (props) => {
  // Create an form element (input AND textarea):
  const element =
    props.element === "input" ? ( 
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} drows={props.rows || 3} />
    );
  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
