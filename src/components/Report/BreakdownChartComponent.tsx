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
          [ item.month, item.in ]
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
      className='mt-3'
    >
      <Chart
        data={data}
        axes={[
          { primary: true, type: "ordinal", position: "bottom" },
          { type: "linear", position: "left" }
        ]}
        tooltip
        getSeriesStyle={series => ({
          color: series.index === 0 ? '#60BD68' : '#fc6868',
        })}
      />
    </div>
  );
}
