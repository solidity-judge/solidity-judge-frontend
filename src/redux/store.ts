import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { lastProblemSlice } from "./slices/lastProblem";
import { previousWalletSlice } from "./slices/previousWallet";
import { problemListSlice } from "./slices/problemList";
import { selectedPageSlice } from "./slices/selectedPage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["previousWallet"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    lastProblem: lastProblemSlice.reducer,
    selectedPage: selectedPageSlice.reducer,
    problemList: problemListSlice.reducer,
    previousWallet: previousWalletSlice.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
