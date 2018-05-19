import * as React from 'react';

import { FormattedTransaction } from '@hyperbudget/hyperbudget-core';

interface TransactionTableRowProps {
  transaction: FormattedTransaction,
};

export const TransactionTableRowComponent = (props :TransactionTableRowProps) => {
  let transaction :FormattedTransaction = props.transaction;

  return (
  <tr className={ transaction.cat_class }>
    <td>{ transaction.txn_date }</td>
    <td>{ transaction.txn_type }</td>
    <td>{ transaction.txn_desc }</td>
    <td>{ transaction.txn_amount_debit_str }</td>
    <td>{ transaction.txn_amount_credit_str }</td>
    <td>{ transaction.running_total_spend }</td>
    <td>{ transaction.acc_balance_str }</td>
    <td>{transaction.category_names }</td>
    <td>{ transaction.txn_src }</td>
  </tr>
  );
}