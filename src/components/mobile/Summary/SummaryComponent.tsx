import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Category, Categoriser, Transaction, Report, ReportFactory, reportManager } from '@hyperbudget/hyperbudget-core';

import { NoTransactionsFoundComponent } from '../../Transaction/NoTransactionsFoundComponent';

import UserDetailsComponent from '../../UserDetails/UserDetailsComponent';
import RequireAuthContainer from '../../containers/RequireAuthContainer';
import RequireTxnPasswordContainer from '../../containers/RequireTxnPasswordContainer';
import { State } from '../../../lib/State/State';
import { CategoriesComponent } from './CategoriesComponent';

interface SummaryComponentProps {
  categories: Category[];
  txn_password: string;
  email: string;
  transactions: Transaction[];
}

interface SummaryComponentState {
  categories: {
    total: string|number,
    name: string,
    count: number,
    id?: string,
    className: string,
  }[];
}

class SummaryComponent extends React.Component<SummaryComponentProps, SummaryComponentState> {
  categoriser: Categoriser;
  reportfactory: ReportFactory;

  constructor(props: SummaryComponentProps) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount(): void {
    this.reportfactory = new ReportFactory({ unique: true });
    this.categoriser = new Categoriser(this.props.categories);

    if (this.props.transactions && this.props.transactions.length != 0) {
      this.reportfactory.addRecords(this.props.transactions).then(() => { this.handleStatementLoaded() });
    }
  }

  componentDidUpdate(prevProps): void {
    if (
      this.props.transactions &&
      this.props.transactions.length != 0 &&
      this.props.transactions !== prevProps.transactions
    ) {
      if (this.props.categories && this.props.categories.length) {
        this.categoriser = new Categoriser(this.props.categories);
      }

      this.reportfactory.addRecords(this.props.transactions).then(() => {
        this.handleStatementLoaded();
      });
    }
  }

  private handleStatementLoaded = (): void => {
    new Promise((resolve, reject) => {
      this.reportfactory.report.resetFilter();

      if (this.reportfactory.report.transactions.length) {
        this.categoriser.categorise_transactions(this.reportfactory.report.transactions).then(() => resolve());
      } else {
        resolve();
      }
    }).then(() => {
      const report: Report = this.reportfactory.report;
      report.filterMonth(moment(new Date()).utc().format('YYYYMM'));

      this.handleFilterApplied(report);
    });
  }

  private handleFilterApplied = (report: Report): void => {
      let transactions: Transaction[] = report.transactions;
      let cats = reportManager.generateCategoryAmountsFrontend(this.categoriser, transactions, report.transactionsInCalendarMonth);

      this.setState({
        categories: cats,
      })
  }

  render() {
    return (
      <RequireAuthContainer>
        <div className='main Report'>
          <UserDetailsComponent />
          <RequireTxnPasswordContainer>
            {
              this.state.categories && Object.keys(this.state.categories).length != 0 ?
                <CategoriesComponent categories={this.state.categories} />
                : ''
            }
          </RequireTxnPasswordContainer>
        </div>
      </RequireAuthContainer >
    );
  }
}

const mapStateToProps = (state: State, ownProps) => {
  return {
    transactions: state.user.transactions,
    categories: state.user.categories,
    txn_password: state.user.txnPassword,
    email: state.user.email,
    ...ownProps,
  }
};

export default connect(mapStateToProps, () => ({}))(SummaryComponent);
