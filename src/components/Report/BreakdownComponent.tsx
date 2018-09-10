import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../lib/State/State';

import moment from 'moment';
import { BreakdownFormatted, Transaction, ReportFactory, Report, Categoriser, Category, reportManager } from '@hyperbudget/hyperbudget-core';
import RequireTxnPasswordContainer from '../containers/RequireTxnPasswordContainer';
import { BreakdownSelectionComponent } from './BreakdownSelectionComponent';
import { BreakdownTableComponent } from './BreakdownTableComponent';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import { deResponsifyPage, responsifyPage } from '../../lib/Util/Util';

interface BreakdownComponentProps {
  transactions: Transaction[],
  categories: Category[],
};

interface BreakdownComponentState {
  breakdown: BreakdownFormatted[],
}

class BreakdownComponent extends React.Component<BreakdownComponentProps, BreakdownComponentState> {
  state: BreakdownComponentState = {
    breakdown: [],
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    responsifyPage();
  }

  render() {
    return (
      <div style={{ margin: '80px 10px' }}>
      <RequireAuthContainer>
        <RequireTxnPasswordContainer>
        {
          this.state.breakdown.length
          ?
          <BreakdownTableComponent breakdown={this.state.breakdown} />
          :
          <BreakdownSelectionComponent generateBreakdown={ (start, end) => this.generateBreakdown(start,end ) } />
        }
        </RequireTxnPasswordContainer>
      </RequireAuthContainer>
      </div>
    )
  }

  generateBreakdown(start: Date, end: Date) {
    if (start && end) {
      let current_mo: moment.Moment = moment(start).startOf('day');
      let end_mo: moment.Moment = moment(end).startOf('day');

      if (end_mo < current_mo) {
        return;
      }

      const categoriser = new Categoriser(this.props.categories);

      let rf = new ReportFactory({ unique: true });
      rf.addRecords(this.props.transactions)
      .then(() => {
          let report: Report = rf.report;
          categoriser.categorise_transactions(report.transactions);

          report.transactions = report.transactions.sort((a,b) => a.date.getTime() - b.date.getTime());
          report.transactions = report.transactions.filter((txn: Transaction) => (
            txn.calculatedMonth >= current_mo.format('YYYYMM') && txn.calculatedMonth <= end_mo.format('YYYYMM')
          ));

          let months: string[] = [];
          var i = 0;

          while (current_mo.toDate().getTime() <= end_mo.toDate().getTime()) {
            months.push(current_mo.format('YYYYMM'));
            current_mo.add(1, "month");

            if (i++>100) { break; }
          }

          let breakdown: BreakdownFormatted[] = reportManager.generateMonthlyBreakdownFrontend(report.transactions, months);
          this.setState({
            breakdown: breakdown,
          });
          deResponsifyPage();
        }
      );
    }
  }
}

const mapStateToProps = (state: State) => {
  return {
    transactions: state.user.transactions,
    categories: state.user.categories,
  }
};

export default connect(mapStateToProps, null)(BreakdownComponent);
