import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { modernCommuneApi } from "./api/index";
import { errorHandler } from "./middleware/error";
import memberReducer from "./slice/memberSlice/index";

const reducer = {
  [modernCommuneApi.reducerPath]: modernCommuneApi.reducer,
  member: memberReducer,
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["member"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([modernCommuneApi.middleware, errorHandler]),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
