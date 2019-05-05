import * as React from 'react';
import classNames from 'classnames';

interface ToggleProps {
  onToggle: () => void;
  toggled: boolean;
}

export class BillFilterBtnComponent extends React.Component<ToggleProps, {}> {
  render() {
    return <button onClick={this.props.onToggle}
    className={classNames(
      {
        'active': this.props.toggled,
        'btn-light': true,
        'btn': true,
        'mr10': true,
        'mt10': true
      })}>
      <i className="fa-transparent fa fa-dollar btn btn-light" /> Subscriptions only
    </button>;
  }
}
