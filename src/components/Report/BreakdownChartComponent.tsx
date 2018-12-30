import * as React from 'react';
import { BreakdownFormatted } from '@hyperbudget/hyperbudget-core';
import { Chart } from "react-charts";

interface BreakdownChartComponentProps {
  breakdown: BreakdownFormatted[],
};

export const BreakdownChartComponent = (props: BreakdownChartComponentProps) => {
  const data = [
    {
      label: "Income",
      data: props.breakdown.map((item: BreakdownFormatted) => (
          [ item.month, item.main_in ]
      ))
    },
    {
      label: "Expenses",
      data: props.breakdown.map((item: BreakdownFormatted) => (
        [ item.month, item.out ]
      ))
    }
  ];

  return (
    <div
      style={{
        width: "400px",
        height: "300px"
      }}
    >
      <Chart
        data={data}
        axes={[
          { primary: true, type: "ordinal", position: "bottom" },
          { type: "linear", position: "left" }
        ]}
        tooltip

      />
    </div>
  );
}
