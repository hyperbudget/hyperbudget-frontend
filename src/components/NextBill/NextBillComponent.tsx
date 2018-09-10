import * as React from 'react';
import moment from 'moment';

import { Transaction, reportManager } from '@hyperbudget/hyperbudget-core';
import { BillInfoComponent } from './BillInfoComponent';

interface NextBillComponentProps {
  transactions: Transaction[],
}

interface NextBillComponentState {
  dismissed: boolean,
}

const filterOldTransactions = (groups) => {
  const now = moment();

  Object.keys(groups).forEach(key => {
    const group = groups[key];
    group.transactions = (
      group.transactions
      .filter(txn => moment(txn.date).isAfter(now.clone().subtract(2, 'month')))
      .filter(txn =>  +moment(txn.date).format('D') >= +now.format('D'))
    );
  });

  return groups;
}

const findNextBills = (group) => (
  group.transactions.filter(txn => (
    moment(txn.date).startOf('day').isSame(moment(group.transactions[0].date).startOf('day'))
  ))
);

export class NextBillComponent extends React.Component<NextBillComponentProps, NextBillComponentState> {
  constructor(props: NextBillComponentProps) {
    super(props);

    this.state = {
      dismissed: false,
    };
  }

  render() {
    let groups = filterOldTransactions(reportManager.groupByType(this.props.transactions, ['DD', 'SO']));

    const nextDD = findNextBills(groups['DD']);
    const nextSO = findNextBills(groups['SO']);

    return (
    <>
      {
        this.state.dismissed ? '' :
        <div className='alert alert-info'>
        { !!nextSO.length && <BillInfoComponent transactions={nextSO} type='Standing Order' />}
        { !!nextDD.length && <BillInfoComponent transactions={nextDD} type='Direct Debit' />}
        <a href='' onClick={() => this.setState({ dismissed: true })}>Dismiss</a>
        </div>
      }
    </>
    );
  }
}
