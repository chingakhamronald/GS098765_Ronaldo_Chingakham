import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

const Page: FC = () => {
  return <RouterProvider router={router} />;
};

export default Page;
