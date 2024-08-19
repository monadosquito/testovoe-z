import React, { useContext, useEffect } from "react";

import { ctx } from "../app/model";

import { BemProps } from "../shared/other/bem";

import cs from "./Modal.module.scss";

type Props = BemProps<{
  toClose: boolean;
  children: React.ReactNode;
}>;

const Modal: React.FC<Props> = ({ elem = "", toClose, children }) => {
  const { setModalClosed, focused } = useContext(ctx);

  const close: React.MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      setModalClosed(true);
    }
  };

  useEffect(() => {
    const closeWhenEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !focused) {
        setModalClosed(true);
      }
    };
    document.addEventListener("keydown", closeWhenEsc);
    return () => {
      document.removeEventListener("keydown", closeWhenEsc);
    };
  }, [focused, setModalClosed]);

  return (
    <aside
      onClick={close}
      className={`${cs["modal"]} ${elem} ${toClose ? cs["modal_closed"] : ""}`}
    >
      <section
        className={`${cs["modal__cont"]} ${
          toClose ? cs["modal__cont_closed"] : ""
        }`}
      >
        {children}
      </section>
    </aside>
  );
};

export { Modal };
