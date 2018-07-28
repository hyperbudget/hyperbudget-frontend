import React from 'react';
import ReportComponent from './ReportComponent';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import 'jest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => {
  enzyme.configure({ adapter: new Adapter() });
});

test('Report component renders', () => {
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
          />
        </BrowserRouter>
      </Provider>
  );

  let tree = component.html();
  expect(tree).toMatchSnapshot();
});
