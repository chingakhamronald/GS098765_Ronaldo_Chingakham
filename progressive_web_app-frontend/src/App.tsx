import { FC, ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Page from "./Page";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule /* Development Only */,
]);

export const instanceAxios = axios.create({
  baseURL: "http://localhost:3000/api",
  // timeout: 1000,
});

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <ProviderWrapper>
      <CssBaseline />
      <Page />
    </ProviderWrapper>
  );
};

const ProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#F5F5F5" },
  },
});

export default App;
