import React from "react";

import { BemProps } from "../other/bem";

import cs from "./Input.module.scss";

type Props = BemProps<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    label?: string;
  }
>;

const Input: React.FC<Props> = ({ elem = "", label = "", ...props }) => {
  return (
    <div className={`${cs["input"]} ${elem}`}>
      <label className={`${cs["input__label"]}`}>{label}</label>
      <input className={`${cs["input__input"]}`} {...props} />
    </div>
  );
};

export { Input };
