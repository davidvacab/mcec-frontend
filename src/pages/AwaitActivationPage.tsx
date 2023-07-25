import { useToast } from "@chakra-ui/react";
import InfoPage from "../components/InfoPage";
import AuthClient from "../services/auth-client";
import useMainStore from "../store";

const authClient = new AuthClient();

const AwaitActivationPage = () => {
  const email = useMainStore((s) => s.mainElements.registrationEmail);
  const setEmail = useMainStore((s) => s.setRegistrationEmail);
  const toast = useToast();
  const onResendEmail = () => {
    authClient
      .resendActivate(email)
      .then((res) => {
        console.log(res);
        toast({
          title: "Email sent",
          description: "Email has been sent",
          status: "info",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        setEmail(undefined);
        throw new Response("Not Found", { status: 404 });
      });
  };

  if (email === undefined) throw new Response("Not Found", { status: 404 });

  return (
    <InfoPage
      title="Email sent"
      description="An email was send with an activation link"
      variant="info"
      button2={true}
      button2Text="Resend Email"
      button2OnClick={onResendEmail}
    />
  );
};

export default AwaitActivationPage;
