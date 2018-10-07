import * as React from 'react';

import { FormattedTransaction } from '@hyperbudget/hyperbudget-core';

interface TransactionTableRowProps {
  transaction: FormattedTransaction,
  onDelete: (txnId: string) => void,
};

export const TransactionTableRowComponent = (props :TransactionTableRowProps) => {
  let transaction :FormattedTransaction = props.transaction;

  return (
  <tr className={ transaction.catClass }>
    <td><i onClick={ () => props.onDelete(transaction.identifier) } className='fa fa-trash fa-2x pointer'></i></td>
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
