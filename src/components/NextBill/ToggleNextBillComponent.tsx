import * as React from 'react';
import './ToggleComponent.css';

interface ToggleProps {
  onShow: () => void;
}

export const ToggleNextBillComponent = (props: ToggleProps) => {
  return (
    <button onClick={props.onShow} className="toggle-next-bill">
      <i className="fa fa-calendar" /> Pending transactions
    </button>
  );
}
