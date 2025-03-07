import { Box } from "@mui/material";
import CustomTable from "../components/CustomTable";
import { GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import stores from "../data/stores.json";

const column: GridColDef[] = [
  {
    field: "id",
    headerName: "S.No",
    width: 200,
    editable: true,
  },
  {
    field: "store",
    headerName: "Store",
    width: 200,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    width: 200,
    editable: true,
  },
  {
    field: "state",
    headerName: "State",
    width: 200,
    editable: true,
  },
];

export const initialStoresData = stores.map((e) => ({
  id: e["Seq No."],
  storeID: e["ID"],
  state: e["State"],
  city: e["City"],
  store: e["Label"],
}));

const Stores: FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginX: 30 }}>
      <CustomTable col={column} init={initialStoresData} />
    </Box>
  );
};

export default Stores;
