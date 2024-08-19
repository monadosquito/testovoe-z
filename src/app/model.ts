import { createContext } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import driverSlice from "../entities/driver/model";

type Ctx = {
  setFocused: (focused: boolean) => void;
  setModalClosed: (closed: boolean) => void;
  closed: boolean;
  focused: boolean;
};

const initCtx: Ctx = {
  setFocused: () => {},
  setModalClosed: () => {},
  closed: true,
  focused: false,
};

const ctx = createContext<Ctx>(initCtx);

const store = configureStore({
  reducer: {
    [driverSlice.reducerPath]: driverSlice.reducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<State>();

export default store;

export type { Ctx };
export { ctx, store };
