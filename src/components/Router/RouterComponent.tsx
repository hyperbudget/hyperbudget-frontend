import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Hello } from '../Hello';
import { ReportComponent } from '../Report/ReportComponent';
import { BreakdownComponent } from '../Report/BreakdownComponent';
import moment from 'moment';
import LoginComponent from '../Login/LoginComponent';
import RegisterComponent from '../Register/RegisterComponent';

export class RouterComponent extends React.Component {
  render() {
    const current = moment().format('YYYYMM');
    return (
      <Switch>
        <Route path="/" exact component={ Hello } />
        <Route path="/login" exact component={ LoginComponent } />
        <Route path="/register" exact component={ RegisterComponent } />
        <Route path="/report/" exact render={ () => <Redirect to={`/report/${current}`} /> } />
        <Route path="/report/:month" exact component={ ReportComponent } />
        <Route path="/breakdown" exact component={ BreakdownComponent }/>
      </Switch>
    );
  }
}