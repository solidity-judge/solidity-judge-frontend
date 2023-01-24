import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { ProblemPreview } from "types/Problem";

const initialState: ProblemPreview = {
  id: 0,
  address: "",
  author: "",
  timestamp: "",
  title: "",
};

export const lastProblemSlice = createSlice({
  name: "lastProblem",
  initialState,
  reducers: {
    setLastProblem: (state, action: PayloadAction<ProblemPreview>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeLastProblem: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setLastProblem, removeLastProblem } = lastProblemSlice.actions;

export const selectLastProblem = (state: RootState) => state.lastProblem;

export default lastProblemSlice.reducer;
