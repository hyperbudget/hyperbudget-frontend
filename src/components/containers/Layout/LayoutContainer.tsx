import * as React from 'react';
import NavComponent from '../../Nav/NavComponent';
import FooterComponent from './FooterComponent';

export const LayoutContainer = (props: React.Props<void>) => {
  return (
    <div className='layout'>
      <NavComponent />

      { props.children }

      <FooterComponent />
    </div>
  );
}