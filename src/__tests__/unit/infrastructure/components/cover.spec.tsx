import { screen, cleanup, render } from "@testing-library/react";
import { initialState } from "../../../setupTests";
import Cover from "../../../../infrastructure/components/cover";
import { MemoryRouter } from "react-router-dom";
import { podcastDTOToEntity } from "../../../../infrastructure/store/podcasts/podcast.dto";

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
    render(
      <MemoryRouter>
        <Cover podcast={podcastDTOToEntity(initialState.podcasts.entries[0])} />
      </MemoryRouter>
    );
    const cover = screen.getByTestId("cover-1");
    expect(cover).toBeInTheDocument();
    expect(cover).toContainHTML("Podcast 1");
    expect(cover).toContainHTML("Author 1");
  });
});
