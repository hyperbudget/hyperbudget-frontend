import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/Actions';
import { Redirect } from 'react-router';
import { ErrorComponent } from '../Error/Error';
import { State } from '../../lib/State/State';
import { APIError } from '../../lib/APIError/APIError';

import { LoadingSpinner } from '../LoadingSpinner';
import './LoginComponent.css';

interface TxnPasswordComponentProps {
  doGetTransactions?: (password: string, email: string) => void;
  txn_password: string;
  email: string;
  api_error: APIError
};

interface TxnPasswordComponentState {
  loading: boolean;
}

class LoginComponent extends React.Component<TxnPasswordComponentProps, TxnPasswordComponentState> {
  passwordRef: React.RefObject<HTMLInputElement>;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.txn_password || this.props.api_error) {
        this.setState({
          loading: false,
        })
      }
    }
  }

  disableButton() {
    return !(this.passwordRef.current && this.passwordRef.current.value);
  }

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.passwordRef = React.createRef();
    this.state = { loading: false };
  }

  render() {
    return (
    this.props.txn_password
    ?
    <>
      <Redirect to="/report" />
    </>
    :
    <>
      <div className="jumbotron mt-5 text-center">
        <div className='loginForm'>
          <h1>Enter your password</h1>
          <p>For your security, we require your password after refreshing the page.</p>

          { this.props.api_error ? <ErrorComponent error={this.props.api_error} /> : ''}

          <label htmlFor='txnPassword'>
            Password:
          </label>

          <input className='form-control' id="txnPassword" type="password" name="password" ref={this.passwordRef} />

          <div className='mt10'>
            <input className='btn btn-primary form-control' type='button'  onClick={ () => this.doGetTransactions() } value="Login" />
          </div>

        </div>
        { this.state.loading ? <LoadingSpinner /> : '' }
      </div>
    </>
    );
  }

  doGetTransactions (): void {
    this.setState({
      loading: true
    });

    this.props.doGetTransactions(this.passwordRef.current.value, this.props.email);
  }
}

const mapStateToProps = (state: State): TxnPasswordComponentProps => {
  return {
      txn_password: state.user.txnPassword,
      email: state.user.email,
      api_error: state.user.APIError,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetTransactions: (password: string, email: string) => {
      return dispatch(Actions.get_transactions(
        {
          txnPassword: password,
          email: email,
        }
      ));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
