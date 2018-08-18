import * as React from 'react';
import Picker from 'pickerjs';

import 'pickerjs/dist/picker.min.css';

interface BreakdownSelectionComponentProps {
  generateBreakdown(start: Date, end: Date): void,
};

export class BreakdownSelectionComponent extends React.Component<BreakdownSelectionComponentProps> {
  fromRef: React.RefObject<HTMLInputElement>;
  toRef: React.RefObject<HTMLInputElement>;
  pickers: {
    from: Picker,
    to: Picker,
  };

  datesSelected() {
    // getDate() returns String if a true boolean is passed, otherwise it returns Date
    this.props.generateBreakdown(this.pickers.from.getDate() as Date, this.pickers.to.getDate() as Date);
  }

  constructor(props: BreakdownSelectionComponentProps) {
    super(props);
    this.fromRef = React.createRef();
    this.toRef = React.createRef();
    this.pickers = {
      from: null,
      to: null,
    };
  }

  componentDidMount() {
    const options = {
      format: 'YYYY-MM',
    };

    this.pickers.from = new Picker(this.fromRef.current, options);
    this.pickers.to = new Picker(this.toRef.current, options);
  }

  render() {
    return <>
      <div className="main">
        <h1>Select Breakdown</h1>
        <form>
          <div className="form-group">
            <label>
              First: <input type="text" name="start" ref={this.fromRef} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Last:&nbsp; <input type="text" name="end" ref={this.toRef} />
            </label>
          </div>

          <div className="form-group">
            <input
              className="btn btn-primary"
              onClick={this.datesSelected.bind(this)}
              value="Get breakdown" type="button" />
          </div>
        </form>
      </div>
    </>;
  }
};
