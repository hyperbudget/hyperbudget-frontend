import * as React from 'react';
import moment from 'moment';
import ScrollableAnchor, { goToAnchor, configureAnchors } from 'react-scrollable-anchor';

import { Transaction, reportManager } from '@hyperbudget/hyperbudget-core';
import { BillInfoComponent } from './BillInfoComponent';

import { ToggleNextBillComponent } from '../NextBill/ToggleNextBillComponent';

interface NextBillComponentProps {
  transactions: Transaction[],
}

interface NextBillComponentState {
  showNextBill: boolean,
}

const filterOldTransactions = groups => {
  const now = moment();

  Object.keys(groups).forEach(key => {
    const group = groups[key];
    group.transactions = (
      group.transactions
      .filter((txn: Transaction) => moment(txn.date).isAfter(now.clone().subtract(2, 'month')))
      .filter((txn: Transaction) =>  +moment(txn.date).format('D') >= +now.format('D'))
    );
  });

  return groups;
}

const findNextBills = (group, currentTxn: Transaction[]) => (
  group.transactions.filter((txn: Transaction) => (
    moment(txn.date).startOf('day').isSame(moment(group.transactions[0].date).startOf('day'))
  ))
  .filter((txn: Transaction) => (
    !currentTxn.find((t: Transaction) => (
      t.description.toLowerCase().localeCompare(txn.description.toLowerCase()) === 0
    ))
  ))
);

const findCurrent = txns => (
  txns.filter(txn => txn.calculatedMonth === moment().utc().format('YYYYMM'))
);

export class NextBillComponent extends React.Component<NextBillComponentProps, NextBillComponentState> {
  constructor(props: NextBillComponentProps) {
    super(props);

    configureAnchors({offset: -100, scrollDuration: 800});

    this.state = {
      showNextBill: false,
    }
  }

  toggleNextBill(show: boolean = !this.state.showNextBill) {
    this.setState({
      showNextBill: show,
    }, () => {
      if (show) {
        goToAnchor('next-bill-top');
      }
    });
  }

  render() {
    let groups = filterOldTransactions(reportManager.groupByType(this.props.transactions, ['DD', 'SO']));
    let current = reportManager.groupByType(findCurrent(this.props.transactions), ['DD', 'SO']);

    if (!groups) {
      return <></>;
    }

    const nextDD = groups['DD'] ?
          findNextBills(
              groups['DD'],
              current['DD'] ? (current['DD'].transactions || []) : []
          ) : [];
    const nextSO = groups['SO'] ?
          findNextBills(
              groups['SO'],
              current['SO'] ? (current['SO'].transactions || []) : []
          ): [];

    return (
    <>
      {
        !nextSO.length && !nextDD.length ? '' :
        <>
          <ScrollableAnchor id='next-bill-top'>
            <ToggleNextBillComponent
              onShow={() => this.toggleNextBill()}
              shown={this.state.showNextBill}
            />
          </ScrollableAnchor>
          { this.state.showNextBill ?
            <div className='alert alert-info mt10'>
              { !!nextSO.length && <BillInfoComponent transactions={nextSO} type='Standing Orders' />}
              { !!nextDD.length && <BillInfoComponent transactions={nextDD} type='Direct Debits' />}
              <a id='next-bill-bottom' href='javascript:;' onClick={() => this.toggleNextBill(false)}>Dismiss</a>
            </div> : '' }
        </>
      }
    </>
    );
  }
}
