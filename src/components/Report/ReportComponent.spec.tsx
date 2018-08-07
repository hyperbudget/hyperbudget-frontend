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

beforeEach(() => {
  const mount = (store, component) => enzyme.mount(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
});

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

    const component = mount(store,
      <ReportComponent
        history={null}
        location={null}
        staticContext={null}
        match={{
          params: {
            month: '201801',
          },
          isExact: true,
          path: '/report/201801',
          url: 'http://localhost:8080/',
        }}
      />);

    expect(component.html()).toMatchSnapshot();
  });

  it('renders for users who have provided a transaction password', () => {
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

    const component = mount(store,
      <ReportComponent
        history={null}
        location={null}
        staticContext={null}
        match={{
          params: {
            month: '201801',
          },
          isExact: true,
          path: '/report/201801',
          url: 'http://localhost:8080/',
        }}
      />);

    expect(component.html()).toMatchSnapshot();
  });

  it('component renders for transactions', () => {
    return new Promise((resolve, reject) => {
      const mockStore = configureStore([
        thunk,
      ]);

      const transactions = [
        {
          txn_amount_credit: 0,
          txn_amount_debit: 100,
          txn_desc: 'Hello World',
          txn_date: '2017-12-31T00:00:00',
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
          txn_date: '2018-01-01T00:00:00',
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
          txn_date: '2018-01-01T00:00',
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
          txn_date: '2017-12-01T00:00',
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
          txn_date: '2018-02-01T00:00',
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
          history={null}
          location={null}
          staticContext={null}
          match={{
            params: {
              month: '201801',
            },
            isExact: true,
            path: '/report/201801',
            url: 'http://localhost:8080/',
          }}
          onUpdate={(transactions) => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          history={null}
          location={null}
          staticContext={null}
          match={{
            params: {
              month: '201802',
            },
            isExact: true,
            path: '/report/201802',
            url: 'http://localhost:8080/',
          }}
          onUpdate={(transactions) => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          history={null}
          location={null}
          staticContext={null}
          match={{
            params: {
              month: '201712',
            },
            isExact: true,
            path: '/report/201712',
            url: 'http://localhost:8080/',
          }}
          onUpdate={(transactions) => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />);

      mount(store,
        <ReportComponent
          history={null}
          location={null}
          staticContext={null}
          match={{
            params: {
              month: '201711',
            },
            isExact: true,
            path: '/report/201711',
            url: 'http://localhost:8080/',
          }}
          onUpdate={(transactions) => {
            expect(transactions).toMatchSnapshot();
            resolve();
          }}
        />
      );
    });
  });
});
