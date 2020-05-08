import React from 'react';
import moment from 'moment';

import { Transaction } from '@hyperbudget/hyperbudget-core';

interface BillInfoComponentProps {
  transactions: Transaction[],
  type: string,
}

export const BillInfoComponent = (props: BillInfoComponentProps) => {
  let total = 0;
  for (let i = 0; i < props.transactions.length; i++) {
    total += +props.transactions[i].debitAmount;
  }

  return (
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
        <b>Estimated total {props.type}</b>: &pound;{ total }
      </p>
    </div>
  )
}
