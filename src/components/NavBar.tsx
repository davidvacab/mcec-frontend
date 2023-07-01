import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/card.jpg';

const NavBar = () => {
  return (
    <HStack>
        <Image src={logo} boxSize={"40px"} />
        <Text>Home</Text>
    </HStack>
  )
}

export default NavBar