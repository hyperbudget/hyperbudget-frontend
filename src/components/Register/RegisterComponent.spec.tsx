import React from 'react';
import { RegisterComponent } from './RegisterComponent';
import renderer from 'react-test-renderer';
import * as enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import 'jest';

beforeAll(() => {
  enzyme.configure({ adapter: new Adapter() });
});

test('Register component renders', () => {
  let component = renderer.create(
    <RegisterComponent
      doRegister={() => {}}
      isLoggedIn={false}
      token={null}
      APIError={null}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button calls doRegister', () => {
  const mockRegister = jest.fn();

  let component = enzyme.mount(
    <RegisterComponent
      doRegister={mockRegister}
      isLoggedIn={false}
      token={null}
      APIError={null}
    />
  );

  component.find('#registerButton').simulate('click');

  expect(mockRegister.mock.calls.length).toBe(1);
  expect(mockRegister.mock.calls[0]).toMatchSnapshot();

  component.find('#email').instance()['value'] = 'errietta@errietta.me';
  component.find('#firstname').instance()['value'] = 'Errietta';
  component.find('#last').instance()['value'] = 'Kostala';
  component.find('#password').instance()['value'] = 'supersekrit';

  component.find('#registerButton').simulate('click');

  expect(mockRegister.mock.calls.length).toBe(2);
  expect(mockRegister.mock.calls[1]).toMatchSnapshot();

});

