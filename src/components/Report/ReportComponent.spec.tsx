import React from 'react';
import ReportComponent from './ReportComponent';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Transaction, Category } from '@hyperbudget/hyperbudget-core';

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
  });

  it('renders for users who have not provided a transaction password', () => {
    const store = mockStore({
      user: {
        transactions: [],
        categories: [],
        txnPassword: null,
        token: 'abc',
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
        token: 'abc',
        isLoggedIn: true,
      },
    });

    let component = mount(store,
      <ReportComponent
        date={moment('2018-01-01').utc().toDate()}
      />);

    expect(component.html()).toMatchSnapshot();
  });

  it('component renders for transactions', () => {
    return new Promise((resolve, reject) => {
      const transactions = [
        {
          txn_amount_credit: 0,
          txn_amount_debit: 100,
          txn_desc: 'Hello World',
          txn_date: '2017-12-31T00:00:00Z',
          txn_src: 'hsbc',
          txn_type: 'DEB',
          acc_sortcode: '',
          acc_balance: 0,
          acc_number: '',
        },
        {
          txn_amount_credit: 0,
          txn_amount_debit: 150,
          txn_desc: 'Nano software',
          txn_date: '2018-01-01T00:00:00Z',
          txn_src: 'hsbc',
          acc_sortcode: '',
          acc_balance: 0,
          acc_number: '',
          txn_type: 'DEB',
        },
        {
          txn_amount_credit: 0,
          txn_amount_debit: 150,
          txn_desc: 'Electricity',
          txn_date: '2018-01-01T00:00:00Z',
          txn_src: 'hsbc',
          acc_sortcode: '',
          acc_balance: 0,
          acc_number: '',
          txn_type: 'DD',
        },
        {
          txn_amount_credit: 0,
          txn_amount_debit: 50,
          txn_desc: 'Water',
          txn_date: '2017-12-01T00:00:00Z',
          txn_src: 'hsbc',
          acc_sortcode: '',
          acc_balance: 0,
          acc_number: '',
          txn_type: 'DD',
        },
        {
          txn_amount_credit: 0,
          txn_amount_debit: 200,
          txn_desc: 'Uplink Fee',
          txn_date: '2018-02-01T00:00:00Z',
          txn_src: 'hsbc',
          acc_sortcode: '',
          acc_balance: 0,
          acc_number: '',
          categories: [],
        },
      ];

      const categories: Category[] = [
        {
          category_rules: {
            txn_desc: {
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
            txn_type: {
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
          token: 'abc',
          isLoggedIn: true,
        },
      });

      mount(store,
        <ReportComponent
          date={moment('2018-01-01').utc().toDate()}
          onUpdate={transactions => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          date={moment('2018-02-01').utc().toDate()}
          onUpdate={transactions => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          date={moment('2017-12-01').utc().toDate()}
          onUpdate={transactions => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          date={moment('2017-11-01').utc().toDate()}
          onUpdate={transactions => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          date={moment('2018-06-01T00:00:00+00:00').toDate()}
          onUpdate={transactions => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);
    });
  });
});
