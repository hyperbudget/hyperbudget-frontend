import * as React from 'react';

interface VisibilityProps {
  hidden: boolean;
  onToggle: () => void;
};

export const CategoryTableVisibilityComponent = (props: VisibilityProps) => {
  const hidden = props.hidden;
  const onToggle = props.onToggle;

  return (
    <button
      className={`btn ${hidden ? 'btn-light' : 'btn-secondary'}`}
      type="button"
      onClick={onToggle}
    >
      Toggle categories
    </button>
  );
};
