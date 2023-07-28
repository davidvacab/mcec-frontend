import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HymnListPage from "./pages/HymnListPage";
import HomePage from "./pages/HomePage";
import HymnDetailPage from "./pages/HymnDetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import SignUpPage from "./pages/SignUpPage";
import UserActivatePage from "./pages/UserActivatePage";
import AwaitActivationPage from "./pages/AwaitActivationPage";
import PassResetPage from "./pages/PassResetPage";
import PassResetConfirmPage from "./pages/ResetPassConfirmPage";
import ProfilePage from "./pages/AccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <SignUpPage /> },

      {
        path: "/activate-account",
        element: <AwaitActivationPage />,
      },
      {
        path: "/activation/:uid/:token",
        element: <UserActivatePage />,
      },
      {
        path: "/password-reset",
        element: <PassResetPage />,
      },
      {
        path: "/password-reset/:uid/:token",
        element: <PassResetConfirmPage />,
      },
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
