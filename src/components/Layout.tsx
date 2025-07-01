import { AppBar, Box } from "@mui/material";
import { useState } from "react";
import SnackbarProvider from "../providers/snackbar/SnackbarProvider";
import Header from "./Header";
import SideMenu from "./SideMenu";

const sideMenuWidth = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSideMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeSideMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          width: { sm: `calc(100% - ${sideMenuWidth}px)` },
          ml: { sm: `${sideMenuWidth}px` },
        }}
      >
        <Header toggleSideMenu={toggleSideMenu} />
      </AppBar>

      <SideMenu
        width={sideMenuWidth}
        open={mobileOpen}
        onClose={closeSideMenu}
      />

      <SnackbarProvider>
        <Box sx={{ ml: { sm: `${sideMenuWidth}px` }, p: 2 }}>{children}</Box>
      </SnackbarProvider>
    </>
  );
}
