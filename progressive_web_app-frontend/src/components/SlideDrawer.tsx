import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListData } from "../contants";

export const drawerWidth = 240;

export default function SlideDrawer() {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {ListData.map((e, index) => {
              const Icon = e.icon;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={e.href}
                    sx={{
                      "&.active": {
                        backgroundColor: "secondary.main",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        ".active &": { color: "primary.main" },
                      }}
                    >
                      {Icon && <Icon />}
                    </ListItemIcon>
                    <ListItemText primary={e.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Toolbar />
    </Box>
  );
}
