import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { screen, cleanup, render } from "@testing-library/react";
import { initialState, renderWithProviders } from "../../../setupTests";
import DetailsView from "../../../../infrastructure/views/details/details.view";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Details", () => {
  it("renders podcast with episodes", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/podcast/1"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailsView />}></Route>
        </Routes>
      </MemoryRouter>,
      initialState
    );
    const cover = screen.getByTestId("details-view");
    expect(cover).toBeInTheDocument();
    expect(cover).toContainHTML("Podcast 1");
    expect(cover).toContainHTML("Author 1");
  });

  it("renders podcast without episodes", async () => {
    const state = {
      ...initialState,
      podcasts: {
        ...initialState.podcasts,
        entries: [
          ...initialState.podcasts.entries.map((e) => ({ ...e, episodes: [] })),
        ],
      },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={["/podcast/1"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailsView />}></Route>
        </Routes>
      </MemoryRouter>,
      state as any
    );
    const cover = screen.getByTestId("details-view");
    expect(cover).toBeInTheDocument();
    expect(cover).toContainHTML("Podcast 1");
    expect(cover).toContainHTML("Author 1");
  });

  it("renders podcast podcast", async () => {
    const state = {
      ...initialState,
      podcasts: {
        ...initialState.podcasts,
        entries: [],
      },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={["/podcast/1"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailsView />}></Route>
        </Routes>
      </MemoryRouter>,
      state as any
    );
    const cover = screen.getByTestId("details-view");
    expect(cover).toBeInTheDocument();
  });
});
