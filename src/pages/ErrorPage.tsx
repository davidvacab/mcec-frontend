import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Info from "../components/Info";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error))
    return <Info title="404" description="Page not found" variant="info" />;

  return (
    <Info title="Opss..." description="Something went wrong" variant="error" />
  );
};

export default ErrorPage;
