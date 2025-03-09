import { IListData } from "./type";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";

export const ListData: IListData[] = [
  {
    title: "Stores",
    href: "/stores",
    icon: LocalGroceryStoreIcon,
  },
  {
    title: "SKU",
    href: "/sku",
    icon: InventoryIcon,
  },
  {
    title: "Planning",
    href: "/planning",
    icon: AssessmentIcon,
  },
  {
    title: "Chart",
    href: "/charts",
    icon: BarChartIcon,
  },
];
