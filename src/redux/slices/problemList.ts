import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { ProblemPreviewList } from "types/Problem";

const initialState: ProblemPreviewList = {
  total: 0,
  solvedFilter: false,
  pages: {},
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
    setSolvedFilter: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        solvedFilter: action.payload,
      };
    },
  },
});

export const { setProblemList, setSolvedFilter } = problemListSlice.actions;

export const selectProblemList = (state: RootState) => state.problemList;

export default problemListSlice.reducer;
