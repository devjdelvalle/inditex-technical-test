import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UiState = {
  loading: boolean;
  filter: string;
};

const initialState: UiState = {
  loading: false,
  filter: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setFilter, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
