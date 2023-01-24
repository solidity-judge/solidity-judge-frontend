import { configureStore } from "@reduxjs/toolkit";
import { lastProblemSlice } from "./slices/lastProblem";
import { problemListSlice } from "./slices/problemList";
import { selectedPageSlice } from "./slices/selectedPage";

export const store = configureStore({
  reducer: {
    lastProblem: lastProblemSlice.reducer,
    selectedPage: selectedPageSlice.reducer,
    problemList: problemListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
