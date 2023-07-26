import { LoaderFunctionArgs } from "react-router-dom";
import AuthClient from "../services/auth-client";
import Info from "../components/Info";

const authClient = new AuthClient();

export const activationLoader = async ({ params }: LoaderFunctionArgs) => {
  await authClient
    .activate({ uid: params.uid, token: params.token })
    .then((res) => {
      console.log(res);
      console.log(res.status);
      if (res.status !== 204) {
        throw new Response("Not Found", { status: 404 });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Response("Not Found", { status: 404 });
    });
  return null;
};

const AccountActivationPage = () => {
  return (
    <Info
      title="Activation"
      description="Activation Successful please go to the dashboard to login"
    />
  );
};

export default AccountActivationPage;
