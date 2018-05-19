import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';

import { Report, ReportFactory, Category, Categoriser, ReportManager, FormattedTransaction, CategoryAmounts } from '@hyperbudget/hyperbudget-core';
import { HTMLFileManager } from '../../lib/manager/htmlfilemanager';
import { StatementUploaderComponent } from '../StatementUploader/StatementUploaderComponent';

interface ReportRouteComponentProps {
  month: string,
};

interface ReportComponentState {
  transactions: FormattedTransaction[],
  categories: CategoryAmounts,
}

export class ReportComponent extends React.Component<RouteComponentProps<ReportRouteComponentProps>, ReportComponentState> {
  month: string;
  state = {
    transactions: null,
    categories: null,
  };

  componentDidMount(): void {
    console.log(this.props);
    let month: string = this.props.match.params.month;
    console.log(month);
    this.month = month || moment().format('YYYYMM');
  }

  private onFileSelected = (file: File, type: string): void => {
    console.log(file);

    HTMLFileManager.read_file(file).then((txt: string) => {
      console.log(txt);
      this.loadStatement(txt, type);
    });
  };

  private loadStatement = (csv_text: string, type: string): void => {
    const rf: ReportFactory = new ReportFactory();
    const categories: Category[] = [];
    const categoriser: Categoriser = new Categoriser(categories);

    rf.from_csv(csv_text, type)
      .then(() => categoriser.categorise_transactions(rf.report.transactions))
      .then(() => {
        const report: Report = rf.report;
        report.filter_month(this.month);
        console.log(report.transactions);

        report.transactions = report.transactions.sort(function(a,b) { return a.txn_date.getTime() - b.txn_date.getTime() });
        let txns: FormattedTransaction[] = ReportManager.generate_web_frontend_report(report.transactions);
        let cats: CategoryAmounts = ReportManager.generate_category_amounts_frontend(categoriser, report.transactions, report.transactions_org);

        this.setState({
          transactions: txns,
          categories: cats,
        });
      });
  };

  render() {
    return (
      <div className='Report'>
        <h1>Report!</h1>
        <StatementUploaderComponent onFileSelected={ this.onFileSelected } />
        { this.state.transactions ? <div>we have a report</div> : <div>none</div> }
      </div>
    );
  }
}