import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../views/home/home.view";
import DetailsView from "../views/details/details.view";
import ChapterView from "../views/chapter/chapter.view";
import Header from "../components/header";
import Container from "../components/container";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Container>
          <Header></Header>
          <Outlet />
        </Container>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/podcast/:podcastId",
        element: <DetailsView />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <ChapterView />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
