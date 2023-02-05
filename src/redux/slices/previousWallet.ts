import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const initialState: string = "";

export const previousWalletSlice = createSlice({
  name: "previousWallet",
  initialState,
  reducers: {
    setPreviousWallet: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setPreviousWallet } = previousWalletSlice.actions;

export const selectPreviousWallet = (state: RootState) => state.previousWallet;

export default previousWalletSlice.reducer;
