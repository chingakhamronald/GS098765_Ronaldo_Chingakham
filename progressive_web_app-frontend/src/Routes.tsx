import Layout from "./pages";
import Stores from "./pages/Stores";
import Sku from "./pages/Sku";
import { createBrowserRouter } from "react-router-dom";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/stores",
        Component: Stores,
      },
      {
        path: "/sku",
        Component: Sku,
      },
      {
        path: "/planning",
        Component: Planning,
      },
      {
        path: "/charts",
        Component: Charts,
      },
    ],
  },
]);
