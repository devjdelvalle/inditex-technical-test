import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../views/home";
import Details from "../views/details";
import Chapter from "../views/chapter";
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
        path: "/podcast",
        element: <Details />,
      },
      {
        path: "/podcast/episode",
        element: <Chapter />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
