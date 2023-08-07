import { Spinner, useToast } from "@chakra-ui/react";
import Info from "../components/Info";
import useMainStore from "../store";
import useResendActivate from "../hooks/useResendActivate";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AwaitActivationPage = () => {
  const { t } = useTranslation("members");
  useDocumentTitle(`${t("common:page.await_activation")} | MCEC`);
  const email = useMainStore((s) => s.mainElements.registrationEmail);
  const toast = useToast();
  const { mutate: resend, isLoading } = useResendActivate();
  const [disable, setDisable] = useState(false);

  const onResendEmail = () => {
    resend(email, {
      onSettled: () => {
        setDisable(true);
        toast({
          title: t("await_activation.title"),
          description: t("await_activation.des"),
          status: "info",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  if (isLoading) return <Spinner />;

  if (email === undefined) throw new Response("Not Found", { status: 404 });

  return (
    <Info
      title={t("await_activation.title")}
      description={t("await_activation.des")}
      variant="info"
      button2={true}
      button2Text={t("await_activation.button")}
      button2OnClick={onResendEmail}
      button2Disabled={disable}
    />
  );
};

export default AwaitActivationPage;
