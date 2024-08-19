import React from "react";

import { BemProps } from "../other/bem";

import cs from "./Button.module.scss";

type Props = BemProps<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const Button: React.FC<Props> = ({ elem = "", ...props }) => {
  return <button className={`${cs["button"]} ${elem}`} {...props}></button>;
};

export { Button };
