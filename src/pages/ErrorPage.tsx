import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import InfoPage from "../components/InfoPage";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error))
    return <InfoPage title="404" description="Page not found" variant="info" />;

  return (
    <InfoPage
      title="Opss..."
      description="Something went wrong"
      variant="error"
    />
  );
};

export default ErrorPage;
