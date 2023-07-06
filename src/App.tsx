import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Hymnbook from "./Hymnbook/components/Hymnbook";

function App() {
  return (
    <Flex flexDirection={"column"}>
      <NavBar />
      <Hymnbook />
    </Flex>
  );
}

export default App;
