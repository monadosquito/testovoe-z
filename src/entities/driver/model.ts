import Joi from "joi";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Driver = {
  id: number;
  name: string;
  phoneNumber: number;
};

type AddDriverDto = { [k in Exclude<keyof Driver, "id">]: string };

const initialDriverDto = {
  name: "",
  phoneNumber: "",
};

const scheme = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я\s]+$/)
    .min(7)
    .label("ФИО")
    .required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]+$/)
    .length(11)
    .label("Номер")
    .required(),
});

const initialState: Driver[] = [];

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    addDriver(state, { payload: driver }: PayloadAction<Omit<Driver, "id">>) {
      state.unshift({ ...driver, id: state.length + 1 });
    },
  },
});

export type { Driver, AddDriverDto };
export { scheme, initialDriverDto };
export const { addDriver } = driverSlice.actions;
export default driverSlice;
