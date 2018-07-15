import * as React from 'react';
import { BreakdownFormatted } from '@hyperbudget/hyperbudget-core';
import { Link } from 'react-router-dom';

interface BreakdownTableComponentProps {
  breakdown: BreakdownFormatted[],
};

export const BreakdownTableComponent = (props: BreakdownTableComponentProps) => (
  <table className="breakdown mt-3 table main">
    <thead>
      <tr>
        <th>Month</th>
        <th>Income (Total)</th>
        <th>Expenses</th>
        <th className="split">Gain</th>
        <th className="split">Running</th>
        <th>Income (Main)</th>
        <th>Expenses</th>
        <th>Gains (Main)</th>
        <th>Running</th>
      </tr>
    </thead>
    <tbody>
      {
        props.breakdown.map((item: BreakdownFormatted, idx: number) => (
          <tr key={idx}>
            <td><Link to={`/report/${item.month}/`}>{item.month}</Link></td>
            <td>{item.in}</td>
            <td>{item.out}</td>
            <td className="split">{item.gains}</td>
            <td className="split">{item.running}</td>
            <td>{item.main_in}</td>
            <td>{item.out}</td>
            <td>{item.main_gains}</td>
            <td>{item.running_main}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
