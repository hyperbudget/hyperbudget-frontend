import React from 'react';
import moment from 'moment';

import { Transaction } from '@hyperbudget/hyperbudget-core';

interface BillInfoComponentProps {
  transactions: Transaction[],
  type: string,
}

export const BillInfoComponent = (props: BillInfoComponentProps) => (
  <div>
    <p>Next {props.type} around the <b>{moment(props.transactions[0].date).format('Do')}</b>:</p>
    <ul>
    {
      props.transactions.map((transaction, idx) => (
        <li key={idx}>{transaction.description}, about <b>&pound;{transaction.debitAmount}</b></li>
      ))
    }
    </ul>
  </div>
);
