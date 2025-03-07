import { FC, ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Page from "./Page";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule /* Development Only */,
]);

const App: FC = () => {
  return (
    <ProviderWrapper>
      <CssBaseline />
      <Page />
    </ProviderWrapper>
  );
};

const ProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#F5F5F5" },
  },
});

export default App;
