import * as React from 'react';

import { FormattedTransaction } from '@hyperbudget/hyperbudget-core';
import { TransactionTableRowComponent } from './TransactionTableRowComponent';

const tablesort = require('tablesort');

interface TransactionTableProps {
  transactions: FormattedTransaction[],
  onDelete: (txnId: string) => void,
  onCategorise: (txn: FormattedTransaction) => void,
};

export class TransactionTableComponent extends React.Component<TransactionTableProps> {
  private tableRef: React.RefObject<HTMLTableElement>;

  constructor(props: TransactionTableProps) {
    super(props);
    this.tableRef = React.createRef();
  }

  render() {
    return <table className='table mt-3 table-bordered' ref={this.tableRef}>
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
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
        {
          this.props.transactions.map(
            (txn, idx) => (
              <TransactionTableRowComponent
              transaction={txn}
              key={txn.identifier+"-"+idx}
              onDelete={ this.props.onDelete }
              onCategorise={ this.props.onCategorise }
              />
            )
          )
        }
      </tbody>
    </table>;
  }

  componentDidMount() {
    // UGH
    // https://gist.github.com/tristen/e79963856608bf54e046
    const makeTableSortable = () => {
      function cleanNumber(i) {
        return i.replace(/[^\-?0-9.]/g, '');
      }

      function compareNumber(a, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        a = isNaN(a) ? 0 : a;
        b = isNaN(b) ? 0 : b;

        return a - b;
      }

      tablesort.extend('number', function (item) {
        return item.match(/^-?[£\x24Û¢´€]?\d+\s*([,\.]\d{0,2})/) || // Prefixed currency
          item.match(/^-?\d+\s*([,\.]\d{0,2})?[£\x24Û¢´€]/) || // Suffixed currency
          item.match(/^-?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/); // Number
      }, function (a, b) {
        a = cleanNumber(a);
        b = cleanNumber(b);
        return compareNumber(b, a);
      });


      tablesort(this.tableRef.current);
    }

    makeTableSortable();
  }
};
