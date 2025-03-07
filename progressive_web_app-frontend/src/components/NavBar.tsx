import { AppBar, Toolbar } from "@mui/material";
import Logo from "../assets/logo.svg?react";

const NavBar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Logo width={150} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
