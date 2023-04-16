import { screen, cleanup, render } from "@testing-library/react";
import { App } from "../../../../infrastructure/app/app";
import { initialState, renderWithProviders } from "../../../setupTests";
import { CANCEL } from "redux-saga";
import Cover from "../../../../infrastructure/components/cover";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Cover", () => {
  it("renders", async () => {
    render(<Cover podcast={initialState.podcasts.entries[0]} />);
    const cover = screen.getByTestId("cover-1");
    expect(cover).toBeInTheDocument();
    expect(cover).toContainHTML("Podcast 1");
    expect(cover).toContainHTML("Author 1");
  });
});
