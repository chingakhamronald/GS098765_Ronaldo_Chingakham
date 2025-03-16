import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SildeDrawer from "../components/SlideDrawer";
import { Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";

const Layout = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NavBar />
      <Box display="flex" flex={1}>
        <SildeDrawer />
      </Box>
      <Outlet />
    </ErrorBoundary>
  );
};

export default Layout;
