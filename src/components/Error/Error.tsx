import * as React from 'react';
import { APIError } from '../../lib/APIError/APIError';
interface ErrorComponentProps {
  errors: APIError[],
};

export const ErrorComponent = (props: ErrorComponentProps) => {
    return (
    <div className="alert alert-danger" role="alert">
      <p>Errors:</p>
      <ul>
        {
          props.errors.map((err, idx) => <li key={idx}>{ err.msg }</li>)
        }
      </ul>
    </div>
    );
}
