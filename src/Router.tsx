import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "react-auth-kit";
import HymnListPage from "./pages/HymnListPage";
import HymnDetailPage from "./pages/HymnDetailPage";
import refreshApi from "./services/refresh-api";
import PrivateRoute from "./pages/PrivateRoute";

const Router = () => {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
      refresh={refreshApi}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index={true} element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/hymns"
              element={
                <PrivateRoute>
                  <HymnListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/hymns/:id"
              element={
                <PrivateRoute>
                  <HymnDetailPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
