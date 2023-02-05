import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { ModalType } from "constants/modal";

const initialState: string = ModalType.CLOSED;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => action.payload,
    closeModal: () => ModalType.CLOSED,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
