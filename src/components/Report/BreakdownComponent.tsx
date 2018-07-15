import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../lib/State/State';

import moment from 'moment';
import { BreakdownFormatted, Transaction, ReportFactory, Report, Categoriser, Category, ReportManager } from '@hyperbudget/hyperbudget-core';
import RequireTxnPasswordContainer from '../containers/RequireTxnPasswordContainer';

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

  fromRef: React.RefObject<HTMLInputElement>;
  toRef: React.RefObject<HTMLInputElement>;

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.transactions &&
      this.props.transactions.length != 0 &&
      this.props.transactions !== prevProps.transactions
    ) {
    }
  }

  constructor(props) {
    super(props);

    this.toRef = React.createRef();
    this.fromRef = React.createRef();
  }

  render() {
    return (
      <div style={{ margin: '80px 10px' }}>
      <RequireTxnPasswordContainer>
      {
      (
      this.state.breakdown.length
      ?
      <table className="breakdown mt-3 table main">
        <thead>
        <tr>
          <th>Month</th>
          <th>Income (Total)</th>
          <th>Expenses</th>
          <th className="split">Gain</th>
          <th className="split">Running</th>
          <th>Income (Main)</th>
          <th>Expenses</th>
          <th>Gains (Main)</th>
          <th>Running</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.breakdown.map((item: BreakdownFormatted, idx: number) => (
            <tr key={idx}>
              <td><a href="/report/{{month}}/">{ item.month }</a></td>
              <td>{ item.in }</td>
              <td>{ item.out }</td>
              <td className="split">{ item.gains }</td>
              <td className="split">{ item.running }</td>
              <td>{ item.main_in }</td>
              <td>{ item.out }</td>
              <td>{ item.main_gains }</td>
              <td>{ item.running_main }</td>
            </tr>
          ))
        }
        </tbody>
      </table>
      :
      <>
        <div className="main">
          <h1>Breakdown</h1>
          <form>
          <div className="form-group">
            <label>
              First: <input type="month" name="start" ref={this.fromRef} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Last:&nbsp; <input type="month" name="end" ref={this.toRef} />
            </label>
          </div>

          <div className="form-group">
            <input
            className="btn btn-primary"
            onClick={() => this.generateBreakdown( this.fromRef.current.value, this.toRef.current.value ) }
            value="Get breakdown" type="button" />
          </div>
          </form>
        </div>
      </>
      )}
      </RequireTxnPasswordContainer>
      </div>
    )
  }

  generateBreakdown(start: string, end: string) {
    if (start && end) {
      // FIXME: this is from input[type="month"]. I don't like this - we should
      // use a library.

      // For chrome at least: it's e.g. 2018-01
      start = start.replace("-","");
      end = end.replace("-","");

      let current_mo: moment.Moment = moment(start, 'YYYYMM');
      let end_mo: moment.Moment = moment(end, 'YYYYMM').add(1, 'month');

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
            return txn.month >= start && txn.month <= end;
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
