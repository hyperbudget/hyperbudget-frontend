import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../lib/State/State';

import moment from 'moment';
import { BreakdownFormatted, Transaction, ReportFactory, Report, Categoriser, Category, ReportManager } from '@hyperbudget/hyperbudget-core';
import RequireTxnPasswordContainer from '../containers/RequireTxnPasswordContainer';
import { BreakdownSelectionComponent } from './BreakdownSelectionComponent';
import { BreakdownTableComponent } from './BreakdownTableComponent';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import { treatDateAsUTC } from '../../lib/Util/Util';

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

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.transactions &&
      this.props.transactions.length != 0 &&
      this.props.transactions !== prevProps.transactions
    ) {
    }
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
      let current_mo: moment.Moment = moment(treatDateAsUTC(start));
      let end_mo: moment.Moment = moment(treatDateAsUTC(end));

      if (end_mo < current_mo) {
        console.error("gave an end month before start");
        return;
      }

      const categoriser = new Categoriser(this.props.categories);

      let rf = new ReportFactory({ unique_only: true });
      rf.add_records(this.props.transactions)
      .then(() => {
          let report: Report = rf.report;
          categoriser.categorise_transactions(report.transactions);

          report.transactions = report.transactions.sort(function(a,b) { return a.txn_date.getTime() - b.txn_date.getTime() });
          report.transactions = report.transactions.filter(function(txn: Transaction) {
            return txn.month >= current_mo.format('YYYYMM') && txn.month <= end_mo.format('YYYYMM');
          });

          let months: string[] = [];
          var i = 0;

          while (current_mo.toDate().getTime() != end_mo.toDate().getTime()) {
            months.push(current_mo.format('YYYYMM'));
            current_mo.add(1, "month");

            if (i++>100) { break; }
          }

          let breakdown: BreakdownFormatted[] = ReportManager.generate_monthly_breakdown_frontend(report.transactions, months);
          this.setState({
            breakdown: breakdown,
          });
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
