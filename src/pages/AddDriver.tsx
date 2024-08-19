import { useState } from "react";
import { Driver, addDriver } from "../entities/driver/model";
import { useAppDispatch } from "../app/store";

import { BemProps } from "../shared/other/bem";
import { useDebounce } from "../shared/hooks/useDebounce";
import { AddDriverDto, initialDriverDto } from "../entities/driver/model";

import { scheme as driverScheme } from "../entities/driver/model";

import React, { useContext, useEffect } from "react";

import { Input } from "../shared/components/Input";
import { Button } from "../shared/components/Button";

import btnCs from "../shared/components/Button.module.scss";
import cs from "./AddDriver.module.scss";

import { ctx } from "../app/model";

const VALIDATION_DELAY = 500;
const CLOSE_MODAL_DELAY = 10000;

type Props = BemProps<{}>;

const AddDriver: React.FC<Props> = ({ elem = "" }) => {
  const dispatch = useAppDispatch();
  const [driver, setDriver] = useState<AddDriverDto>(initialDriverDto);
  const [validErr, setValidErr] = useState<string | null>(null);
  const { setFocused, setModalClosed, focused } = useContext(ctx);

  const onInputChange = (
    k: keyof Omit<Driver, "id">,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDriver = { ...driver, [k]: e.target.value };
    setDriver(newDriver);
    const validNewDriver = driverScheme.validate(newDriver);
    if (validNewDriver.error) {
      setValidErr(validNewDriver.error.message);
    } else {
      setValidErr(null);
    }
  };
  const onInputChangeD = useDebounce(onInputChange, VALIDATION_DELAY);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validNewDriver = driverScheme.validate(driver);
    if (!validNewDriver.error) {
      e.currentTarget.reset();
      const newDriver: Omit<Driver, "id"> = {
        name: driver.name,
        phoneNumber: +driver.phoneNumber,
      };
      dispatch(addDriver(newDriver));
      setModalClosed(true);
      setDriver(initialDriverDto);
    }
  };

  const closeModal = useDebounce(() => {
    setModalClosed(true);
  }, CLOSE_MODAL_DELAY);

  const closeModalWhenNotFocused = (focused: boolean) => closeModal(!focused);

  const handleFocused =
    (focused: boolean): React.FocusEventHandler =>
    () => {
      closeModalWhenNotFocused(focused);
      setFocused(focused);
    };

  useEffect(() => {
    closeModalWhenNotFocused(focused);
  });

  return (
    <main className={`${cs["add-driver"]} ${elem}`}>
      <form onSubmit={onSubmit} className={`${cs["add-driver__form"]}`}>
        <Input
          elem={`${cs["add-driver__input"]}`}
          label={`ФИО`}
          onChange={(e) => onInputChangeD(true, "name", e)}
          onFocus={handleFocused(true)}
          onBlur={handleFocused(false)}
          placeholder="ФИО"
        />
        <Input
          elem={`${cs["add-driver__input"]}`}
          label={`Hомер`}
          onChange={(e) => onInputChangeD(true, "phoneNumber", e)}
          onFocus={handleFocused(true)}
          onBlur={handleFocused(false)}
          placeholder="Номер телефона"
          type="number"
        />
        {validErr && (
          <span className={`${cs["add-driver__err"]}`}>{validErr}</span>
        )}
        <Button
          elem={`${cs["add-driver__add-btn"]} ${
            validErr ? btnCs["button_inactive"] : ""
          }`}
          type="submit"
        >
          Добавить водителя
        </Button>
      </form>
    </main>
  );
};

export { AddDriver };
