import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface ReportRouteComponentProps {
  month: string,
};

export class ReportComponent extends React.Component<RouteComponentProps<ReportRouteComponentProps>, {}> {
  componentDidMount() {
    console.log(this.props);
    let month: string = this.props.match.params.month;
    console.log(month);
  }

  render() {
    return (
      <h1>Report!</h1>
    );
  }
}