import React from "react";
import { Routes, Route } from "react-router-dom";
// import Loader from "./components/Loader";
const Home = React.lazy(() => import("./views/MainForm"));
const Detail = React.lazy(() => import("./views/DetailForm"));
const Edit = React.lazy(() => import("./views/EditForm"));

export const routes = [
  { path: "/", element: Home },
  {
    path: "/detail",
    element: Detail,
  },
  {
    path: "/edit",
    element: Edit,
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
