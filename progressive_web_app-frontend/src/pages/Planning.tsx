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
import { usePlanning } from "../hooks/query/usePlanning";
import { light } from "@mui/material/styles/createPalette";

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
              headerName: "Sales Units",
              field: "sales_units",
            },
            {
              headerName: "Sales Dollers",
              field: "sales_dollars",
            },
            {
              headerName: "GM Dollars",
              field: "gm_dollars",
            },
            {
              headerName: "GM Percent",
              field: "gm_percent",
            },
          ],
        },
      ],
    },
  ]);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = usePlanning(10);

  console.log({
    "SKU...": data,
    "loading....": isLoading,
    "fetchNextPage...": fetchNextPage,
    "fetchPreviousPage...": fetchPreviousPage,
    "NextPage...": hasNextPage,
    "PreviousPage...": hasPreviousPage,
    "isFetchNextPage...": isFetchingNextPage,
    "isFetchPrevPage...": isFetchingPreviousPage,
  });

  const priceCal = useCallback((e: any) => {
    let u = Math.round(e.units.split("$").pop());
    let p = Math.round(e.sku.price.split("$").pop());
    let c = Math.round(e.sku.cost.split("$").pop());

    const saleDollar = u * p;
    const gmDollar = saleDollar - u * c;

    return { saleDollar, gmDollar };
  }, []);

  const rowData = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((e) =>
      e.data.map((item: any) => {
        const calDollarAndCost = priceCal(item);

        return {
          store: item.store.storeName,
          sku: item.sku.skuName,
          sales_units: item.units,
          sales_dollars: `$ ${calDollarAndCost.saleDollar.toFixed(2)}`,
          gm_dollars: `$ ${calDollarAndCost.gmDollar.toFixed(2)}`,
          gm_percent: (
            (calDollarAndCost.gmDollar / calDollarAndCost.saleDollar) *
            100
          ).toFixed(2),
        };
      })
    );
  }, [data]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, marginX: 30, height: "90vh" }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </Box>
  );
};

export default Planning;
