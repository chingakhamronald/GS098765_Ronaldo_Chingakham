import { Box, CircularProgress } from "@mui/material";
import CustomTable from "../components/CustomTable";
import { GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { useStores } from "../hooks/query/useStores";
import { useUpdateStore } from "../hooks/mutation/useUpdateStore";
import { IStore } from "../type";
import { useCreateStore } from "../hooks/mutation/useCreateStore";
import { useDeleteStore } from "../hooks/mutation/useDeleteStore";

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

const Stores: FC = () => {
  const { data, isLoading, isFetching } = useStores();
  const initialStoresData = data?.data.map((e: IStore, idx: number) => ({
    id: idx + 1,
    storeID: e.storeId,
    state: e.state,
    city: e.city,
    store: e.storeName,
  }));

  const { mutate } = useUpdateStore();

  const { mutate: createMutate } = useCreateStore();

  const { mutate: removeStore } = useDeleteStore();

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
            init={initialStoresData}
            name="store"
            createMutate={createMutate}
            updateMutate={mutate}
            deleteMutate={removeStore}
          />
        )}
      </Box>
    </Box>
  );
};

export default Stores;
