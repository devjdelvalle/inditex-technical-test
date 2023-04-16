import { screen, cleanup } from "@testing-library/react";
import { App } from "../../../../infrastructure/app/app";
import { initialState, renderWithProviders } from "../../../setupTests";
import { Podcast } from "../../../../domain/models/podcast";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("LoadingIndicator", () => {
  it("renders", async () => {
    renderWithProviders(<App />, initialState);
    const li = screen.getByTestId("loading-indicator");
    expect(li).toBeInTheDocument();
    expect(li).toContainHTML("Loading");
  });
});
