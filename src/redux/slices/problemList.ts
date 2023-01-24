import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { ProblemPreviewList } from "types/Problem";

const initialState: ProblemPreviewList = {
  total: 0,
  itemsPerPage: 0,
  page: 0,
  problems: [],
};

export const problemListSlice = createSlice({
  name: "problemList",
  initialState,
  reducers: {
    setProblemList: (state, action: PayloadAction<ProblemPreviewList>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setProblemList } = problemListSlice.actions;

export const selectProblemList = (state: RootState) => state.problemList;

export default problemListSlice.reducer;
