import * as React from 'react';
import classNames from 'classnames';

import './ToggleNextBillComponent.css';

interface ToggleProps {
  onShow: () => void;
  shown: boolean;
}

export const ToggleNextBillComponent = (props: ToggleProps) => {
  return (
    <button onClick={props.onShow} className={classNames(
      {
        'toggle-next-bill': true,
        'active': props.shown,
        'btn-light': true,
        'btn': true,
      })}>
      <i className="fa-transparent fa fa-calendar btn btn-light" /> Pending transactions
    </button>
  );
}
