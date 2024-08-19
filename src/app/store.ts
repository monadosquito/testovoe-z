import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import driverSlice from "../entities/driver/model";

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
