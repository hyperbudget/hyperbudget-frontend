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

const findNextBills = (group, currentTxn) => (
  group.transactions.filter(txn => (
    moment(txn.date).startOf('day').isSame(moment(group.transactions[0].date).startOf('day'))
  ))
  .filter(txn => (
    !currentTxn.find(t => t.description.toLowerCase() === txn.description.toLowerCase())
  ))
);

findCurrent = txns => (
  txns.filter(txn => txn.calculatedMonth === moment().utc().format('YYYYMM'))
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
    let current = reportManager.groupByType(findCurrent(this.props.transactions, ['DD', 'SO']));

    if (!groups) {
      return <></>;
    }

    const nextDD = groups['DD'] ? findNextBills(groups['DD'], current) : [];
    const nextSO = groups['SO'] ? findNextBills(groups['SO'], current) : [];

    return (
    <>
      {
        this.state.dismissed || (!nextSO.length && !nextDD.length) ? '' :
        <div className='alert alert-info'>
        { !!nextSO.length && <BillInfoComponent transactions={nextSO} type='Standing Orders' />}
        { !!nextDD.length && <BillInfoComponent transactions={nextDD} type='Direct Debits' />}
        <a href='javascript:;' onClick={() => this.setState({ dismissed: true })}>Dismiss</a>
        </div>
      }
    </>
    );
  }
}
