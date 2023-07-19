import { useIsAuthenticated } from "react-auth-kit";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
