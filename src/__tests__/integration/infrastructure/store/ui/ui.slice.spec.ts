import reducer, {
  setFilters,
  UiState,
} from "../../../../../infrastructure/store/ui/ui.slice";

describe("ui Slice", () => {
  const previousState: UiState = {
    loading: false,
    filters: "",
  };

  it("setFilters", async () => {
    expect(reducer(previousState, setFilters("test"))).toEqual({
      ...previousState,
      filters: "test",
    });
  });
});
