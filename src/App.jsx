import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { httpClient } from "./httpClient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./Store/index";
import { Genres } from "./Pages/Genres";
import { MoviesPage } from "./Pages/MoviesPage";
import { TVsPage } from "./Pages/TVsPage";
import { SearchPage } from "./Pages/SearchPage";
import { Footer } from "./Components/Footer";
import { FavoritePage } from "./Pages/FavoritePage";

function App() {
  const sessionId = useSelector((state) => state.app.session_id);
  const dispatch = useDispatch();

  const getAccount = () => {
    httpClient
      .get("/account", {
        params: {
          session_id: sessionId,
          api_key: "85b8f8fbb0481197657035bf84174e27",
        },
      })
      .then((response) => dispatch(setCurrentUser(response.data)));
  };
  useEffect(() => {
    sessionId && getAccount();
  }, [sessionId]);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Footer />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/genres/:type/:id",
          element: <Genres />,
        },
        {
          path: "/search/:input",
          element: <SearchPage />,
        },
        {
          path: "/tv",
          element: <TVsPage />,
        },
        {
          path: "/movies",
          element: <MoviesPage />,
        },
        // {
        //   path: "/favorite",
        //   element: <FavoritePage />,
        // },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
