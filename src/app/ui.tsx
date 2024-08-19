import React, { useState } from "react";
import cs from "./App.module.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Modal } from "../widgets/Modal";
import { AddDriver } from "../pages/AddDriver";
import { DriverList } from "../pages/DriverList";
import { Header } from "../widgets/Header";
import { BemProps } from "../shared/other/bem";
import { ctx } from "./model";

type LayoutProps = BemProps<{
  children: React.ReactNode;
}>;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [modalClosed, setModalClosed] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <section>
      <ctx.Provider
        value={{
          setFocused,
          setModalClosed,
          closed: modalClosed,
          focused,
        }}
      >
        <Modal elem={`${cs["root__modal"]}`} toClose={modalClosed}>
          {children}
        </Modal>
        <Outlet />
      </ctx.Provider>
    </section>
  );
};

const MainLayout = () => {
  return (
    <>
      <Header elem={`${cs["root__header"]}`} />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        path="/driver-list"
        element={
          <Layout>
            <AddDriver elem={`${cs["root__add-driver"]}`} />
          </Layout>
        }
      >
        <Route
          path="/driver-list"
          element={<DriverList elem={`${cs["root__driver-list"]}`} />}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export { App };
