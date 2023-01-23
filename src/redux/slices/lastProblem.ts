import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

interface LastProblemState {
  id: string;
  name: string;
  href: string;
}

const initialState: LastProblemState = {
  id: "",
  name: "",
  href: "",
};

export const lastProblemSlice = createSlice({
  name: "lastProblem",
  initialState,
  reducers: {
    setLastProblem: (state, action: PayloadAction<LastProblemState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.href = action.payload.href;
    },
    removeLastProblem: (state) => {
      state.id = "";
      state.name = "";
      state.href = "";
    },
  },
});

export const { setLastProblem, removeLastProblem } = lastProblemSlice.actions;

export const selectLastProblem = (state: RootState) => state.lastProblem;

export default lastProblemSlice.reducer;
