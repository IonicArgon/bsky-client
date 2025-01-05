import React from 'react';

import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => unknown;
};

const Button: React.FC<ButtonProps> = ({ children, style, onClick }) => {
  return (
    <button className="button" style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
