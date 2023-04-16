import { screen, cleanup } from "@testing-library/react";
import { App } from "../../../../infrastructure/app/app";
import { initialState, renderWithProviders } from "../../../setupTests";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("App", () => {
  it("renders", async () => {
    renderWithProviders(<App />, initialState);
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
  });
});
