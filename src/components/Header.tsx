import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Toolbar } from "@mui/material";
import ModeSwitcher from "./ModeSwitcher";

export interface HeaderProps {
  toggleSideMenu: () => void;
}

export default function Header({ toggleSideMenu }: HeaderProps) {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={toggleSideMenu}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <ModeSwitcher></ModeSwitcher>
    </Toolbar>
  );
}
