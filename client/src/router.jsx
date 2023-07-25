import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root";
import Auth from './components/auth';

import Dashboard from "./components/dashboard";
import DashboardMain from "./components/dashboard/main";
import AdminArticles from "./components/dashboard/articles";
import ArticleForm from "./components/dashboard/articles/form";
import AdminProfile from "./components/dashboard/profile";

import AuthGuard from './hoc/authGuard';
import Home from "./components/home";
import Article from "./components/articles/article";
import AccountVerify from "./components/auth/verification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/auth", element: <Auth />, },
      { path: "/verification", element: <AccountVerify />, },
      { path: "/articles/article/:articleId", element: <Article />, },
      { index: true, element: <Home /> },
      {
        path: "/dashboard",
        element: <AuthGuard><Dashboard /></AuthGuard>,
        children: [
          { index: true, element: <DashboardMain /> },
          { path: "articles", element: <AdminArticles /> },
          { path: "articles/add", element: <ArticleForm /> },
          { path: "articles/edit/:articleId", element: <ArticleForm /> },
          { path: "profile", element: <AdminProfile /> },
        ]
      },
    ]
  },

])

export default router;