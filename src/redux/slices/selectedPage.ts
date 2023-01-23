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

export const selectedPage = createSlice({
  name: "selectedPage",
  initialState,
  reducers: {
    setSelectedPage: (state, action: PayloadAction<SelectedPageState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setSelectedPage } = selectedPage.actions;

export default selectedPage.reducer;
