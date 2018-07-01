import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Report, ReportFactory, Category, Categoriser, ReportManager, FormattedTransaction, CategoryAmounts, Transaction } from '@hyperbudget/hyperbudget-core';

import { HTMLFileManager } from '../../lib/manager/htmlfilemanager';
import { StatementUploaderComponent } from '../StatementUploader/StatementUploaderComponent';

import { StatementMonthSelectorComponent } from '../StatementMonthSelector/StatementMonthSelectorComponent';

import { TransactionTableComponent } from '../Transaction/TransactionTableComponent';
import { NoTransactionsFoundComponent } from '../Transaction/NoTransactionsFoundComponent';

import UserDetailsComponent from '../UserDetails/UserDetailsComponent';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import RequireTxnPasswordContainer from '../containers/RequireTxnPasswordContainer';

interface ReportRouteComponentProps {
 month: string,
};

interface ReportComponentProps extends RouteComponentProps<ReportRouteComponentProps> {
 transactions: Transaction[],
 categories: Category[],
}

interface ReportComponentState {
  formatted_transactions: FormattedTransaction[],
  categories: CategoryAmounts,
}

class ReportComponent extends React.Component<ReportComponentProps, ReportComponentState> {
  reportfactory: ReportFactory;
  categoriser: Categoriser;

  state = {
    formatted_transactions: null,
    categories: null,
  };

  constructor(props: ReportComponentProps) {
    super(props);
  }

  componentDidMount(): void {
    this.reportfactory  = new ReportFactory({ unique_only: true });
    this.categoriser = new Categoriser(this.props.categories);

    if (this.props.transactions && this.props.transactions.length != 0) {
      this.reportfactory.add_records(this.props.transactions).then(() => { this.handleStatementLoaded() });
    }
  }

  componentDidUpdate(prevProps): void {
    console.log(this.props);
    if ( this.reportfactory.report && this.props.match.params.month != prevProps.match.params.month ) {
      this.handleStatementLoaded();
    }
  }

  private onFileSelected = (file: File, type: string): void => {
    console.log(file);

    HTMLFileManager.read_file(file).then((txt: string) => {
      console.log(txt);
      this.loadStatement(txt, type);
    });
  };

  private loadStatement = (csv_text: string, type: string): void => {
    this.reportfactory.from_csv(csv_text, type)
      .then(() => {
        this.handleStatementLoaded();
      });
  };

  private handleStatementLoaded = (): void => {
    new Promise((resolve, reject) => {
      this.reportfactory.report.reset_filter();

      if (this.reportfactory.report.transactions.length) {
        this.categoriser.categorise_transactions(this.reportfactory.report.transactions).then(() => resolve());
      } else {
        resolve();
      }
    }).then(() => {
      const report: Report = this.reportfactory.report;
      report.filter_month(this.props.match.params.month);
      console.log(report.transactions);

      report.transactions = report.transactions.sort(function (a, b) { return a.txn_date.getTime() - b.txn_date.getTime() });
      let txns: FormattedTransaction[] = ReportManager.generate_web_frontend_report(report.transactions);
      let cats: CategoryAmounts = ReportManager.generate_category_amounts_frontend(this.categoriser, report.transactions, report.transactions_org);

      this.setState({
        formatted_transactions: txns,
        categories: cats,
      })
    });
  }

  render() {
    let month: string = this.props.match.params.month || moment().format('YYYYMM');
    let [, y, m] = month.match(/(\d{4})(\d{2})/);
    let current_month_moment = moment(`${y}-${m}-01T00:00:00+00:00`);

    return (
      <RequireAuthContainer>
          <div className='Report'>
            <UserDetailsComponent />
            <h1>Report!</h1>
            <RequireTxnPasswordContainer>
              <StatementUploaderComponent onFileSelected={ this.onFileSelected } />
              <StatementMonthSelectorComponent currently_viewing={current_month_moment} />
              {
                this.state.formatted_transactions && this.state.formatted_transactions.length != 0 ?
                <>
                  <TransactionTableComponent transactions={ this.state.formatted_transactions } />
                </>
                : <NoTransactionsFoundComponent />
              }
            </RequireTxnPasswordContainer>
          </div>
      </RequireAuthContainer>
    );
  }
}

const mapStateToProps = state => {
    return {
      transactions: state.user.transactions,
      categories: state.user.categories,
    }
};

export default connect(mapStateToProps, () => ({}))(ReportComponent);