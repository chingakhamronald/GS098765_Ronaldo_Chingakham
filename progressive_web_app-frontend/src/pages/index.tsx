import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SildeDrawer from "../components/SlideDrawer";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box display="flex" flex={1}>
        <SildeDrawer />
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;
