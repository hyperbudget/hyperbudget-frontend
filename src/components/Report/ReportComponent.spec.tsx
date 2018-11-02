import React from 'react';
import ReportComponent from './ReportComponent';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Transaction, Category } from '@hyperbudget/hyperbudget-core';

import { advanceTo, clear } from 'jest-date-mock';

import moment from 'moment';

const mount = (store, component) => enzyme.mount(
  <Provider store={store}>
    <BrowserRouter>{component}</BrowserRouter>
  </Provider>
);

const mockStore = configureStore([
  thunk,
]);

describe('Report', () => {

  beforeAll(() => {
    enzyme.configure({ adapter: new Adapter() });
    advanceTo(new Date('2018-09-03').getTime());
  });
  afterAll(() => {
    clear();
  });

  it('renders for users who have not provided a transaction password', () => {
    const store = mockStore({
      user: {
        transactions: [],
        categories: [],
        txnPassword: null,
        email: 'abc',
        isLoggedIn: true,
      },
    });

    let component = mount(store,
      <ReportComponent
        date={moment('2018-01-01').utc().toDate()}
      />
    );

    expect(component.html()).toMatchSnapshot()
  });

  it('renders for users who have provided a transaction password', () => {
    const store = mockStore({
      user: {
        transactions: [],
        categories: [],
        txnPassword: 'pass',
        email: 'abc',
        isLoggedIn: true,
      },
    });

    let component = mount(store,
      <ReportComponent
        date={moment('2018-01-01').utc().toDate()}
      />);

    expect(component.html()).toMatchSnapshot();
  });

  it('component renders for transactions', async () => {
    const transactions = [
      {
        creditAmount: 0,
        debitAmount: 100,
        description: 'Hello World',
        date: '2017-12-31T00:00:00Z',
        source: 'hsbc',
        type: 'DEB',
        accountSortCode: '',
        accountBalance: 0,
        acc_number: '',
      },
      {
        creditAmount: 0,
        debitAmount: 150,
        description: 'Nano software',
        date: '2018-01-01T00:00:00Z',
        source: 'hsbc',
        accountSortCode: '',
        accountBalance: 0,
        acc_number: '',
        type: 'DEB',
      },
      {
        creditAmount: 0,
        debitAmount: 150,
        description: 'Electricity',
        date: '2018-01-01T00:00:00Z',
        source: 'hsbc',
        accountSortCode: '',
        accountBalance: 0,
        acc_number: '',
        type: 'DD',
      },
      {
        creditAmount: 0,
        debitAmount: 50,
        description: 'Water',
        date: '2017-12-01T00:00:00Z',
        source: 'hsbc',
        accountSortCode: '',
        accountBalance: 0,
        acc_number: '',
        type: 'DD',
      },
      {
        creditAmount: 0,
        debitAmount: 200,
        description: 'Uplink Fee',
        date: '2018-02-01T00:00:00Z',
        source: 'hsbc',
        accountSortCode: '',
        accountBalance: 0,
        acc_number: '',
        categories: [],
      },
    ];

    const categories: Category[] = [
      {
        category_rules: {
          description: {
            "rules": [
              ['=', 'Hello World']
            ]
          }
        },
        name: 'Hello',
        id: 'hello',
        className: '',
        txn_month_modifier: 1,
      },
      {
        category_rules: {
          type: {
            rules: [
              ['=', 'DD']
            ]
          }
        },
        name: 'Direct Debit',
        id: 'directdebit',
        className: '',
      },
    ];

    const store = mockStore({
      user: {
        transactions: transactions,
        categories: categories,
        txnPassword: 'pass',
        email: 'abc',
        isLoggedIn: true,
      },
    });

    await mount(store,
      <ReportComponent
        date={moment('2018-01-01').utc().toDate()}
        onUpdate={transactions => {
          expect(transactions).toMatchSnapshot();
        }}
      />);

    await mount(store,
      <ReportComponent
        date={moment('2018-02-01').utc().toDate()}
        onUpdate={transactions => {
          expect(transactions).toMatchSnapshot();
        }}
      />);

    await mount(store,
      <ReportComponent
        date={moment('2017-12-01').utc().toDate()}
        onUpdate={transactions => {
          expect(transactions).toMatchSnapshot();
        }}
      />);

    await mount(store,
      <ReportComponent
        date={moment('2017-11-01').utc().toDate()}
        onUpdate={transactions => {
          expect(transactions).toMatchSnapshot();
        }}
      />);

    await mount(store,
      <ReportComponent
        date={moment('2018-06-01T00:00:00+00:00').toDate()}
        onUpdate={transactions => {
          expect(transactions).toMatchSnapshot();
        }}
      />);
  });
});
