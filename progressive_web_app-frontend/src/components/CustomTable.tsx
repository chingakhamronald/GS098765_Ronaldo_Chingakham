import { Box, Button, Paper } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { FC, use, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useUpdateStore } from "../hooks/mutation/useUpdateStore";
import { useCreateStore } from "../hooks/mutation/useCreateStore";
import { IStorePostData } from "../type";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
    rows: GridRowsProp;
  }
}

interface ICustomTableProps {
  col: GridColDef[];
  init: GridRowsProp;
  name: string;
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel, rows } = props;

  const editableFields = Object.keys(rows[0] || {}).filter(
    (key) => key !== "id"
  )[0];

  const handleClick = () => {
    const nextId = (rows.length + 1).toString();

    setRows((oldRows) => {
      const skuId = "SK" + Math.floor(1000 + Math.random() * 9000);
      const storeId = "ST" + Math.floor(1000 + Math.random() * 9000);

      const keyAbstract = Object.keys(oldRows[0]);
      const newRow = Object.fromEntries(keyAbstract.map((key) => [key, ""]));

      let newEntryData: any = {
        ...newRow,
        id: nextId,
        isNew: true,
      };

      if ("skuId" in newRow) {
        newEntryData.skuId = skuId;
      } else {
        newEntryData.storeID = storeId;
      }

      return [newEntryData, ...oldRows];
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [nextId]: { mode: GridRowModes.Edit, fieldToFocus: editableFields },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const CustomTable: FC<ICustomTableProps> = ({ col, init, name }) => {
  const [rows, setRows] = useState(init);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { mutate } = useUpdateStore();

  const { mutate: createMutate } = useCreateStore();

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);

    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  //update store and sku
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };

    let storeData: any = {};

    switch (name) {
      case "store":
        storeData = {
          storeId: newRow.storeID,
          storeName: newRow.store,
          city: newRow.city,
          state: newRow.state,
        };

        break;
      default:
        storeData = {
          skuId: newRow.skuId,
          cost: `${newRow.cost}`,
          price: `${newRow.price}`,
        };

        break;
    }

    if (newRow.isNew) {
      createMutate(storeData, {
        onSuccess: () => {
          setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        },
      });
    } else {
      mutate(storeData, {
        onSuccess: () => {
          setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        },
      });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const column: GridColDef[] = [
    ...col,
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              color="success"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="error"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      component={Paper}
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .font-tabular-nums": {
          fontVariantNumeric: "tabular-nums",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={column}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rows },
        }}
      />
    </Box>
  );
};

export default CustomTable;
