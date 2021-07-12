import React from "react";

import "./Button.css";

const Button = ({ classNameButton, id, label, disabled = false, onClick }) => {
  return (
    <button
      className={classNameButton}
      id={id}
      disabled={disabled}
      onClick={typeof onClick === "function" ? onClick : undefined}
    >
      {label}
    </button>
  );
};

export default Button;
