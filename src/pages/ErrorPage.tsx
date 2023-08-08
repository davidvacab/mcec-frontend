import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Info from "../components/Info";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation("common");
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error))
    return <Info title="404" description={t("label.404_des")} variant="info" />;

  return (
    <Info title="Opss..." description={t("label.error_des")} variant="error" />
  );
};

export default ErrorPage;
