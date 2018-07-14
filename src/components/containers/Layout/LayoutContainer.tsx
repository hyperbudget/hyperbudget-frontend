import * as React from 'react';

export const LayoutContainer = (props: React.Props<void>) => {
  return (
    <div className='layout'>
      { props.children }
    </div>
  );
}
