import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HymnListPage from "./pages/HymnListPage";
import HomePage from "./pages/HomePage";
import HymnDetailPage from "./pages/HymnDetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
import RegistrationPage from "./pages/RegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegistrationPage /> },
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
