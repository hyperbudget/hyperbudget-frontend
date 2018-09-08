import * as React from 'react';

import { FormattedTransaction } from '@hyperbudget/hyperbudget-core';

interface TransactionTableRowProps {
  transaction: FormattedTransaction,
};

export const TransactionTableRowComponent = (props :TransactionTableRowProps) => {
  let transaction :FormattedTransaction = props.transaction;

  return (
  <tr className={ transaction.catClass }>
    <td>{ transaction.date }</td>
    <td>{ transaction.type }</td>
    <td>{ transaction.description }</td>
    <td>{ transaction.debitAmountStr }</td>
    <td>{ transaction.creditAmountStr }</td>
    <td>{ transaction.runningTotalSpend }</td>
    <td>{ transaction.accountBalanceStr }</td>
    <td>{transaction.categoryNames }</td>
    <td className="src">{ transaction.source }</td>
  </tr>
  );
}
