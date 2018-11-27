import * as React from 'react';

import axios from 'axios';

import * as Util from '../../lib/Util/Util';

import { ErrorComponent } from '../Error/Error';
import LoadingSpinner from '../LoadingSpinner';
import { APIError } from '../../lib/APIError/APIError';

interface RequestResetComponentState {
  loading: boolean;
  apiError: APIError;
  msg?: string;
  didReset: boolean;
}

class RequestResetComponent extends React.Component<{}, RequestResetComponentState> {
  emailRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      apiError: null,
      didReset: false,
    };

    this.emailRef = React.createRef();
  }

  render() {
    return (
      <>
        <form className='main' style={{ marginTop: '40px' }}>
          {
            (this.state.apiError ? <ErrorComponent error={this.state.apiError} /> : '')
          }
          {
            (this.state.msg ? <div className='alert alert-info'>{this.state.msg}</div> : '')
          }
          <div className='form-group'>
            <div>Request password reset.</div>
            <label htmlFor='email'>
              Email:
            </label>
            <input id='email' className='form-control' type="email" name="email" ref={this.emailRef} />
          </div>
          <div>
            <input disabled={this.state.didReset} className='btn btn-primary form-control' type='button' onClick={() => this.doRequest()} value="Reset Password" />
          </div>
          {this.state.loading ? <LoadingSpinner /> : ''}
        </form>
      </>
    );
  }

  doRequest(): void {
    this.setState({
      loading: true,
    });

    axios.post(
      Util.api_url('/account/reset-password'),
      {
        "email": this.emailRef.current.value
      }
    ).then(result => {
      if (result.data.ok) {
        this.setState({
          msg: 'Successfully requested a password reset. Please check your email.',
          didReset: true,
          loading: false,
          apiError: null,
        });
      }
    }).catch(res => {
      this.setState({
        loading: false,
        didReset: false,
        apiError: { message: 'Could not reset password, please make sure your email is correct' },
      });
    });
  }
}

export default RequestResetComponent;
