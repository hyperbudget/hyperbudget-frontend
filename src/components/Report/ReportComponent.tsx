import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Report, ReportFactory, Category, Categoriser, reportManager, FormattedTransaction, Transaction } from '@hyperbudget/hyperbudget-core';

import { StatementUploaderComponent } from '../StatementUploader/StatementUploaderComponent';

import { StatementMonthSelectorComponent } from '../StatementMonthSelector/StatementMonthSelectorComponent';

import { TransactionTableComponent } from '../Transaction/TransactionTableComponent';
import { NoTransactionsFoundComponent } from '../Transaction/NoTransactionsFoundComponent';

import UserDetailsComponent from '../UserDetails/UserDetailsComponent';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import RequireTxnPasswordContainer from '../containers/RequireTxnPasswordContainer';
import { set_transactions } from '../../lib/User/User';
import { HTMLFileManager } from '../../lib/Manager/HTMLFileManager';
import { State } from '../../lib/State/State';
import { CategoryTableComponent } from '../Category/CategoryTableComponent';
import { deResponsifyPage, responsifyPage } from '../../lib/Util/Util';
import { LoadingSpinner } from '../LoadingSpinner';

import { NextBillComponent } from '../NextBill/NextBillComponent';
import { BillFilterBtnComponent } from './BillFilterBtnComponent';

import queryString from 'query-string';

interface ReportComponentProps {
  date: Date,
  transactions: Transaction[],
  categories: Category[],
  txn_password: string,
  email: string,
  onUpdate?: (transactions: Transaction[]) => void,
}

interface ReportComponentState {
  formattedTransactions: FormattedTransaction[],
  categories: {
    total: string|number,
    name: string,
    count: number,
    id?: string,
    className: string,
  }[];
  saving: boolean,
  billsOnly: boolean,
}

class ReportComponent extends React.Component<ReportComponentProps, ReportComponentState> {
  reportfactory: ReportFactory;
  categoriser: Categoriser;
  shouldObscureTransactions: boolean;

  constructor(props: ReportComponentProps) {
    super(props);

    const parsed = queryString.parse(location.search);
    this.shouldObscureTransactions = 'demo' in parsed;

    this.state = {
      saving: false,
      formattedTransactions: [],
      categories: [],
      billsOnly: false,
    };
  }

  componentDidMount(): void {
    this.reportfactory = new ReportFactory({ unique: true });
    this.categoriser = new Categoriser(this.props.categories);

    if (this.props.transactions && this.props.transactions.length != 0) {
      this.reportfactory.addRecords(this.props.transactions).then(() => { this.handleStatementLoaded() });
      deResponsifyPage();
    }
  }

  componentDidUpdate(prevProps): void {
    if (this.props.txn_password && !prevProps.txn_password) {
      deResponsifyPage();
    }

    // report date changed
    if (this.reportfactory.report && this.props.date.getTime() !== prevProps.date.getTime()) {
      this.handleStatementLoaded();
    }

    // transactions changed - realistically this happens after you give your password
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

  componentWillUnmount() {
    responsifyPage();
  }

  private onFileSelected = (file: File, type: string): void => {
    this.setState({
      saving: true,
    });
    HTMLFileManager.read_file(file).then((txt: string) => {
      this.loadStatement(txt, type);
    });
  };

  private loadStatement = (csv_text: string, type: string): void => {
    this.reportfactory.fromCSV(csv_text, type)
      .then(() => {
        this.saveTransactions();
        this.handleStatementLoaded();
      });
  };

  private saveTransactions = (): void => {
    this.reportfactory.report.resetFilter();
    this.setState({ saving: true });

    set_transactions({
      transactions: this.reportfactory.report.transactions,
      password: this.props.txn_password,
      email: this.props.email,
    }).then(() => {
      this.setState({ saving: false });
    });
  };

  private obscureTransactions(transactions: Transaction[]): Transaction[] {
    const obscured = transactions.map((txn, idx) => {
      const creditAmount = txn.creditAmount ? 9999 : 0;
      const debitAmount = txn.debitAmount ? Math.round(Math.random()*50000) / 100 : 0;

      return new Transaction({
        ...txn,
        description: `txn ${idx}`,
        creditAmount,
        debitAmount,
        date: moment(txn.date).format('YYYY-MM-DDTHH:mmZ'),
        accountBalance: 0,
        accountNumber: 'XXX',
        accountSortCode: 'XXX',
      })
    });

    return obscured;
  }

  private handleFilterApplied = (report: Report): void => {
      if (this.props.onUpdate) {
        this.props.onUpdate(report.transactions);
      }

      report.transactions = report.transactions.sort(function (a, b) { return a.date.getTime() - b.date.getTime() });

      let transactions: Transaction[] = report.transactions;

      if (this.shouldObscureTransactions) {
        transactions = this.obscureTransactions(transactions);
        this.categoriser.categorise_transactions(transactions);
      }

      let txns: FormattedTransaction[] = reportManager.generateWebFrontendReport(transactions);
      let cats = reportManager.generateCategoryAmountsFrontend(this.categoriser, transactions, report.transactionsInCalendarMonth);

      this.setState({
        formattedTransactions: txns,
        categories: cats,
      })
  };

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
      report.filterMonth(moment(this.props.date).utc().format('YYYYMM'));

      this.handleFilterApplied(report);
    });
  }

  private onDelete (txnId): void {
    this.reportfactory.removeRecords([txnId]);
    this.handleStatementLoaded();
    this.saveTransactions();
  }

  private toggleBillsOnly() {
    this.setState((prevState, _prevProps) => {
      return {
        ...prevState,
        billsOnly: !prevState.billsOnly
      };
    }, () => {
      if (this.state.billsOnly) {
        this.reportfactory.report.filterType('DD');
      } else {
        this.reportfactory.report.filterType(null);
        this.reportfactory.report.applyFilter();
      }

      this.handleFilterApplied(this.reportfactory.report);
    });
  }

  render() {
    return (
      <RequireAuthContainer>
        <div className='main Report'>
          <UserDetailsComponent />
          <RequireTxnPasswordContainer>
            <div className='mt-3'>
              <StatementUploaderComponent onFileSelected={this.onFileSelected} />
            </div>
            { this.state.saving ? <LoadingSpinner /> : '' }
            <StatementMonthSelectorComponent currentlyViewing={this.props.date} />
            {
              this.state.categories && Object.keys(this.state.categories).length != 0 ?
                <CategoryTableComponent categories={this.state.categories} />
                : ''
            }

            {
              this.shouldObscureTransactions ? <h1>DEMO MODE</h1> : ''
            }

            <BillFilterBtnComponent onToggle={this.toggleBillsOnly.bind(this)} toggled={this.state.billsOnly} />

            {
              this.state.formattedTransactions && this.state.formattedTransactions.length != 0 ?
                <>
                  <NextBillComponent
                    transactions={this.reportfactory.report.unfilteredTransactions}
                  />
                  <TransactionTableComponent transactions={this.state.formattedTransactions}
                  onDelete={ this.onDelete.bind(this) }
                  />
                </> : <NoTransactionsFoundComponent />
            }
          </RequireTxnPasswordContainer>
        </div>
      </RequireAuthContainer >
    );
  }
  toggleNextBill(): any {
    throw new Error("Method not implemented.");
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

export default connect(mapStateToProps, () => ({}))(ReportComponent);
