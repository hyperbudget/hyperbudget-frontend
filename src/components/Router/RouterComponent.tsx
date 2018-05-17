import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Hello } from '../Hello';
import { ReportComponent } from '../Report/ReportComponent';
import { BreakdownComponent } from '../Report/BreakdownComponent';

export class RouterComponent extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Hello } />
        <Route path="/report/:month?" exact component={ ReportComponent } />
        <Route path="/breakdown" exact component={ BreakdownComponent }/>
      </Switch>
    );
  }
}