import { AppBar, Toolbar } from "@mui/material";
import Logo from "../assets/logo.svg?react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo width={150} />
          <AccountCircleIcon fontSize="large" />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
