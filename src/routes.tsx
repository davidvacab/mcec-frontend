import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HymnListPage from "./pages/HymnListPage";
import HomePage from "./pages/HomePage";
import HymnDetailPage from "./pages/HymnDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "hymns/", element: <HymnListPage /> },
      { path: "hymns/:id", element: <HymnDetailPage /> },
    ],
  },
]);

export default router;
