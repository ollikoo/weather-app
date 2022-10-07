import React from "react";
import "./Icon.scss";

export type IconProps = {
  name: string;
  size?: string;
  color?: string;
};

const Icon = ({ name, size, color }: IconProps) => {
  return (
    <i
      className={name}
      data-size={size ? size : "small"}
      data-color={color ? color : "default"}
    ></i>
  );
};

export default Icon;
