import { Box } from "@mui/material";
import { AgCharts } from "ag-charts-react";
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartCaptionOptions,
  AgChartLegendOptions,
  AgChartOptions,
  AgChartSubtitleOptions,
  AgLineSeriesOptions,
  AgNumberAxisOptions,
} from "ag-charts-community";
import { useCallback, useMemo } from "react";
import { usePlanningsData } from "../hooks/query/usePlainningsData";

const Charts = () => {
  const { data } = usePlanningsData();

  // Function to calculate sales and GM data
  const priceCal = useCallback((e: any) => {
    let u = parseFloat(e.units.replace("$", "")) || 0; // Ensure a valid number
    let p = parseFloat(e.sku.price.replace("$", "")) || 0;
    let c = parseFloat(e.sku.cost.replace("$", "")) || 0;

    const saleDollar = u * p;
    const gmDollar = saleDollar - u * c;

    // Prevent NaN by checking if saleDollar is zero
    const gmPercent =
      saleDollar !== 0 ? Math.floor((gmDollar / saleDollar) * 100) : 0;

    return { saleDollar, gmDollar, gmPercent };
  }, []);

  const chartData = useMemo(() => {
    if (!data || !data.data) return [];

    // Group data by week and sum up gmDollars and gmPercent
    const groupedData: Record<
      string,
      { gmDollars: number; gmPercent: number }
    > = data.data.reduce((acc: any, e: any) => {
      const calDollarAndCost = priceCal(e);
      const week = e.week;

      if (!acc[week]) {
        acc[week] = { gmDollars: 0, gmPercent: 0 };
      }

      acc[week].gmDollars += Math.floor(calDollarAndCost.gmDollar);
      acc[week].gmPercent = Math.floor(calDollarAndCost.gmPercent); // Sum up percentages too

      return acc;
    }, {});

    // Convert grouped data to array format
    return Object.entries(groupedData).map(([week, values]) => {
      console.log({ "values....": values.gmPercent });
      return {
        week,
        gmDollars: values.gmDollars,
        gmPercent: values.gmPercent,
      };
    });
  }, [data]);

  // Compute chart options directly using useMemo
  const options = useMemo<AgChartOptions>(
    () => ({
      title: { text: "Gross Data" } as AgChartCaptionOptions,
      height: 700,
      data: chartData,
      series: [
        {
          type: "bar",
          xKey: "week",
          yKey: "gmDollars",
          yName: "GM Dollars",
        } as AgBarSeriesOptions,
        {
          type: "line",
          xKey: "week",
          yKey: "gmPercent",
          yName: "GM %",
        } as AgLineSeriesOptions,
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
        } as AgCategoryAxisOptions,
        {
          type: "number",
          position: "left",
          keys: ["gmDollars"],
          label: {
            formatter: (params) => params.value.toLocaleString(),
          },
        } as AgNumberAxisOptions,
        {
          type: "number",
          position: "right",
          keys: ["gmPercent"],
          label: {
            formatter: (params) => `${params.value} %`,
          },
        } as AgNumberAxisOptions,
      ],
      legend: { position: "bottom" } as AgChartLegendOptions,
    }),
    [chartData]
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
      <Box sx={{ height: "100%", width: "100%", flexGrow: 1 }}>
        <AgCharts options={options} />
      </Box>
    </Box>
  );
};

export default Charts;
