import reducer, {
  setFilter,
  UiState,
} from "../../../../../infrastructure/store/ui/ui.slice";

describe("ui Slice", () => {
  const previousState: UiState = {
    loading: false,
    filter: "",
  };

  it("setFilters", async () => {
    expect(reducer(previousState, setFilter("test"))).toEqual({
      ...previousState,
      filter: "test",
    });
  });
});
