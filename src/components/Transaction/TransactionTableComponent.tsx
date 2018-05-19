import * as React from 'react';

import { FormattedTransaction } from '@hyperbudget/hyperbudget-core';
import { TransactionTableRowComponent } from './TransactionTableRowComponent';

interface TransactionTableProps {
  transactions: FormattedTransaction[],
};

export const TransactionTableComponent = (props: TransactionTableProps) => (
  <table>
    <thead>
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th>Description</th>
      <th>Debit amount</th>
      <th>Credit amount</th>
      <th>Running total spend</th>
      <th>Balance</th>
      <th>Categories</th>
      <th>Source</th>
    </tr>
    </thead>
    <tbody>
      {props.transactions.map((txn, idx) => <TransactionTableRowComponent transaction={txn} key={idx} />)}
    </tbody>
  </table>
);