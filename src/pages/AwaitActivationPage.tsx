import { Spinner, useToast } from "@chakra-ui/react";
import Info from "../components/Info";
import useMainStore from "../store";
import useResendActivate from "../hooks/useResendActivate";
import { useState } from "react";

const AwaitActivationPage = () => {
  const email = useMainStore((s) => s.mainElements.registrationEmail);
  const toast = useToast();
  const { mutate: resend, isLoading } = useResendActivate();
  const [disable, setDisable] = useState(false);

  const onResendEmail = () => {
    resend(email, {
      onSettled: () => {
        setDisable(true);
        toast({
          title: "Email sent",
          description: "Email has been sent",
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
      title="Email sent"
      description="An email was send with an activation link"
      variant="info"
      button2={true}
      button2Text="Resend Email"
      button2OnClick={onResendEmail}
      button2Disabled={disable}
    />
  );
};

export default AwaitActivationPage;
