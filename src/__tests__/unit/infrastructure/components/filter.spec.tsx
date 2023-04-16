import { screen, cleanup, render, fireEvent } from "@testing-library/react";
import { App } from "../../../../infrastructure/app/app";
import { initialState, renderWithProviders } from "../../../setupTests";
import { CANCEL } from "redux-saga";
import Cover from "../../../../infrastructure/components/cover";
import Filter from "../../../../infrastructure/components/filter";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Filter", () => {
  it("renders", async () => {
    renderWithProviders(<Filter />, initialState);
    const filter = screen.getByTestId("filter");
    expect(filter).toBeInTheDocument();
    const input = screen.getByTestId("filter-input");
    fireEvent.change(input, { target: { value: "123" } });
    const v: HTMLInputElement = screen.getByDisplayValue("123");
    expect(v.value === "123").toBe(true);
  });
});
