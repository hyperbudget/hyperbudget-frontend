import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';

import { Report, ReportFactory, Category, Categoriser } from 'hyperbudget-core';
import { HTMLFileManager } from '../../lib/manager/htmlfilemanager';
import { StatementUploaderComponent } from '../StatementUploader/StatementUploaderComponent';

interface ReportRouteComponentProps {
  month: string,
};

interface ReportComponentState {
  report: Report,
}

export class ReportComponent extends React.Component<RouteComponentProps<ReportRouteComponentProps>, ReportComponentState> {
  month: string;
  state = {
    report: null,
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
        
        this.setState({
          report: report,
        });
      });
  };

  render() {
    return (
      <div className='Report'>
        <h1>Report!</h1>
        <StatementUploaderComponent onFileSelected={ this.onFileSelected } />
        { this.state.report ? <div>we have a report</div> : <div>none</div> }
      </div>
    );
  }
}