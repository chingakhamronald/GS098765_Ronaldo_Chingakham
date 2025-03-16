import { Box, Button } from "@mui/material";
import WrongLogo from "./assets/something_wrong.svg?react";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error?: any;
  resetErrorBoundary?: () => void;
}) => {
  console.log({ "error...": error });
  return (
    <Box
      role="alert"
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <WrongLogo />
        <pre style={{ color: "red" }}>{error?.message}</pre>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={resetErrorBoundary || (() => window.location.reload())}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorFallback;
