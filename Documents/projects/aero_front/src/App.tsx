// App.tsx
import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Main from "./page/Main/Main";
import Layout from "./lay";
import Plane from "./page/Plane/Plane";
import Request from "./page/Request/Request";
import Polosa from "./page/Polosa/Polosa";
import Raspisanie from "./page/Raspisanie/Raspisanie";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Main />
      </Layout>
    ),
  },
  {
    path: "/plane",
    element: (
      <Layout>
        <Plane />
      </Layout>
    ),
  },
  {
    path: "/request",
    element: (
      <Layout>
        <Request />
      </Layout>
    ),
  },
  {
    path: "/polosa",
    element: (
      <Layout>
        <Polosa />
      </Layout>
    ),
  },
  {
    path: "/raspisanie",
    element: (
      <Layout>
        <Raspisanie />
      </Layout>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
};

export default App;
