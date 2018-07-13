import * as React from 'react';
import FooterComponent from './FooterComponent';

export const LayoutContainer = (props: React.Props<void>) => {
  return (
    <div className='layout'>
      { props.children }

      <FooterComponent />
    </div>
  );
}