import React, { useContext } from "react";
import { ctx } from "../app/model";

import { Button } from "../shared/components/Button";

import { State, useAppSelector } from "../app/store";
import { BemProps } from "../shared/other/bem";
import { Driver } from "../entities/driver/ui";

import cs from "./DriverList.module.scss";

type Props = BemProps<{}>;

const DriverList: React.FC<Props> = ({ elem = "" }) => {
  const drivers = useAppSelector((state: State) => state.driver);
  const { setModalClosed } = useContext(ctx);

  const openModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalClosed(false);
  };

  return (
    <main className={`${cs["driver-list"]} ${elem}`}>
      <h3 className={`${cs["driver-list__title"]}`}>Список водителей</h3>
      <ul className={`${cs["driver-list__list"]}`}>
        {drivers.map((driver: any) => {
          return (
            <Driver
              elem={`${cs["driver-list__item"]}`}
              key={driver.id}
              driver={driver}
            />
          );
        })}
      </ul>
      <Button elem={`${cs["driver-list__add-btn"]}`} onClick={openModal}>
        Добавить водителя
      </Button>
    </main>
  );
};

export { DriverList };
