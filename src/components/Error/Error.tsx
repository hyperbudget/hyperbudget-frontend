import * as React from 'react';
import { APIError } from '../../lib/APIError/APIError';
interface ErrorComponentProps {
  error: APIError,
};

export const ErrorComponent = (props: ErrorComponentProps) => {
    return (
    <div className="alert alert-danger" role="alert">
      <p>Errors:</p>
      <ul>
        { props.error.message || 'An error occurred, please try again later' }
      </ul>
    </div>
    );
}
