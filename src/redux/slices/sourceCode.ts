import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const initialState: {
  [id: string]: string;
} = {};

export const sourceCodeSlice = createSlice({
  name: "sourceCode",
  initialState,
  reducers: {
    setSourceCode: (
      state,
      action: PayloadAction<{ id: string; code: string }>
    ) => {
      state[action.payload.id] = action.payload.code;
    },
  },
});

export const { setSourceCode } = sourceCodeSlice.actions;

export const selectSourceCode = (state: RootState, id: string) =>
  state.sourceCode[id];

export default sourceCodeSlice.reducer;
