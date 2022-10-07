import React from "react";
import "./IconButton.scss";

type IconButtonProps = {
  children?: JSX.Element;
  onClick?: any;
};

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <div className="icon-button__children">{children}</div>
    </button>
  );
};

export default IconButton;
