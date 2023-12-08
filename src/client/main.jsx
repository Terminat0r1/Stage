import React from "react";
import ReactDOM from "react-dom/client";

import "./scss/styles.scss";

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Stage from "./features/vibe/Stage.jsx";
import Root from "./layout/Root.jsx";
import ProfilePage from "./features/profile/ProfilePage";
import Bookmark from "./features/bookmark/Bookmark.jsx";
import Settings from "./features/setting/Settings.jsx";
import PostList from "./features/stage/PostList.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarMain from "./layout/TopNavbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <PostList /> },
      { path: "/stage", element: <Stage /> },
      { path: "/login", element: <AuthForm /> },
      { path: "/profile/:id", element: <ProfilePage /> },
      { path: "/bkmark", element: <Bookmark /> },
      { path: "/settings", element: <Settings /> },
    ],
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
