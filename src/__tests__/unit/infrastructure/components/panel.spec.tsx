import { screen, cleanup, render } from "@testing-library/react";
import { initialState } from "../../../setupTests";
import Cover from "../../../../infrastructure/components/cover";
import { MemoryRouter } from "react-router-dom";
import Panel from "../../../../infrastructure/components/panel";

const mockedUsedNavigate = jest.fn();

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Panel", () => {
  it("renders", async () => {
    render(
      <Panel>
        <p>Testing panel</p>
      </Panel>
    );
    const panel = screen.getByTestId("panel");
    expect(panel).toBeInTheDocument();
    expect(panel).toContainHTML("Testing panel");
  });
});
