import * as React from 'react';
import Picker from 'pickerjs';

import 'pickerjs/dist/picker.min.css';

interface BreakdownSelectionComponentProps {
  generateBreakdown(start: string, end: string): void,
};

export class BreakdownSelectionComponent extends React.Component<BreakdownSelectionComponentProps> {
  fromRef: React.RefObject<HTMLInputElement>;
  toRef: React.RefObject<HTMLInputElement>;

  constructor(props: BreakdownSelectionComponentProps) {
    super(props);
    this.fromRef = React.createRef();
    this.toRef = React.createRef();
  }

  componentDidMount() {
    const options = {
      format: 'YYYY-MM',
    };

    new Picker(this.fromRef.current, options);
    new Picker(this.toRef.current, options);
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
              onClick={() => this.props.generateBreakdown(this.fromRef.current.value, this.toRef.current.value)}
              value="Get breakdown" type="button" />
          </div>
        </form>
      </div>
    </>;
  }
};
