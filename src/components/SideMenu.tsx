import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

export interface SideMenuProps {
  width: number;
  open: boolean;
  onClose: () => void;
}

export default function SideMenu({ width, open, onClose }: SideMenuProps) {
  const routes = [
    { path: "/", name: "Home" },
    { path: "/counter-and-snackbar", name: "Counter and snackbar" },
    { path: "/interval-counter", name: "Interval counter" },
    { path: "/shopping-list", name: "Shopping list" },
    { path: "/debounce-time", name: "Input with debounce time" },
    { path: "/ids-list", name: "IDs list" },
  ];

  const sideMenuContent = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          React Hooks
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            onClick={onClose}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>{route.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width },
        }}
      >
        {sideMenuContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width,
          },
        }}
      >
        {sideMenuContent}
      </Drawer>
    </>
  );
}
