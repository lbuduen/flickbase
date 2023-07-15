import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root";
import Auth from './components/auth';

import Dashboard from "./components/dashboard";
import DashboardMain from "./components/dashboard/main";
import AdminArticles from "./components/dashboard/articles";
import AdminProfile from "./components/dashboard/profile";

import AuthGuard from './hoc/authGuard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: <AuthGuard><Dashboard /></AuthGuard>,
        children: [
          {
            index: true,
            element: <DashboardMain />
          },
          {
            path: "articles",
            element: <AdminArticles />
          },
          {
            path: "profile",
            element: <AdminProfile />
          },
        ]
      },
    ]
  },

])

export default router;