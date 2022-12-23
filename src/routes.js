import React from "react";
import { Routes, Route } from "react-router-dom";
// import Loader from "./components/Loader";
const Home = React.lazy(() => import("./views/MainForm"));
const Detail = React.lazy(() => import("./views/DetailForm"));

export const routes = [
  { path: "/", element: Home },
  {
    path: "/detail",
    element: Detail,
  },
];

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <React.Suspense
              //   fallback={<Loader />}
              >
                <route.element />
              </React.Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};
