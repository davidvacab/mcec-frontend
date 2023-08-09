import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/AccountPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import HymnDetailPage from "./pages/HymnDetailPage";
import HymnListPage from "./pages/HymnListPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/register", element: <SignUpPage /> },
      // {
      //   path: "/activate-account",
      //   element: <AwaitActivationPage />,
      // },
      // {
      //   path: "/activation/:uid/:token",
      //   element: <UserActivatePage />,
      // },
      // {
      //   path: "/password-reset",
      //   element: <PassResetPage />,
      // },
      // {
      //   path: "/password-reset/:uid/:token",
      //   element: <PassResetConfirmPage />,
      // },
      {
        path: "/profile/me",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/hymns",
        element: (
          <PrivateRoute>
            <HymnListPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/hymns/:id",
        element: (
          <PrivateRoute>
            <HymnDetailPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
