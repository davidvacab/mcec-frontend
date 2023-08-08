import { useNavigate, useParams } from "react-router-dom";
import Info from "../components/Info";
import useUserActivate from "../hooks/useUserActivate";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const UserActivatePage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:page.activate")} | MCEC`);
  const { uid, token } = useParams();
  const { mutate: activate, isLoading } = useUserActivate();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    activate(
      { uid: uid, token: token },
      {
        onError(error) {
          console.log(error);
          toast({
            title: "Error",
            description: t("login.inv_cred"),
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          navigate("/", { replace: true });
        },
      }
    );
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Info
      title={t("account_activation.title")}
      description={t("account_activation.des")}
    />
  );
};

export default UserActivatePage;
