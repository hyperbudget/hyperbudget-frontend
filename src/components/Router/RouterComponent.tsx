import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeComponent from '../HomeComponent/HomeComponent';
import ReportComponent from '../Report/ReportComponent';
import BreakdownComponent from '../Report/BreakdownComponent';
import LoginComponent from '../Login/LoginComponent';
import RegisterComponent from '../Register/RegisterComponent';
import RequestResetComponent from '../ResetPassword/RequestResetComponent';
import ResetPasswordComponent from '../ResetPassword/ResetPasswordComponent';
import CategoryEditorComponent from '../Category/CategoryEditorComponent';
import VersionComponent from '../VersionComponent/VersionComponent';

import NavComponent from '../Nav/NavComponent';

import { convertDateStringToDate } from '../../lib/Util/Util';

import moment from 'moment';

export class RouterComponent extends React.Component {
  render() {
    const current = moment().format('YYYYMM');
    return (
      <>
      <NavComponent />
      <Switch>
        <Route path="/" exact component={ HomeComponent } />
        <Route path="/version" exact component={ VersionComponent } />
        <Route path="/login" exact component={ LoginComponent } />
        <Route path="/register" exact component={ RegisterComponent } />
        <Route path="/report/" exact render={ () => <Redirect to={`/report/${current}`} /> } />
        <Route path="/report/:month" exact render={
          (props) => <ReportComponent date={convertDateStringToDate(props.match.params['month'])} />
        } />
        <Route path="/breakdown" exact component={ BreakdownComponent }/>
        <Route path="/categories/editor" exact component={ CategoryEditorComponent } />
        <Route path="/reset-password/:userId/:token" exact render={
          (props) => <ResetPasswordComponent userId={props.match.params['userId']}
                      token={props.match.params['token']} />
        } />
        <Route path="/reset-password" exact component={RequestResetComponent} />
      </Switch>
      </>
    );
  }
}
