import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterComponent } from './Router/RouterComponent';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <RouterComponent />
        </div>
      </BrowserRouter>
    )
  }
}