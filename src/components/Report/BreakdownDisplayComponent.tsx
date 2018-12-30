import * as React from 'react';
import { BreakdownFormatted } from '@hyperbudget/hyperbudget-core';

import { BreakdownTableComponent } from './BreakdownTableComponent';
import { BreakdownChartComponent } from './BreakdownChartComponent';

interface BreakdownDisplayComponentProps {
  breakdown: BreakdownFormatted[],
};

interface BreakdownDisplayComponentState {
  type: 'chart'|'table',
};

class BreakdownDisplayComponent extends React.Component<BreakdownDisplayComponentProps, BreakdownDisplayComponentState> {
  state: BreakdownDisplayComponentState = {
    type: 'table',
  };

  render() {
    return (
      <>
        <button className='mr-2' type="button" onClick={() => this.setType('table')}><i className='fa fa-table fa-2x' /></button>
        <button type="button" onClick={() => this.setType('chart')}><i className='fa fa-line-chart fa-2x' /></button>
        { this.state.type === 'table' ?
          <BreakdownTableComponent breakdown={this.props.breakdown} /> :
          <BreakdownChartComponent breakdown={this.props.breakdown} />
        }
      </>
    );
  }

  setType(type: 'table'|'chart') {
    this.setState({ type });
  }
}

export { BreakdownDisplayComponent };
