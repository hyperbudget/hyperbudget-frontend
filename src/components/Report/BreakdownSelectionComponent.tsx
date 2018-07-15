import * as React from 'react';

let fromRef: React.RefObject<HTMLInputElement> = React.createRef();
let toRef: React.RefObject<HTMLInputElement> = React.createRef();

interface BreakdownSelectionComponentProps {
  generateBreakdown(start: string, end: string): void,
};

export const BreakdownSelectionComponent = (props: BreakdownSelectionComponentProps) => (
  <>
    <div className="main">
      <h1>Select Breakdown</h1>
      <form>
        <div className="form-group">
          <label>
            First: <input type="month" name="start" ref={fromRef} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last:&nbsp; <input type="month" name="end" ref={toRef} />
          </label>
        </div>

        <div className="form-group">
          <input
            className="btn btn-primary"
            onClick={() => props.generateBreakdown(fromRef.current.value, toRef.current.value)}
            value="Get breakdown" type="button" />
        </div>
      </form>
    </div>
  </>
);
