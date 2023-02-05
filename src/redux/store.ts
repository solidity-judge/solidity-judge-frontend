import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { lastProblemSlice } from "./slices/lastProblem";
import { modalSlice } from "./slices/modal";
import { previousWalletSlice } from "./slices/previousWallet";
import { problemListSlice } from "./slices/problemList";
import { selectedPageSlice } from "./slices/selectedPage";
import { sourceCodeSlice } from "./slices/sourceCode";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["previousWallet", "sourceCode"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    lastProblem: lastProblemSlice.reducer,
    selectedPage: selectedPageSlice.reducer,
    problemList: problemListSlice.reducer,
    previousWallet: previousWalletSlice.reducer,
    sourceCode: sourceCodeSlice.reducer,
    modal: modalSlice.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
