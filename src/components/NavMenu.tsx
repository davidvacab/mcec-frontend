import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<GiHamburgerMenu />}
        variant="outline"
      />
      <MenuList>
        <MenuGroup title="Cuenta">
          <MenuItem>Iniciar Sesion</MenuItem>
          <MenuItem>Registrarse</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Repertorio" >
          <MenuItem>Repertorio</MenuItem>
          <MenuItem>Enviar Canto</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
