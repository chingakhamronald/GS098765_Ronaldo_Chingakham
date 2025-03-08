import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ValidationModule,
  ValueParserParams,
} from "ag-grid-community";
import { usePlanning } from "../hooks/query/usePlanning";
import "../index.css";
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
  CellStyleModule,
  ValidationModule /* Development Only */,
]);

const widthCell = 250;

const Planning = () => {
  const numberParser = (params: ValueParserParams) => {
    console.log(params);
    const newValue = params.newValue;
    let valueAsNumber;
    if (newValue === null || newValue === undefined || newValue === "") {
      valueAsNumber = null;
    } else {
      valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
  };

  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Store",
      field: "store",
      width: widthCell,
    },
    {
      headerName: "SKU",
      field: "sku",
      width: widthCell,
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
              valueParser: numberParser,
              field: "gm_percent",
              flex: 1,
              cellClassRules: {
                "rag-green": "x > 40",
                "rag-yellow": "x >= 10 && x < 40",
                "rag-orange": "x > 5 && x < 10",
                "rag-red": "x <= 5",
              },
            },
          ],
        },
      ],
    },
  ]);

  const { data } = usePlanning(10);

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
      sx={{
        display: "flex",
        p: 3,
        marginX: 30,
        height: "calc(100vh - 64px)",
        width: "calc(100vw - 240px)",
      }}
    >
      <Box sx={{ height: "100%", width: "100%", flexGrow: 1 }}>
        <AgGridReact<IPlaningData> rowData={rowData} columnDefs={columnDefs} />
      </Box>
    </Box>
  );
};

export default Planning;
