import { Box, Paper } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  PaginationChangedEvent,
  PaginationModule,
} from "ag-grid-community";
import { usePlanning } from "../hooks/query/usePlanning";
import "../index.css";

export interface IPlanningData {
  store: string;
  sku: string;
  sales_units: string;
  sales_dollars: string;
  gm_dollars: string;
  gm_percent: string;
}

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CellStyleModule,
  PaginationModule,
]);

const widthCell = 250;

const Planning = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetching } = usePlanning(20);

  const priceCal = useCallback((e: any) => {
    let u = Math.round(e.units.split("$").pop());
    let p = Math.round(e.sku.price.split("$").pop());
    let c = Math.round(e.sku.cost.split("$").pop());

    const saleDollar = u * p;
    const gmDollar = saleDollar - u * c;
    const gmPercent = (gmDollar / saleDollar) * 100;

    return { saleDollar, gmDollar, gmPercent };
  }, []);

  const columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: "Store", field: "store", width: widthCell },
    { headerName: "SKU", field: "sku", width: widthCell },
    {
      headerName: "Feb",
      children: [
        {
          headerName: "Week 01",
          children: [
            { headerName: "Sales Units", field: "sales_units" },
            { headerName: "Sales Dollars", field: "sales_dollars" },
            { headerName: "GM Dollars", field: "gm_dollars" },
            {
              headerName: "GM Percent",
              field: "gm_percent",
              flex: 1,
              cellClassRules: {
                "rag-green": "x >= 40",
                "rag-yellow": "x >= 10 && x < 40",
                "rag-orange": "x > 5 && x < 10",
                "rag-red": "x <= 5",
              },
            },
          ],
        },
      ],
    },
  ];

  // Process API data and merge with existing data
  useMemo(() => {
    if (!data) return [];

    const newRows = data?.pages?.flatMap((e) =>
      e.data.map((item: any) => {
        const calDollarAndCost = priceCal(item);
        return {
          store: item.store.storeName,
          sku: item.sku.skuName,
          sales_units: item.units,
          sales_dollars: `$ ${calDollarAndCost.saleDollar.toFixed(2)}`,
          gm_dollars: `$ ${calDollarAndCost.gmDollar.toFixed(2)}`,
          gm_percent: calDollarAndCost.gmPercent.toFixed(2),
        };
      })
    );

    setRowData((prev) => [...prev, ...newRows]); // Append new data instead of replacing
  }, [data]);

  const onPaginationChanged = useCallback(
    (e: PaginationChangedEvent<IPlanningData>) => {
      const currentPage = e.api.paginationGetCurrentPage();
      const totalPages = e.api.paginationGetTotalPages();

      if (currentPage + 1 >= totalPages && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching]
  );

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        p: 3,
        marginX: 30,
        height: "calc(100vh - 64px)",
        width: "calc(100vw - 240px)",
      }}
    >
      <Box
        sx={{ height: "100%", width: "100%", flexGrow: 1 }}
        component={Paper}
      >
        <AgGridReact<IPlanningData>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          onPaginationChanged={onPaginationChanged}
        />
      </Box>
    </Box>
  );
};

export default Planning;
