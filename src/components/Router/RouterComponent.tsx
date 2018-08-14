import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeComponent from '../HomeComponent/HomeComponent';
import ReportComponent from '../Report/ReportComponent';
import BreakdownComponent from '../Report/BreakdownComponent';
import LoginComponent from '../Login/LoginComponent';
import RegisterComponent from '../Register/RegisterComponent';
import NavComponent from '../Nav/NavComponent';

import moment from 'moment';
import CategoryEditorComponent from '../Category/CategoryEditorComponent';
import VersionComponent from '../VersionComponent/VersionComponent';
import { convertDateStringToDate, treatDateAsUTC } from '../../lib/Util/Util';

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
          (props) => <ReportComponent date={treatDateAsUTC(convertDateStringToDate(props.match.params['month']))} />
        } />
        <Route path="/breakdown" exact component={ BreakdownComponent }/>
        <Route path="/categories/editor" exact component={ CategoryEditorComponent } />
      </Switch>
      </>
    );
  }
}
