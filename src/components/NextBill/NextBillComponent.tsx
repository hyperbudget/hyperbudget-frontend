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

const findNextBills = (group, currentTxn: Transaction[]) => {
  const filtered = group.transactions.filter((txn: Transaction) => (
    !currentTxn.find((t: Transaction) => (
      // not already done this month
      t.description.toLowerCase().localeCompare(txn.description.toLowerCase()) === 0
    ))
  ));

  return filtered;
};

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

    let total = 0;

    for (let i = 0; i < nextSO.length; i++) {
      total += +nextSO[i].debitAmount;
    }
    for (let i = 0; i < nextDD.length; i++) {
      total += +nextDD[i].debitAmount;
    }

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
              <p><b>Estimated total</b>: &pound;{Math.round(total * 100) / 100}.</p>
              <p>
                <a id='next-bill-bottom' href='javascript:;' onClick={() => this.toggleNextBill(false)}>Dismiss</a>
              </p>
            </div> : '' }
        </>
      }
    </>
    );
  }
}

// vim: set cc=120:
