import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  ValidationModule,
  createGrid,
} from "ag-grid-community";
import { initialPlaning } from "../data";
import { initialSkuData } from "./Sku";
import { initialStoresData } from "./Stores";

export interface IPlaningData {
  store: string;
  sku: string;
  sales_units: string;
  sales_dollers: string;
  gm_dollers: string;
  gm_percent: string;
}

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule /* Development Only */,
]);

const Planning = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IPlaningData[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Store",
      field: "store",
    },
    {
      headerName: "SKU",
      field: "sku",
    },
    {
      headerName: "Feb",
      children: [
        {
          headerName: "Week 01",
          children: [
            {
              headerClass: "Sales Units",

              field: "sales_units",
            },
            {
              headerClass: "Sales Dollers",
              field: "sales_dollers",
            },
            {
              headerClass: "GM Dollars",
              field: "gm_dollers",
            },
            {
              headerClass: "GM Percent",
              field: "gm_percent",
            },
          ],
        },
      ],
    },
  ]);

  console.log({
    "SKU...": initialSkuData.slice(0, 10),
    "Stores....": initialStoresData,
  });

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, marginX: 30, height: "90vh" }}
    >
      <AgGridReact<IPlaningData>
        rowData={initialPlaning}
        columnDefs={columnDefs}
      />
    </Box>
  );
};

export default Planning;
