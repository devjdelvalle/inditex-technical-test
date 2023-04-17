import { screen, cleanup, render } from "@testing-library/react";
import { initialState } from "../../../setupTests";
import Cover from "../../../../infrastructure/components/cover";
import { MemoryRouter } from "react-router-dom";
import PodcastInfo from "../../../../infrastructure/components/podcastInfo";
import { podcastDTOToEntity } from "../../../../infrastructure/store/podcasts/podcast.dto";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("PodcastInfo", () => {
  it("renders", async () => {
    render(
      <MemoryRouter>
        <PodcastInfo
          podcast={podcastDTOToEntity(initialState.podcasts.entries[0])}
        />
      </MemoryRouter>
    );
    const cover = screen.getByTestId("podcast-info");
    expect(cover).toBeInTheDocument();
    expect(cover).toContainHTML("Podcast 1");
    expect(cover).toContainHTML("Author 1");
  });
});
