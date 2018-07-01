import * as React from 'react';
interface ErrorComponentProps {
  errors: any[],
};

export const ErrorComponent = (props: ErrorComponentProps) => {
    return (
    <div className="error">
      <p>Errors:</p>
      <ul>
        {
          props.errors.map((err, idx) => <li key={idx}>{ err.msg }</li>)
        }
      </ul>
    </div>
    );
}