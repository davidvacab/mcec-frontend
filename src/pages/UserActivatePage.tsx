import { useParams } from "react-router-dom";
import Info from "../components/Info";
import useUserActivate from "../hooks/useUserActivate";
import { Spinner } from "@chakra-ui/react";

const UserActivatePage = () => {
  const { uid, token } = useParams();
  const { mutate: activate, error, isLoading } = useUserActivate();

  activate({ uid: uid, token: token });

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <Info
      title="Activation"
      description="Activation Successful please go to the dashboard to login"
    />
  );
};

export default UserActivatePage;
