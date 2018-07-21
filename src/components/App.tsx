import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterComponent } from './Router/RouterComponent';
import { LayoutContainer } from './containers/Layout/LayoutContainer';

export class App extends React.Component {
  render() {
    return (
      <LayoutContainer>
        <BrowserRouter>
          <div className="App">
          <RouterComponent />
          </div>
        </BrowserRouter>
      </LayoutContainer>
    )
  }
}
