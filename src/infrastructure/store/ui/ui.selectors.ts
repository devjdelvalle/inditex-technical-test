import { MainState } from "../index";

export const getFilter = (state: MainState) => state.ui.filter;
export const getIsLoading = (state: MainState) => state.ui.loading;
