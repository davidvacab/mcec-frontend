import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import useMainStore from "../store";

const AlertMessage = () => {
  const { status, title, description } = useMainStore(
    (s) => s.mainElements.alertElements
  );
  const closeAlert = useMainStore((s) => s.closeAlert);
  const isAlertOpen = useMainStore((s) => s.mainElements.isAlertOpen);
  return (
    isAlertOpen && (
      <Alert status={status} justifyContent={"space-between"} textAlign={"center"}>
        <AlertIcon />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={closeAlert}
        />
      </Alert>
    )
  );
};

export default AlertMessage;
