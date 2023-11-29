import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Tasks from "./features/tasks/Tasks";
import Root from "./layout/Root.jsx";
import ProfilePage from "./features/profile/ProfilePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarMain from "./layout/TopNavbar.jsx";



const rootRoutes = [
  { path: "/", element: <Tasks /> },
  { path: "/login", element: <AuthForm /> },
];

const otherRoutes = [
  { path: "/tasks", element: <Tasks /> },
  { path: "/profile", element: <ProfilePage /> },
  // Add more routes as needed
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: rootRoutes,
  },
  {
    path: "/",  // This catches all paths not covered by rootRoutes
    element: <NavbarMain />,
    children: otherRoutes,
  },
]);





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);





// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       { path: "/", element: <Tasks /> },
//       { path: "/tasks", element: <Tasks /> },
//       { path: "/login", element: <AuthForm /> },
//       { path:"/profile", element: <ProfilePage/> },
//     ],
//   },
// ]);
