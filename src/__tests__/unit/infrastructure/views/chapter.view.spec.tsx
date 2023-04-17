import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { screen, cleanup } from "@testing-library/react";
import { initialState, renderWithProviders } from "../../../setupTests";
import ChapterView from "../../../../infrastructure/views/chapter/chapter.view";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useState: jest.fn(),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const setState = jest.fn();

describe("Chapter", () => {
  let setState;

  beforeEach(() => {
    setState = jest.fn((x) => {});
  });

  it("renders chapter details", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/podcast/1/episode/1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<ChapterView testing={true} />}
          ></Route>
        </Routes>
      </MemoryRouter>,
      initialState
    );
    const cover = screen.getByTestId("chapter-view");
    expect(cover).toBeInTheDocument();
  });
});
