import { IconButton, useColorMode } from "@chakra-ui/react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Dark Mode"
      rounded={"full"}
      bg={"transparent"}
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
    />
  );
};

export default ColorModeSwitch;
