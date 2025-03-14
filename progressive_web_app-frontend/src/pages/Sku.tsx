import { Box, CircularProgress } from "@mui/material";
import CustomTable from "../components/CustomTable";
import { GridColDef, GridColTypeDef } from "@mui/x-data-grid";
import { currencyFormatter } from "../utils";
import { useSku } from "../hooks/query/useSku";
import { ISku } from "../type";
import { useUpdateSku } from "../hooks/mutation/useUpdateSku";
import { useCreateSku } from "../hooks/mutation/useCreateSku";

const usdPrice: GridColTypeDef = {
  type: "number",
  width: 150,
  valueFormatter: (value) => currencyFormatter.format(value),
  cellClassName: "font-tabular-nums",
  editable: true,
};

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
const Sku = () => {
  const { data, isLoading, isFetching } = useSku();
  const { mutate } = useUpdateSku();

  const { mutate: createSku } = useCreateSku();

  const initialSkuData = data?.data.map((e: ISku, idx: number) => {
    const price = e.price.split("$").pop();
    const cost = e.cost.split("$").pop();

    return {
      id: idx + 1,
      sku: e.skuName,
      skuId: e.skuId,
      price,
      cost,
    };
  });

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
        {isFetching && isLoading ? (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CircularProgress color="secondary" size={25} />
          </Box>
        ) : (
          <CustomTable
            col={column}
            init={initialSkuData}
            name="sku"
            createMutate={createSku}
            updateMutate={mutate}
          />
        )}
      </Box>
    </Box>
  );
};

export default Sku;
