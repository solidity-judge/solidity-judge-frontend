import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SelectedPageState {
  id: string;
  name: string;
}

const initialState: SelectedPageState = {
  id: "home",
  name: "Home",
};

export const selectedPageSlice = createSlice({
  name: "selectedPage",
  initialState,
  reducers: {
    setSelectedPage: (state, action: PayloadAction<SelectedPageState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setSelectedPage } = selectedPageSlice.actions;

export default selectedPageSlice.reducer;
