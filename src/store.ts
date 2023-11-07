import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./storeSlices/userSlice";
import { api } from "api/api";

const root = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: root,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
