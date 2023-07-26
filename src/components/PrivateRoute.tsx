import { useIsAuthenticated } from "react-auth-kit";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  const location = useLocation();

  return !auth ? (
    <Navigate to="/login" state={{ from: location }} replace={false} />
  ) : (
    children
  );
};

export default PrivateRoute;
