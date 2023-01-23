import { configureStore } from "@reduxjs/toolkit";
import { lastProblemSlice } from "./slices/lastProblem";
import { selectedPage } from "./slices/selectedPage";

export const store = configureStore({
  reducer: {
    lastProblem: lastProblemSlice.reducer,
    selectedPage: selectedPage.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
