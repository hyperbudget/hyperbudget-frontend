import React from 'react';
import ReportComponent from './ReportComponent';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import 'jest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Transaction, Category } from '@hyperbudget/hyperbudget-core';

import moment from 'moment';

enzyme.configure({ adapter: new Adapter() });
test('Report component renders for user that has given transaction password', () => {
  const mockStore = configureStore([
    thunk,
  ]);

  const store = mockStore({
    user: {
      transactions: [],
      categories: [],
      txnPassword: null,
      token: 'abc',
      isLoggedIn: true,
    },
  });

  let component = enzyme.mount(
    <Provider store={store}>
      <BrowserRouter>
        <ReportComponent
          date={moment('2018-01-01').utc().toDate()}
        />
      </BrowserRouter>
    </Provider>
  );

  let tree = component.html();
  expect(tree).toMatchSnapshot();
});

test('renders for users who have provided a transaction password', () => {
  return new Promise((resolve, reject) => {

    const mockStore = configureStore([
      thunk,
    ]);

    const store = mockStore({
      user: {
        transactions: [],
        categories: [],
        txnPassword: 'pass',
        token: 'abc',
        isLoggedIn: true,
      },
    });

    let component = enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReportComponent
            date={moment('2018-01-01').utc().toDate()}
            onUpdate={(transactions) => {
              expect(transactions).toMatchSnapshot();
              resolve();
            }}
          />
        </BrowserRouter>
      </Provider>
    );

    enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReportComponent
            date={moment('2018-02-01').utc().toDate()}
            onUpdate={(transactions) => {
              expect(transactions).toMatchSnapshot();
              resolve();
            }}
          />
        </BrowserRouter>
      </Provider>
    );

    enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReportComponent
            date={moment('2017-12-01').utc().toDate()}
            onUpdate={(transactions) => {
              expect(transactions).toMatchSnapshot();
              resolve();
            }}
          />
        </BrowserRouter>
      </Provider>
    );

    enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReportComponent
            date={moment('2017-11-01').utc().toDate()}
            onUpdate={(transactions) => {
              expect(transactions).toMatchSnapshot();
              resolve();
            }}
          />
        </BrowserRouter>
      </Provider>
    );

    enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReportComponent
            date={moment('2018-06-01T00:00:00+00:00').toDate()}
            onUpdate={(transactions) => {
              expect(transactions).toMatchSnapshot();
              resolve();
            }}
          />
        </BrowserRouter>
      </Provider>
    );
  });
});
