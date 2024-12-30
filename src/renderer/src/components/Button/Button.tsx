import React from "react";

import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => unknown;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
