import { Link } from "react-router-dom";
import { BemProps } from "../shared/other/bem";
import React from "react";

import cs from "./Header.module.scss";

type Props = BemProps<{}>;

const Header: React.FC<Props> = ({ elem = "" }) => {
  return (
    <header className={`${cs["header"]} ${elem}`}>
      <Link className={`${cs["header__link"]}`} to="/driver-list">
        Список водителей
      </Link>
    </header>
  );
};

export { Header };
