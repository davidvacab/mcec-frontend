import { useParams } from "react-router-dom";
import Info from "../components/Info";
import useUserActivate from "../hooks/useUserActivate";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../hooks/useDocumentTitle";

const UserActivatePage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:page.activate")} | MCEC`);
  const { uid, token } = useParams();
  const { mutate: activate, error, isLoading } = useUserActivate();

  activate({ uid: uid, token: token });

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <Info
      title={t("account_activation.title")}
      description={t("account_activation.des")}
    />
  );
};

export default UserActivatePage;
