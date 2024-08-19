import { BemProps } from "../../shared/other/bem";
import { Driver as DriverT } from "./model";
import React from "react";

import cs from "./ui.module.scss";

type Props = BemProps<{
  driver: DriverT;
}>;

const Driver: React.FC<Props> = ({ elem, driver: { name, phoneNumber } }) => {
  return (
    <li className={`${cs["driver"]} ${elem}`}>
      <span>ФИО: {name}</span>
      <span> &nbsp; </span>
      <span>Номер телефона: {phoneNumber} </span>
    </li>
  );
};

export { Driver };
