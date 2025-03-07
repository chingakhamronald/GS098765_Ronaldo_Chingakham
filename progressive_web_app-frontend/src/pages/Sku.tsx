import { Box } from "@mui/material";
import CustomTable from "../components/CustomTable";
import { GridColDef, GridColTypeDef } from "@mui/x-data-grid";
import { currencyFormatter } from "../utils";
import sku from "../data/sku.json";

const usdPrice: GridColTypeDef = {
  type: "number",
  width: 150,
  valueFormatter: (value) => currencyFormatter.format(value),
  cellClassName: "font-tabular-nums",
  editable: true,
};

export const initialSkuData = sku.map((e, idx) => ({
  id: idx,
  uuid: e["ID"],
  sku: e["Label"],
  price: e["Price"],
  cost: e["Cost"],
  class: e["Class"],
  department: e["Department"],
}));

const Sku = () => {
  const column: GridColDef[] = [
    {
      field: "sku",
      headerName: "SKU",
      width: 200,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      ...usdPrice,
    },
    {
      field: "cost",
      headerName: "Cost",
      ...usdPrice,
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginX: 30 }}>
      <CustomTable col={column} init={initialSkuData} />
    </Box>
  );
};

export default Sku;
