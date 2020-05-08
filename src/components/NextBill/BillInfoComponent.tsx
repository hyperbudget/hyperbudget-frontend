import React from 'react';
import moment from 'moment';

import { Transaction } from '@hyperbudget/hyperbudget-core';

interface BillInfoComponentProps {
  transactions: Transaction[],
  type: string,
}

export const BillInfoComponent = (props: BillInfoComponentProps) => (
  <div>
    <p>Next {props.type}:</p>
    <ul>
    {
      props.transactions.map((transaction, idx) => (
        <li key={idx}>{transaction.description}, taken around the {moment(transaction.date).format('Do')}, for about <b>&pound;{transaction.debitAmount}</b></li>
      ))
    }
    </ul>
    <p>
      <b>Estimated total {props.type}</b>: {props.transactions.reduce((a,b) => +a.debitAmount + +b.debitAmount, 0)
    </p>
  </div>
);
