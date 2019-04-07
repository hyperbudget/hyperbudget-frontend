import * as React from 'react';
import classNames from 'classnames';

import './ToggleNextBillComponent.css';

interface ToggleProps {
  onShow: () => void;
  shown: boolean;
}

export class ToggleNextBillComponent extends React.Component<ToggleProps, {}> {
  render() {
    return <button onClick={this.props.onShow} className={classNames(
      {
        'toggle-next-bill': true,
        'active': this.props.shown,
        'btn-light': true,
        'btn': true,
      })}>
      <i className="fa-transparent fa fa-calendar btn btn-light" /> Pending transactions
    </button>;
  }
}
