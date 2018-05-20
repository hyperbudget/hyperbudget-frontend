import * as React from 'react';


export const NoTransactionsFoundComponent = () => (
    <div className="jumbotron mt-5 text-center">
      <h1 className="display-3">Nothing here</h1>
      <p className="lead">You have no transactions for this period.</p>
      { /* FIXME */ }
      <a className='btn-outline-primary btn' role='button' href="/report/201805">Go back to current month</a>
    </div>
);