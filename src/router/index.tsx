import { useRoutes } from "react-router-dom";

import Layout from "../themes";
import Home from "../pages/Home";
import FilmGrid from "../pages/FilmGrid";
import FilmDetail from "../pages/FilmDetail";
import AddFilm from "../pages/AddFilm";
import Theater from "../pages/Theater";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "film",
          element: <FilmGrid />,
        },
        {
          path: "film/:id",
          element: <FilmDetail />,
        },
        {
            path: "add-film",
            element: <AddFilm />,
        },
        {
          path: "theater",
          element: <Theater />,
        },
        {
          path: "users",
        },

      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
