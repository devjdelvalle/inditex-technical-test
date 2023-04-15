import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MainState } from "../index";

type UiState = {
  loading: boolean;
  filters: string;
};

const initialState: UiState = {
  loading: false,
  filters: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<string>) => {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = uiSlice.actions;
export default uiSlice.reducer;
