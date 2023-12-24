// App.tsx
import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Main from "./page/Main/Main";
import Layout from "./lay";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Main />
      </Layout>
    ),
  },
  // {
  //   path: "/guest",
  //   element: (
  //     <Layout>
  //     </Layout>
  //   ),
  // },
  // {
  //   path: "/request",
  //   element: (
  //     <Layout>
  //       <Request />
  //     </Layout>
  //   ),
  // },
  // {
  //   path: "/room",
  //   element: (
  //     <Layout>
  //       <Room />
  //     </Layout>
  //   ),
  // },
  // {
  //   path: "/simulation",
  //   element: (
  //     <Layout>
  //       <Simulation />
  //     </Layout>
  //   ),
  // },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
};

export default App;
